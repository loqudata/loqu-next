import React, { useCallback, useState } from "react";
import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { MARK_TYPES } from "../services/vegaItems";
import { Vega } from "react-vega";
import { IconButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import aggregates from "../services/aggregates.json";

export interface OptionType {
  label: string;
  value: string;
}

const createOption = (v: string | null): OptionType => {
  if (!v) return;
  return { label: v, value: v };
};

const NONE_OPTION = { label: "none", value: null };

function SimpleFormItem({
  name,
  bottom,
  right,
}: {
  name: string;
  bottom?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <VStack w="full" h="fit-content">
      <HStack direction="row" alignItems="center" w="full">
        <Heading
          size="sm"
          letterSpacing="tight"
          color="gray.600"
          // textTransform="uppercase"
          fontWeight="medium"
        >
          {name}
        </Heading>
        <Box flexGrow={1} minW={4} />
        {right}
      </HStack>
      {bottom}
    </VStack>
  );
}

interface FormOptionProps {
  name: string;
  options: OptionType[];
  placeholder?: string;
  onChange?: (value: OptionType, ...args) => void;
  isEncoding?: boolean;
  encID?: string;
  value?: OptionType;
  useMainNoneOption?: boolean;
}

const fieldDefDetails = [
  {
    name: "Type",
    key: "type",
    options: Object.keys(Type).map((v) => ({
      label: v,
      value: v,
    })),
  },
  {
    name: "Aggregate",
    key: "aggregate",
    options: aggregates.map((a) => ({
      label: a.op,
      value: a.op,
    })),
  },
  // TODO: true and false?
  // {name: "Bin", key:"bin", options: [{}]}
];

function FormOption({
  name,
  options,
  placeholder,
  onChange,
  isEncoding,
  encID,
  value: optionValue,
  useMainNoneOption = true,
}: FormOptionProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.chartEditor.formDetails[encID]
  );

  let openedFieldData: IField = useAppSelector((state) => state.chartEditor[encID]) || {}

  return (
    <SimpleFormItem
      name={name}
      right={
        <>
          <Box bgColor="white" borderRadius="lg">
            <Select<OptionType>
              chakraStyles={{
                container: (prev) => ({
                  ...prev,
                  w: "3xs",
                }),
              }}
              components={{ DropdownIndicator: null }}
              onChange={(newEncodingFieldValue) => {
                if (onChange) {
                  onChange(newEncodingFieldValue);
                } else if (isEncoding) {
                  dispatch.chartEditor.setEncodingField({
                    encodingKey: encID as any,
                    field: newEncodingFieldValue.value,
                  });
                }
              }}
              // TODO: fix
              placeholder={placeholder ? placeholder : "Select or drop field"}
              value={optionValue}
              size="sm"
              options={
                useMainNoneOption ? [NONE_OPTION].concat(options) : options
              }
              // TODO: style this
              className="chakra-react-select"
              classNamePrefix="chakra-react-select"
            ></Select>
          </Box>
          {isEncoding ? (
            <Tooltip label="Details">
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="details"
                icon={<ChevronDownIcon />}
                onClick={() =>
                  dispatch.chartEditor.toggleDetailView(encID as any)
                }
              />
            </Tooltip>
          ) : null}
        </>
      }
      // Details view
      bottom={
        selected ? (
          <VStack alignItems="start" w="full">
            {fieldDefDetails.map((additionalFieldProp) => (
              <HStack w="full" key={additionalFieldProp.key}>
                {/* pink-800 */}
                <Text color="gray.500" fontWeight="medium" ml={4}>
                  {additionalFieldProp.name}
                </Text>
                <Box flexGrow={1} />
                <Box
                  bgColor="white"
                  borderRadius="lg"
                  // w={52}
                  // alignSelf="end"
                  // flexGrow={1}
                >
                  <Select<OptionType>
                    chakraStyles={{
                      container: (prev) => ({
                        ...prev,
                        w: "3xs",
                      }),
                    }}
                    components={{ DropdownIndicator: null }}
                    onChange={(newValue) => {
                      dispatch.chartEditor.setEncodingField({
                        encodingKey: encID as any,
                        field: {
                          field: optionValue?.value,
                          [additionalFieldProp.key]: newValue.value,
                        },
                      });
                    }}
                    placeholder={"Select"}
                    size="sm"
                    options={[NONE_OPTION, ...additionalFieldProp.options]}
                    value={createOption(
                      openedFieldData[additionalFieldProp.key] ? openedFieldData[additionalFieldProp.key] : null
                    )}
                    // TODO: style this
                    className="chakra-react-select"
                    classNamePrefix="chakra-react-select"
                  ></Select>
                </Box>
              </HStack>
            ))}
          </VStack>
        ) : null
      }
    />
  );
}

import { useSelector, useDispatch } from "react-redux";
import { X } from "vega-lite/build/src/channel";
import { useAppDispatch, useAppSelector } from "hooks";
import { FieldDef } from "vega-lite/build/src/channeldef";
import { createSpec, fieldOptions } from "../services/spec";
import { Type } from "vega-lite/build/src/type";
import { IField } from "models/chartEditor";

const encodings = [
  { key: "x", name: "X Axis" },
  { key: "y", name: "Y Axis" },
  { key: "size", name: "Size" },
  { key: "color", name: "Color" },
  { key: "shape", name: "Shape" },
];

export const ChartForm = () => {
  const [tooltip, setTooltip] = useState(true);
  const [tooltipAllFields, setTooltipAllFields] = useState(false);

  const dispatch = useAppDispatch();

  const formState = useAppSelector((state) => state.chartEditor) || {};
  const markType = useAppSelector((state) => state.chartEditor.mark);
  const setMarkType = dispatch.chartEditor.setMark;

  return (
    <HStack p={8} alignItems="start">
      <Box
        // px={10}
        p={6}
        pr={8}
        // bgColor="gray.50"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        // boxShadow="lg"
      >
        <VStack spacing={4} alignItems="start" w="24rem">
          <Heading
            size="md"
            letterSpacing="tight"
            color="blue.700"
            fontWeight="medium"
          >
            Edit Chart
          </Heading>
          <FormOption
            name="Mark Type"
            options={MARK_TYPES.map((m) => ({
              label: m,
              value: m,
            }))}
            placeholder="Select"
            value={createOption(markType)}
            onChange={(v) => setMarkType(v.value as any)}
          />
          {encodings.map((enc) => (
            <FormOption
              isEncoding
              key={enc.key}
              encID={enc.key}
              name={enc.name}
              options={fieldOptions}
              value={createOption(
                formState[enc.key] ? formState[enc.key].field : null
              )}
            />
          ))}
          <SimpleFormItem
            name="Tooltip"
            right={
              <HStack alignItems="center">
                <Checkbox
                  isChecked={tooltip}
                  onChange={(e) => setTooltip(e.target.checked)}
                ></Checkbox>
                <Text>Enable</Text>
                <Checkbox
                  isChecked={tooltipAllFields}
                  onChange={(e) => setTooltipAllFields(e.target.checked)}
                ></Checkbox>
                <Text>All fields</Text>
              </HStack>
            }
          />
        </VStack>
      </Box>
      <Box>
        <Vega
          //   data={{
          //     url: "https://vega.github.io/editor/data/cars.json",
          //   }}
          spec={createSpec(
            Object.assign({}, formState, {
              markType,
              tooltip,
              tooltipAllFields,
            })
          )}
          renderer="svg"
          mode="vega-lite"
        />
      </Box>
    </HStack>
  );
};
