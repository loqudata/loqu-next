import { Box, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Result } from "models/result";
import { selectData, selectSchema } from "selectors/index";
import { filterPlots } from "../services/filterPlots";
import { Plot } from "./Plot";
import { ChartForm } from "features/chartEditor/components/ChartForm";
// import { RootState } from '../store/store'

// state.result.plots[].{fieldInfos, spec}

export const MainView = () => {
  //@ts-ignore
  const result: Result = useSelector((state) => state.result);
  const data = useSelector(selectData);
  const schema = useSelector(selectSchema);
  // console.log("data", data);

  return (
    <Stack p={4} spacing={4} w="full">
      <Flex
        borderRadius="lg"
        // bgColor="gray.100"
        // justifyContent="center"
        // alignItems="center"
        minH={20}
        // p={4}
      >
        <ChartForm/>
      </Flex>
      <Heading size="md">
        Recommended Charts ({(result.plots && result.plots.length) || 0})
      </Heading>

      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={[2, 3]}>
        {result.plots &&
          data &&
          result.plots
            // .filter(filterPlots(schema))
            // .slice(0, 3)
            .map((plot) => (
              <Plot
                key={JSON.stringify(plot.fieldInfos)}
                plot={plot}
                data={data}
                schema={schema}
              ></Plot>
            ))}
      </SimpleGrid>
    </Stack>
  );
};
