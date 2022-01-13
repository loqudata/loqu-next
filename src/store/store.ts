import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "models";
// import dynamic from "next/dynamic";
import { createQueryListener } from "./listener";
// if (typeof window =="undefined") 
// import { openReplayMiddleware } from "components/OpenReplay";

export const store = init({
  models,
  redux: {
    // middlewares: [dynamic(() => import("components/OpenReplay"), { ssr: false }).middleware as any]
  }
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