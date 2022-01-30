import { Box, Text } from "@chakra-ui/react";
import {
  IJsonModel,
  Layout,
  Model,
  TabNode,
  TabSetNode,
} from "flexlayout-react";

import React, { useState } from "react";

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

const Fields = () => {
  return <div></div>;
};

const ComponentsMap: Record<string, React.ComponentType<{node: TabNode}>> = {
  button: ({ node }) => <button>{node.getName()}</button>,
  fields: Fields,
};

export const Workspace = () => {
  const [model, setModel] = useState(Model.fromJson(initialModel));
  function factory(node: TabNode) {
    var component = node.getComponent();
    const Rend = ComponentsMap[component];
    if (!Rend) {
      return <Text>Error, couldn't find component of type {component}.</Text>;
    } else {
        return <Rend node={node}></Rend>
    }
  }
  return (
    <Box minH="100vh" minW="100vw">
      <Layout
        factory={factory}
        model={model}
        onModelChange={(p) => setModel(p)}
      ></Layout>
    </Box>
  );
};
