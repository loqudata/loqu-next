import { Box, Text } from "@chakra-ui/react";
import { DataSelector } from "features/selectData/components/DataSelector";
import { SQLEditor } from "features/sqlEditor/components/SQLEditor";
import {
  IJsonModel,
  Layout,
  Model,
  TabNode,
  TabSetNode,
} from "flexlayout-react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

const Fields = () => {
  return <div></div>;
};

const ComponentsMap: Record<string, React.ComponentType<{ node: TabNode }>> = {
  button: ({ node }) => <button>{node.getName()}</button>,
  fields: Fields,
  sqlEditor: SQLEditor,
  selectData: DataSelector,
};

export const Workspace = () => {
  // const [model, setModel] = useState(Model.fromJson(initialModel));
  const modelData = useSelector<RootState>(
    (state) => state.workspace.modelJSON
  ) as IJsonModel;
  const model = Model.fromJson(modelData);
  const dispatch = useDispatch();

  function factory(node: TabNode) {
    var component = node.getComponent();
    const Rend = ComponentsMap[component];
    if (!Rend) {
      return <Text>Error, couldn't find component of type {component}.</Text>;
    } else {
      return <Rend node={node}></Rend>;
    }
  }
  return (
    <Box minH="100vh" minW="100vw">
      <Layout
        factory={factory}
        model={model}
        onModelChange={(p) => dispatch.workspace.setModel(p.toJson())}
      ></Layout>
    </Box>
  );
};
