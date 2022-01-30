import { sqlQuerySlice } from "@/models/sqlQuery";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "models";
import { createQueryListener } from "./listener";
export const store = init({
  models,
  redux: {
    rootReducers: {
      sql: sqlQuerySlice.reducer
    }
  }
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

store.subscribe(createQueryListener(store));
