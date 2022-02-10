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
import produce from "immer";
import { useImmer } from "use-immer";
import { sortBy } from "lodash";

interface CustomColumn extends GridColumn {
  idx: number;
}

const columns: CustomColumn[] = Object.keys(data[0]).map((k, i) => ({
  idx: i,
  title: k,
  width: 150,
}));

export const GlideGrid = () => {
  const [dynamicColumns, setDynamicColumns] = useImmer(columns);
  const [numRows, setNumRows] = useState(data.length);

  // If fetching data is slow you can use the DataEditor ref to send updates for cells
  // once data is loaded.
  const getGridCell = React.useCallback(
    ([col, row]: readonly [number, number]): GridCell => {
      for (const refCol of dynamicColumns) {
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
            readonly: false,
          };
        }
      }
      console.warn("er");
    },
    [dynamicColumns]
  );

  const onColMoved = React.useCallback(
    (startIndex: number, endIndex: number): void => {
      setDynamicColumns((draft) => {
        //   no use for immer

        const newCols = [...draft];
        const [toMove] = newCols.splice(startIndex, 1);
        newCols.splice(endIndex, 0, toMove);
        return newCols;
        //   draft.filter((v) => v.idx == startIndex)[0].idx = endIndex
        //   draft.filter((v) => v.idx == startIndex)[0].idx = endIndex
      });
    },
    []
  );

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
          columns={sortBy(dynamicColumns, "idx")}
          onColumnMoved={onColMoved}
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
