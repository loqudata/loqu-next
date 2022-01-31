import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
// or alpine
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "./grid.css"

import { Box, Flex, Text } from "@chakra-ui/react";

const defaultData = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
];

export const CoreGrid = ({
  rowData = defaultData,
  columns = Object.keys(defaultData[0]),
}: {
  rowData?: any;
  columns?: string[];
}) => {
  return (

    <Flex direction="column" h="full">
        {/* <Box > */}
            <Box className="ag-theme-balham" w="full" flexGrow={1}  fontFamily="Inter !important">
              <AgGridReact rowData={rowData} defaultColDef={{resizable: true, filter: true}}>
                {columns.map((c) => (
                  <AgGridColumn key={c} field={c}></AgGridColumn>
                ))}
              </AgGridReact>
            </Box>
        {/* </Box> */}
        <Box p={2}>
            <Text fontSize="xs" fontWeight="semibold" color="gray.600">{rowData.length} rows, {columns.length} columns.</Text>
        </Box>
    </Flex>
  );
};
