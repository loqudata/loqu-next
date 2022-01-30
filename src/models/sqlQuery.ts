import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "apache-arrow";

import { loadCSVFile, query as duckDBQuery } from "@/features/duckdb";
import { IFile, serialize } from "@/utils/serializeableFile";
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

export const runQuery = createAsyncThunk(
  "sqlQuery/runQuery",
  async (query: string, thunkAPI) => {
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
    thunkAPI.dispatch(sqlQuerySlice.actions.setData(response));
    thunkAPI.dispatch(sqlQuerySlice.actions.setStatus("completed"));
    console.log("dispatched end");

    return response;
  }
);

/** Do we even need a reference to the file in the store, since it's just the one function to update it really based on the name? */
export const updateFile = createAsyncThunk(
  "sqlQuery/updateFile",
  async (file: File, thunkAPI) => {
    thunkAPI.dispatch(setFile(serialize(file)));
    loadCSVFile(file, file.name.split(".")[0]);
  }
);

export const sqlQuerySlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<IFile>) => {
      state.file = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<QueryState["status"]>) => {
      state.status = action.payload;
    },
    setData: (state, action: PayloadAction<Table>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // builder.addCase(runQuery.fulfilled, (state, action, ) => {
    //   // Add user to the state array
    //   state.data = action.payload;
    // });
  },
  // {
  //   [runQuery.fulfilled]: (state, action) => {},
  // }
});

export const { setQuery, setData, setStatus, setFile } = sqlQuerySlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default sqlQuerySlice.reducer;
