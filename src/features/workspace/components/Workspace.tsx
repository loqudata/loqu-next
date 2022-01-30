
import { Box } from "@chakra-ui/react";
import {IJsonModel, Layout, Model, TabNode, TabSetNode}  from "flexlayout-react";

import React, { useState } from 'react';

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
                   component: "button",
               },
               {
                   type: "tab",
                   enableClose: false,
                   name: "Table View",
                   component: "button",
               }
           ]
       }
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
                        component: "button",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 20,
                children: [
                    {
                        type: "tab",
                        name: "Edit Chart",
                        component: "button",
                    }
                ]
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
                            }
                        ]
                    },
                    {
                        type: "tabset",
                        weight: 40,
                        children: [
                            {
                                type: "tab",
                                name: "Recommended Charts",
                                component: "button",
                            }
                        ]
                    },
                ]
            }
        ]
    }
} as IJsonModel;

export const Workspace = () => {
    const [model, setModel] = useState(Model.fromJson(initialModel));
    function factory(node: TabNode) {
        var component = node.getComponent();
        if (component === "button") {
            return <button>{node.getName()}</button>;
        }
    }
  return <Box minH="100vh" minW="100vw">
      <Layout factory={factory} model={model} onModelChange={(p) => setModel(p)}></Layout>
  </Box>;
};
