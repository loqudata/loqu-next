import React from "react";

import data from "data/cars.json";
import DataEditor, {
  DataEditorContainer,
  GridCell,
  GridCellKind,
  GridColumn,
} from "@glideapps/glide-data-grid";

interface CustomColumn extends GridColumn {
    idx: number
}

const columns: CustomColumn[] = Object.keys(data[0]).map((k, i) => ({
    idx: i,
  title: k,
  width: 100,
}));

const numRows = data.length

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]: readonly [number, number]): GridCell {
    let value;//: any;
    // TODO: maybe
    for (const refCol of columns) {
        if (col = refCol.idx) {
            value = data[row][refCol.title]
        }
    }
    if (value) {
        const ret = {
            kind: GridCellKind.Text,
            data: value,
            displayData: value,
            allowOverlay: false,
        };
        console.log(ret);
        return ret as any
    } else {
        throw new Error();
    }
}

export const GlideGrid = () => {
  // Minimal example
  return (
    <DataEditorContainer width={1000} height={700}>
      <DataEditor getCellContent={getData} columns={columns} rows={numRows} />
    </DataEditorContainer>
  );
};
