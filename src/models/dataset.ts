import { createModel, RematchDispatch } from "@rematch/core";
import { RootModel } from "./index";

import { FieldSchema, Schema } from "compassql/build/src/schema";
import {
  Data,
  InlineData,
  isInlineData,
  isUrlData,
} from "vega-lite/build/src/data";
import { isArray } from "lodash";
import { AppConfig } from "./config";
import { fetchCompassQLBuildSchema } from "../api/api";

export interface DatasetWithoutSchema {
  isLoading: boolean;

  name: string;

  data: InlineData;
}

export interface Dataset extends DatasetWithoutSchema {
  schema: Schema;
}

export const DEFAULT_DATASET: Dataset = {
  isLoading: false,
  name: "Empty",
  schema: new Schema({ fields: [] }),
  data: null,
};

interface DatasetLoad {
  name: string;
  data: Data;
}

/**
 * datasetLoad makes HTTP requests to data location, parses it and creates table schema.
 * it emits dataset.request which sets the state to loading
 * then emits dataset.receive on completion to merge data and turn off loading
 */
export const dataset = createModel<RootModel>()({
  state: DEFAULT_DATASET, // initial state
  reducers: {
    request: (dataset, payload) => {
      return {
        ...dataset,
        isLoading: true,
      };
    },
    receive: (dataset, payload: Dataset) => {
      const { name, data, schema } = payload;
      return {
        ...dataset,
        isLoading: false,
        name,
        schema,
        data,
      };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async datasetLoad(payload: DatasetLoad, state) {
      // console.log("This is current root state", state);
      const { name, data } = payload;
      this.request({ name });

      if (isUrlData(data)) {
        return fetch(data.url)
          .then((response) => response.json())
          .then((values: any) => {
            return buildSchemaAndDispatchDataReceive(
              { values },
              state.config,
              this,
              name
            );
          });
      } else if (isInlineData(data)) {
        return buildSchemaAndDispatchDataReceive(
          data,
          state.config,
          this,
          name
        );
      } else {
        throw new Error("dataset load error: dataset type not detected");
      }
    },
  }),
});

function buildSchemaAndDispatchDataReceive(
  data: InlineData,
  config: AppConfig,
  dispatch: any,
  name: string
) {
  if (!isArray(data.values)) {
    throw new Error("Voyager only supports array values");
  }
  return fetchCompassQLBuildSchema(data.values, config).then((schema) => {
    dispatch.receive({ name, schema, data, isLoading: false });
  });
}
