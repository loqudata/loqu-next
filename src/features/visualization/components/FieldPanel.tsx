import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Stack,
  Input,
  Heading,
  Flex,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Button,
  Icon,
  BoxProps,
  IconProps
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CalendarIcon,
  DragHandleIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { CreatableSelect, Select } from "chakra-react-select";
import { useSelector, useDispatch } from "react-redux";
import { FieldSchema } from "compassql";

import { VscSymbolKey } from "react-icons/vsc";
import { BiCalendar, BiHash, BiTime } from "react-icons/bi";

const options = [
  { value: "area", label: "Area" },
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "point", label: "Point" },
  { value: "tick", label: "Tick" },
  { value: "rect", label: "Rect" },
  { value: "circle", label: "Circle" },
  { value: "square", label: "Square" },
];
const SelectMarkType = () => (
  <FormControl>
    <FormLabel fontSize="sm" color="gray.600">
      Chart Type
    </FormLabel>
    <Select
      colorScheme="teal"
      placeholder="Automatic. Or select chart type"
      options={options}
    />
  </FormControl>
);

const VisName = () => (
  <FormControl>
    <FormLabel fontSize="sm" color="gray.600">
      Visualization Name
    </FormLabel>
    <Input placeholder="Awesomeness vs. Using Loqu" />
  </FormControl>
);

const SelectFields = () => (
  <FormControl>
    {/* <FormLabel fontSize="sm" color="gray.600">Add Fields</FormLabel> */}
    <Select
      colorScheme="teal"
      placeholder="Add fields"
      isMulti
      autoFocus
      options={options}
    />
  </FormControl>
);

const vegaTypeMap = {
  nominal: { icon: VscSymbolKey },
  quantitative: { icon: BiHash },
  temporal: { icon: BiCalendar },
};

// TODO: handle unknowns
// keyof typeof vegaTypeMap
const FieldIcon = ({
  vegaType,
  ...props
}: { vegaType: keyof typeof vegaTypeMap } & IconProps) =>
  vegaTypeMap[vegaType] ? (
    <Icon
      w={5}
      h={5}
      color="gray.400"
      as={vegaTypeMap[vegaType].icon}
      {...props}
    />
  ) : null;

export const Field = ({
  field,
  mode,
  ...props
}: {
  field: typeof FieldSchema;
  mode?: "normal" | "outline-compact";
} & BoxProps) => (
  <Box
    // w={mode == "outline-compact" ? "400px" : ""}
    // display={mode == "outline-compact" ? "inline-block" : ""}
    // backgroundColor="primary.100"
    // borderRadius="lg"
    sx={
      mode == "outline-compact"
        ? {
            display: "inline-block",
            backgroundColor: "primary.100",
            color: "primary.700",
            borderRadius: "lg",
          }
        : undefined
    }
    {...props}
  >
    <Flex
      color={mode == "outline-compact" ? "" : "gray.500"}
      opacity={50}
      p={mode == "outline-compact" ? 1 : 2}
      py={mode == "outline-compact" ? 1 : 2}
      // borderRadius="lg"
      borderY={mode == "outline-compact" ? "" : "1px solid lightgrey"}
      // pl={3}
      // pr={4}

      alignItems="center"
    >
      <Flex
        alignItems="center"
        pr={1}
        sx={
          mode == "outline-compact"
            ? {
                size: "sm",
                borderRightWidth: 1,
                borderRightStyle: "solid",
                borderRightColor: "primary.200",
              }
            : {}
        }
      >
        <FieldIcon
          vegaType={field.vlType}
          color={mode == "outline-compact" ? "primary.800" : "gray.500"}
          w={null}
          h={null}
        />
      </Flex>
      <Text
        ml={1}
        flexGrow={1}
        lineHeight="0.9"
        fontSize={mode == "outline-compact" ? "xs" : ""}
        fontWeight="bold"
      >
        {field.name}
      </Text>
      {/* <DragHandleIcon alignSelf="center" /> */}
    </Flex>
  </Box>
);

const Editor = () => {
  return (
    <>
      <Heading letterSpacing="tight" size="sm" color="gray.600">
        {"Editor".toUpperCase()}
      </Heading>
      {/* TODO: maybe collapse these basic settings */}
      {/* <VisName/> */}
      <SelectMarkType />
    </>
  );
};

