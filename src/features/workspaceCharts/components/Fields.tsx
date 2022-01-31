import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import {
  DuckDBField,
  DuckDBToVegaTypes,
  getFields,
} from "features/duckdb/getFields";
import { useAppSelector } from "hooks";
import React from "react";
import exampleFields from "./exampleFields.json";
import { FieldIcon } from "./FieldIcon";

export const ConnectedFields = () => {
  const fl = useAppSelector((s) => s.sqlQuery.file);
  if (fl) {
    getFields(fl.name.split(".")[0]).then((res) => console.log(res));
    return <Box p={2}></Box>;
  } else {
    return <Box p={2}>You haven't loaded a file</Box>;
  }
};

interface IField {
  name: string;
  description: string;
  type: string;
}

export function convertDuckDBField(d: DuckDBField): IField {
  return {
    name: d.name,
    description: `The ${d.name} field`,
    type: DuckDBToVegaTypes[d.type] || "unknown",
  };
}

export const Field = ({ field }: { field: IField }) => {
  return (
    <VStack alignItems="start">
      <HStack>
        <FieldIcon vegaType={field.type as any} />
        <Text fontWeight="medium" color="gray.800" fontSize="11px">{field.name}</Text>
      </HStack>
        <Text color="gray.500" fontSize="11px">{field.description}</Text>
    </VStack>
  );
};

export const Fields = ({ fields = exampleFields }) => {
  return (
    <Box p={2}>
      {fields.map(convertDuckDBField).map((f) => (
        <Field field={f}></Field>
      ))}
    </Box>
  );
};
