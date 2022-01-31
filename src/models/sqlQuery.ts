import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createModel } from "@rematch/core";
import { Table } from "apache-arrow";

import { loadCSVFile, query as duckDBQuery } from "features/duckdb";
import { DuckDBField, getFields } from "features/duckdb/getFields";
import { RootModel } from "models";
import { IFile, serialize } from "utils/serializeableFile";
// Define a type for the slice state
interface QueryState {
  file?: IFile;
  query: string;
  /** Not currently used. Would be great if this could auto sync with thunk, or if there was a way to access thunk state. */
  status: "blank" | "loading" | "error" | "completed";
  error?: string;
  data?: Table;
  duckDBFields?: DuckDBField[]
}

// Define the initial state using that type
const initialState: QueryState = {
  query:
    `SELECT AVG(TOTAL_VEHICLES), MAR_ADDRESS FROM "10k_rows" GROUP BY MAR_ADDRESS;`,
  status: "blank",
};

export const sqlQuery = createModel<RootModel>()({
  name: "sqlQuery",
  // `createSlice` will infer the state type from the `initialState` argument
  state: initialState,
  reducers: {
    setFile: (state, payload: IFile) => {
      state.file = payload;
    },
    setQuery: (state, payload: string) => {
      state.query = payload;
    },
    setStatus: (state, payload: QueryState["status"]) => {
      state.status = payload;
    },
    setData: (state, payload: Table) => {
      state.data = payload;
    },
    setError: (state, error) => {
      state.error = error
    },
    setDuckDBFields: (state, payload: DuckDBField[]) => {
      state.duckDBFields = payload
    }
  },
  effects: (dispatch) => ({
    // Not used: a better way?
    async runQuery(payload: null, state) {
      
      const query = state.sqlQuery.query
  
      let response;
      // This will error, causing a promise rejection
      try {
        response = await duckDBQuery(query);
      } catch (error) {
        console.warn(error);
        dispatch.sqlQuery.setError(error)
        return;
      }
  
      // We assume these won't error, or they won't be a part of same transaction
      dispatch.sqlQuery.setData(response);
      dispatch.sqlQuery.setStatus("completed");
  
      return response;
    },
    updateFile: async (file: File, thunkAPI) => {
      const tableName = file.name.split(".")[0]
      await loadCSVFile(file, tableName);
      dispatch.sqlQuery.setFile(serialize(file));

      const fields = await getFields(tableName)
      dispatch.sqlQuery.setDuckDBFields(fields)
    }
  })
  // {
  //   [runQuery.fulfilled]: (state, action) => {},
  // }
});

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default sqlQuerySlice.reducer;
