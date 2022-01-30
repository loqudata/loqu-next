import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import Editor from "@monaco-editor/react";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
export type Monaco = typeof monaco;
export type IMonacoEditor = monaco.editor.IStandaloneCodeEditor;

import { useSelector, useDispatch } from "react-redux";
import { sqlQuerySlice } from "models/sqlQuery";

function handleEditorDidMount(editor: IMonacoEditor, monaco: Monaco) {
  editor.addCommand(monaco.KeyCode.F9, function () {
    console.log("F9 pressed!");
  });
}

export const SQLEditor = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  return (
    <Flex height="100%" direction="column">
      <Flex alignItems="center" p={2}>
        <Box flexGrow={1} />
        {/* <Text color="gray.700">Run Query</Text> */}
        <Button size="sm" onClick={()=> dispatch(sqlQuerySlice.actions.setQuery(query))}>Run Query</Button>
      </Flex>
      <Box height="calc(100% - 80px);" >
        <Editor
          defaultLanguage="sql"
          value={query}
          onChange={(q) => setQuery(q)}
          onMount={handleEditorDidMount}
        />
      </Box>
    </Flex>
  );
};
