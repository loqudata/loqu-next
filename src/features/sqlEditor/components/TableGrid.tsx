import React from "react";
import { useAppSelector } from "hooks";
import { ArrowTableGrid } from "./arrow-viewer/ArrowTableGrid";

export const TableGrid = () => {
  const data = useAppSelector((s) => s.sqlQuery.data);
  const status = useAppSelector((s) => s.sqlQuery.status);
  return status == "completed" ? (
    <ArrowTableGrid table={data} width={300} height={800}></ArrowTableGrid>
  ) : null;
};
