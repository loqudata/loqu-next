import { Box, Flex, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { DataSource, DATA_SOURCES } from "./DataSource";

import duckdb from "assets/duckdb-logo.svg";
import { FileSelector } from "./FileSelector";
export const DataSelector = () => {
  return (
    <VStack h="full" p={2} alignItems="start">
      <Text fontWeight="bold">Choose a data source</Text>
      <VStack
        alignItems="start"
        spacing={4}
        p={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        w="full"
      >
        <Text fontWeight="semibold">Local sources</Text>

        <HStack>
          <Text>
            Choose a CSV {/* , XLS, JSON, or GeoJSON  */}
            file:
          </Text>
          <FileSelector />
        </HStack>

        <Flex w="full">
          <Box flexGrow={1}>
            <Text maxW="md">
              Your files will be imported to an in-memory database called{" "}
              <Link href="https://duckdb.org/" target="_blank" color="blue.600">
                DuckDB
              </Link>
              . It allows you to transform and analyze large datasets right in
              your browser, using our same friendly interface.
            </Text>
          </Box>

          <Image src={duckdb} maxW={16} />
        </Flex>
      </VStack>
      {/* {DATA_SOURCES.map((d) => (
        <DataSource source={d} />
      ))} */}
    </VStack>
  );
};
