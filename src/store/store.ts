import { sqlQuery } from "models/sqlQuery";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "models";
// import dynamic from "next/dynamic";
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




import ReduxQuerySync from 'redux-query-sync'

ReduxQuerySync({
    store, // your Redux store
    params: {
        dest: {
            // The selector you use to get the destination string from the state object.
            selector: state => state.route.destination,
            // The action creator you use for setting a new destination.
            action: value => ({type: 'setDestination', payload: value}),
        },
    },
    // Initially set the store's state to the current location.
    initialTruth: 'location',
})