interface FieldPanelProps {
  datasetURL: string;
  setDatasetURL: (url: string) => void;
  fields: typeof FieldSchema[];
}

const dataExamples = ["cars", "driving"].map((v) => ({
  value: `https://vega.github.io/voyager2/data/${v}.json`,
  label: v,
}));

export const FieldPanel = ({
  datasetURL,
  setDatasetURL,
  fields,
  ...props
}: FieldPanelProps) => {
  const [value, setValue] = useState({ value: datasetURL, label: "" });
  const handleChange = (value) => {
    // console.log(value);

    setValue(value);
  };
  const handleClick = () => setDatasetURL(value.value);
  return (
    <Box
      backgroundColor="white"
      // borderRadius="lg"
      // borderRight="1px solid black"
      // boxShadow="md"
      py={3}
      pr={3}
      // maxW="400px"
      minW={[null, null, "xs"]}
      {...props}
    >
      <Stack spacing={2}>
        <Heading letterSpacing="tight" size="xs" color="gray.600">
          {"Dataset".toUpperCase()}
        </Heading>
        <Flex>
          {/* <Input
            placeholder="Input dataset URL"
            value={value}
            onChange={handleChange}
          /> */}
          <Box flexGrow={1}>
            <CreatableSelect
              colorScheme="teal"
              autoFocus
              placeholder="Input dataset URL"
              value={value}
              onChange={handleChange}
              options={dataExamples}
              components={{}}
            />
          </Box>
          <Button colorScheme="primary" ml={1} onClick={handleClick}>
            Load
          </Button>
        </Flex>

        <Heading letterSpacing="tight" size="xs" color="gray.600">
          {"Add Fields".toUpperCase()}
        </Heading>
        <Select
          colorScheme="primary"
          autoFocus
          // placeholder="Select fields"
          options={fields.map((f) => ({ value: f.name, label: f.name, ...f }))}
          isMulti
          menuIsOpen={true}
          maxMenuHeight={700}
          // TODO: remove border. This is finicky
          styles={{
            menu: (provided, state) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
            }),
            menuList: (provided, state) => {
              // console.log(provided);

              return {
                ...provided,
                border: "none",
                borderWidth: "none",
              };
            },
          }}
          // TODO: make multiple selections with custom option actually update state and work
          // components={{
          //   Option: ({ data, setValue }) => {
          //     return (
          //       <Field
          //         // my={1}
          //         cursor="pointer"
          //         field={data as any}
          //         onClick={() => setValue(data, "select-option", data)}
          //       />
          //     );
          //   },
          // }}
        />
      </Stack>
    </Box>
  );
};

import { Dispatch } from "store/store";
export const FieldPanelContainer = ({ ds, ...props }: { ds?: string }) => {
  //@ts-ignore
  const dataset = useSelector((state) => state.dataset);
  const dispatch = useDispatch<Dispatch>();
  // console.log("DATASET");
  useEffect(() => {
    if (ds) {
      fetch(ds + "?$select=count(*)")
        .then((res) => res.json())
        .then((res) => {
          console.log("got count res", res);

          if (!res[0] || !res[0].count) {
            return;
          }

          if (res[0].count < 1000) {
            dispatch.dataset.datasetLoad({
              name: "prop_provided",
              data: { url: ds },
            });
          } else if (res[0].count > 1000) {
            alert(
              `The dataset you selected has over 1000 rows.
To not overload your computer in this development phase, we will not load it;
the previous dataset will stay loaded.`.replace("\n", " ")
            );
          }
        });
    }
  }, [ds]);
  // console.log(dataset);
  // https://data.colorado.gov/resource/x3ta-j6ri.csv?$limit=100
  return (
    <FieldPanel
      datasetURL={dataset.data ? dataset.data : ""}
      setDatasetURL={(url) =>{
        dispatch.dataset.datasetLoad({
          name: "idk",
          data: { url },
        })}
      }
      fields={dataset.schema.fieldSchemas}
      {...props}
    ></FieldPanel>
  );
};
