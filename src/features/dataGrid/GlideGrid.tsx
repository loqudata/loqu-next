import React from "react";

import data from "data/cars.json";
import DataEditor, {
  DataEditorContainer,
  GridCell,
  GridCellKind,
  GridColumn,
  Rectangle,
} from "@glideapps/glide-data-grid";

interface CustomColumn extends GridColumn {
  idx: number;
}

const columns: CustomColumn[] = Object.keys(data[0]).map((k, i) => ({
  idx: i,
  title: k,
  width: 150,
}));

const numRows = data.length;

const getCellsForSelection = (
  selection: Rectangle
): readonly (readonly GridCell[])[] => {
  const result: GridCell[][] = [];

  for (let y = selection.y; y < selection.y + selection.height; y++) {
    const row: GridCell[] = [];
    for (let x = selection.x; x < selection.x + selection.width; x++) {
      row.push(getData([x, y]));
    }
    result.push(row);
  }

  return result;
};

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]: readonly [number, number]): GridCell {
  for (const refCol of columns) {
    if (col == refCol.idx) {
      const value = String(data[row][refCol.title]);
      return {
        kind: GridCellKind.Text,
        data: value,
        displayData: value,
        allowOverlay: false,
      };
    }
  }
  throw new Error();
}

export const GlideGrid = () => {
  // Minimal example
  return (
    <DataEditorContainer width={1600} height={700}>
      <DataEditor
        getCellContent={getData}
        columns={columns}
        rows={numRows}
        getCellsForSelection={getCellsForSelection}
        onPaste={true}
      />
    </DataEditorContainer>
  );
};
