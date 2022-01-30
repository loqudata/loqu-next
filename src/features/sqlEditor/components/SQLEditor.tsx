import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
export type Monaco = typeof monaco;
export type IMonacoEditor = monaco.editor.IStandaloneCodeEditor;

import { useSelector, useDispatch } from "react-redux";
import { sqlQuery } from "models/sqlQuery";

import { Dispatch, RootState } from "store/store";
export const SQLEditor = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<Dispatch>();

  const error = useSelector<RootState>((state) => state.sqlQuery.error);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error running query",
        description: String(error),
        status: "error",
        duration: 10000,
        isClosable: true,
        onCloseComplete: () => dispatch.sqlQuery.setError(null),
      });
    }

    return () => {};
  }, [error]);

  function runQuery() {
    dispatch.sqlQuery.runQuery(query);
  }

  function handleEditorDidMount(editor: IMonacoEditor, monaco: Monaco) {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      runQuery
    );
  }

  return (
    <Flex height="100%" direction="column">
      <Flex alignItems="center" p={2}>
        <Box flexGrow={1} />
        {/* <Text color="gray.700">Run Query</Text> */}
        <Button size="sm" onClick={runQuery}>
          Run Query
        </Button>
      </Flex>
      <Box height="calc(100% - 80px);">
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
