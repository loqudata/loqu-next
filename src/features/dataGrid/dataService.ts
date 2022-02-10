import {
  GridCell,
  GridCellKind,
  isTextEditableGridCell,
  Rectangle,
} from "@glideapps/glide-data-grid";
import React, { Dispatch, SetStateAction } from "react";

class ContentCache {
  // column -> row -> value
  private cachedContent: Map<number, Map<number, GridCell>> = new Map();

  get(col: number, row: number) {
    const colCache = this.cachedContent.get(col);

    if (colCache === undefined) {
      return undefined;
    }

    return colCache.get(row);
  }

  set(col: number, row: number, value: GridCell) {
    if (this.cachedContent.get(col) === undefined) {
      this.cachedContent.set(col, new Map());
    }

    const rowCache = this.cachedContent.get(col) as Map<number, GridCell>;
    rowCache.set(row, value);
  }
}

function clearCell(cell: GridCell): GridCell {
  switch (cell.kind) {
    case GridCellKind.Boolean: {
      return {
        ...cell,
        data: false,
      };
    }
    case GridCellKind.Image: {
      return {
        ...cell,
        data: [],
        displayData: [],
      };
    }
    case GridCellKind.Drilldown:
    case GridCellKind.Bubble: {
      return {
        ...cell,
        data: [],
      };
    }
    case GridCellKind.Uri:
    case GridCellKind.Markdown: {
      return {
        ...cell,
        data: "",
      };
    }
    case GridCellKind.Text: {
      return {
        ...cell,
        data: "",
        displayData: "",
      };
    }
    case GridCellKind.Number: {
      return {
        ...cell,
        data: 0,
        displayData: "",
      };
    }
  }
  return cell;
}
//
// const [numRows, setNumRows] = React.useState(50);
function useDataCache(
  numRows: number,
  setNumRows: Dispatch<SetStateAction<number>>
) {
  const cache = React.useRef<ContentCache>(new ContentCache());
  const getCellContent = React.useCallback(
    ([col, row]: readonly [number, number]): GridCell => {
      let val = cache.current.get(col, row);
      if (val === undefined) {
        if (isTextEditableGridCell(val)) {
          val = { ...val, readonly: false };
        }
        cache.current.set(col, row, val);
      }
      return val;
    },
    []
  );
  const getCellsForSelection = React.useCallback(
    (selection: Rectangle): readonly (readonly GridCell[])[] => {
      const result: GridCell[][] = [];

      for (let y = selection.y; y < selection.y + selection.height; y++) {
        const row: GridCell[] = [];
        for (let x = selection.x; x < selection.x + selection.width; x++) {
          row.push(getCellContent([x, y]));
        }
        result.push(row);
      }

      return result;
    },
    [getCellContent]
  );
  const setCellValueRaw = React.useCallback(
    ([col, row]: readonly [number, number], val: GridCell): void => {
      cache.current.set(col, row, val);
    },
    []
  );

  const onRowAppended = React.useCallback(async () => {
    // shift all of the existing cells down
    for (let y = numRows; y > 0; y--) {
      for (let x = 0; x < 6; x++) {
        setCellValueRaw([x, y], getCellContent([x, y - 1]));
      }
    }
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, 0]);
      setCellValueRaw([c, 0], clearCell(cell));
    }
    setNumRows((cv) => cv + 1);
    return "top" as const;
  }, [getCellContent, numRows, setCellValueRaw]);

  return { getCellContent, getCellsForSelection, setCellValueRaw };
}
