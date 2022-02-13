import { sqlQuery } from "models/sqlQuery";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "models";
import { createQueryListener } from "./listener";
import immerPlugin from "@rematch/immer";
import { DatasetReducer } from "models/dataset";

import thunk from 'redux-thunk'
export const store = init({
  models,
  redux: {
    reducers: { dataset: DatasetReducer },
    middlewares: [thunk]
  },
  plugins: [immerPlugin()],
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

store.subscribe(createQueryListener(store));
