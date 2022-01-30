import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Box } from "@chakra-ui/react";

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
    <Box className="ag-theme-alpine" w="full" h="full">
      <AgGridReact rowData={rowData}>
        {columns.map((c) => (
          <AgGridColumn key={c} field={c}></AgGridColumn>
        ))}
      </AgGridReact>
    </Box>
  );
};
