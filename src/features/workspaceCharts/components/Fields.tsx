import { Box } from "@chakra-ui/react";
import { getFields } from "features/duckdb/getFields";
import { useAppSelector } from "hooks";
import React from "react";

export const Fields = () => {
  const fl = useAppSelector((s) => s.sqlQuery.file);
  if (fl) {
    getFields(fl.name.split(".")[0]).then((res) => console.log(res));
    return <Box p={2}></Box>;
  } else {
    return <Box p={2}>You haven't loaded a file</Box>;
  }
};
