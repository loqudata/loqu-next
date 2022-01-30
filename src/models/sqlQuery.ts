import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createModel } from "@rematch/core";
import { Table } from "apache-arrow";

import { loadCSVFile, query as duckDBQuery } from "features/duckdb";
import { RootModel } from "models";
import { IFile, serialize } from "utils/serializeableFile";
// Define a type for the slice state
interface QueryState {
  file?: IFile;
  query: string;
  /** Not currently used. Would be great if this could auto sync with thunk, or if there was a way to access thunk state. */
  status: "blank" | "loading" | "error" | "completed";
  data?: Table;
}

// Define the initial state using that type
const initialState: QueryState = {
  query:
    "SELECT AVG(TOTAL_VEHICLES), MAR_ADDRESS FROM crashes GROUP BY MAR_ADDRESS;",
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
  },
  effects: (dispatch) => ({
    runQuery: async (query: string, state) => {
      console.log("starting q", query);
  
      let response;
      // This will error, causing a promise rejection
      try {
        response = await duckDBQuery(query);
        console.log("done resp");
      } catch (error) {
        console.warn(error);
        return;
      }
  
      // We assume these won't error, or they won't be a part of same transaction
      dispatch.sqlQuery.setData(response);
      dispatch.sqlQuery.setStatus("completed");
      console.log("dispatched end");
  
      return response;
    },
    updateFile: async (file: File, thunkAPI) => {
      dispatch.sqlQuery.setFile(serialize(file));
      loadCSVFile(file, file.name.split(".")[0]);
    }
  })
  // {
  //   [runQuery.fulfilled]: (state, action) => {},
  // }
});

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default sqlQuerySlice.reducer;
