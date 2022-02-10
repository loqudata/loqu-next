import React, { useState } from "react";

import data from "data/cars.json";
import DataEditor, {
  DataEditorContainer,
  GridCell,
  GridCellKind,
  GridColumn,
  Rectangle,
} from "@glideapps/glide-data-grid";
import { useDataCache } from "./dataService";
import BodyEnd from "./BodyEnd";

interface CustomColumn extends GridColumn {
  idx: number;
}

const columns: CustomColumn[] = Object.keys(data[0]).map((k, i) => ({
  idx: i,
  title: k,
  width: 150,
}));

const numRows = data.length;

// const getCellsForSelection = (
//   selection: Rectangle
// ): readonly (readonly GridCell[])[] => {
//   const result: GridCell[][] = [];

//   for (let y = selection.y; y < selection.y + selection.height; y++) {
//     const row: GridCell[] = [];
//     for (let x = selection.x; x < selection.x + selection.width; x++) {
//       row.push(getGridCell([x, y]));
//     }
//     result.push(row);
//   }

//   return result;
// };

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getGridCell([col, row]: readonly [number, number]): GridCell {
  for (const refCol of columns) {
    if (col == refCol.idx) {
      if (!data[row]) {
        console.log(data);
        return null;
      }
      const value = String(data[row][refCol.title]);
      return {
        kind: GridCellKind.Text,
        data: value,
        displayData: value,
        // IMPORTANT: Critical, needed for editing
        allowOverlay: true,
        readonly: false
      };
    }
  }
  console.warn("er");

  //   throw new Error();
}

export const GlideGrid = () => {
  // Minimal example
  const [numRows, setNumRows] = useState(data.length);
  const {
    getCellContent,
    getCellsForSelection,
    setCellValue,
    setCellValueRaw,
    onRowAppended,
  } = useDataCache(numRows, setNumRows, getGridCell);
  return (
    <>
      <BodyEnd />
      <DataEditorContainer width={1600} height={700}>
        <DataEditor
          getCellContent={getCellContent}
          columns={columns}
          rows={numRows}
          // isDraggable={true}

          // edit
          onCellEdited={setCellValue}
          // copy
          getCellsForSelection={getCellsForSelection}
          // paste
          onPaste={true}
          // add row
          trailingRowOptions={{
            hint: "New row...",
            sticky: true,
            tint: true,
          }}
          onRowAppended={onRowAppended}
        />
      </DataEditorContainer>
    </>
  );
};
