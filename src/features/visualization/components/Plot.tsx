import { ResultPlot } from "@/models/result";
import React from "react";
import { Box, Flex, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Field } from "./FieldPanel";

import { Vega, VisualizationSpec } from "react-vega";
import { InlineData } from "vega-lite/build/src/data";
import { TopLevelFacetSpec, TopLevelSpec } from "vega-lite/build/src/spec";
import vegaTheme from "../services/vegaTheme";
import { Schema } from "compassql/build/src/schema";
import { transformFieldDefs } from "../services/filterPlots";
import { BsBookmark, BsBookmarkFill, BsPlus, BsPlusLg } from "react-icons/bs";
import { EditIcon } from "@chakra-ui/icons";
const modifyPlot = (
  plot: TopLevelFacetSpec,
  data: any,
  useConfig: boolean = true
): VisualizationSpec => {
  const cp = Object.assign({}, plot);
  //@ts-ignore
  // cp.encoding.color = {scheme: "pink"}
  return {
    ...cp,
    data,
    // height: 200,
    // width: 300,
    config: useConfig ? vegaTheme as any: null,
  };
};

export const Plot = ({
  plot,
  data,
  schema,
}: {
  plot: ResultPlot;
  data: InlineData;
  schema: Schema;
}) => (
  <Box
    borderRadius="lg"
    border="1px solid lightgrey"
    boxShadow="sm"
    _hover={{ boxShadow: "md" }}
  >
    <Flex p={2} alignItems="center" direction={["column", null, "row"]}>
      <Text display="inline" fontWeight="semibold" mx={1}>
        Fields
      </Text>
      {/* TODO: make more responsive */}
      <Box flexGrow={1}>
        {plot.fieldInfos
          .map((f) => f.fieldDef)
          .map(transformFieldDefs)
          .map((f) => (
            <Field
              key={f.field.toString()}
              mode="outline-compact"
              field={{ name: f.field, vlType: f.type }}
              mx={"2px"}
              my={"1px"}
            />
          ))}
      </Box>
      <HStack spacing={1}>
        {/* TODO: look at padding and sizes for these icon buttons. Can we have them bigger with less padding? */}
        <Tooltip label="Bookmark Plot" aria-label="bookmark plot">
          <IconButton
            size="sm"
            variant="ghost"
            p={1}
            aria-label="bookmark plot"
            icon={<BsBookmark fontSize="md" />}
          />
        </Tooltip>
        <Tooltip label="Add Plot/Fields to Main View" aria-label="bookmark plot">
        <IconButton
          size="sm"
          variant="ghost"
          p={1}
          colorScheme="primary"
          aria-label="edit plot"
          icon={<BsPlusLg fontSize="md" />}
        />
        </Tooltip>
      </HStack>
    </Flex>
    <Flex
      p={2}
      overflow="scroll"
      maxH="50vh"
      justifyContent="center"
      alignItems="center"
    >
      <Vega spec={modifyPlot(plot.spec, data)} mode="vega-lite"></Vega>
    </Flex>
  </Box>
);

// export const Plots = ({ plots }: { plots: ResultPlot[] }) =>
//   plots.map((p) => <Plot plot={p} />);
