import { createModel } from "@rematch/core";
import { IJsonModel } from "flexlayout-react";
import type { RootModel } from "./index";

export interface Workspace {
  modelJSON: any;
}


const initialModel = {
    global: {},
    borders: [
      //    {
      //        type: "border",
      //        location: "right",
      //        children: [
      //            {
      //                type: "tab",
      //                enableClose: false,
      //                name: "Options",
      //                component: "grid",
      //            }
      //        ]
      //    },
      {
        type: "border",
        location: "bottom",
        children: [
          {
            type: "tab",
            enableClose: false,
            name: "SQL Editor",
            component: "sqlEditor",
          },
          {
            type: "tab",
            enableClose: false,
            name: "Data Selector",
            component: "selectData",
          },
          {
            type: "tab",
            enableClose: false,
            name: "Table View",
            component: "tableGrid",
          },
        ],
      },
    ],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "tabset",
          weight: 20,
          children: [
            {
              type: "tab",
              name: "Fields",
              component: "fields",
            },
          ],
        },
        {
          type: "tabset",
          weight: 20,
          children: [
            {
              type: "tab",
              name: "Edit Chart",
              component: "button",
            },
          ],
        },
        {
          type: "row",
          weight: 60,
          children: [
            {
              type: "tabset",
              weight: 60,
              children: [
                {
                  type: "tab",
                  name: "View Chart",
                  component: "button",
                },
              ],
            },
            {
              type: "tabset",
              weight: 40,
              children: [
                {
                  type: "tab",
                  name: "Recommended Charts",
                  component: "button",
                },
              ],
            },
          ],
        },
      ],
    },
  } as IJsonModel;

export const workspace = createModel<RootModel>()({
  state: { modelJSON: initialModel } as Workspace,
  reducers: {
    setModel(state, payload) {
      state.modelJSON = payload
    },
  },
});
