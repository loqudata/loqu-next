import { responsivePadding } from "@/shared/theme";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FieldPanelContainer } from "./FieldPanel";
import { MainView } from "./MainView";

import { useRouter } from 'next/router'

export const VisualizePage = () => {
  const rt = useRouter()
  // console.log(pg);
  const socrata_url = rt.query && rt.query.portal ? "https://" + rt.query.portal + "/resource/" + rt.query.id + ".json" : undefined
  // console.log(socrata_url);
  
  return (
    <Box h="90vh" px={responsivePadding} py={1}>
      <Flex minH="full">
        <FieldPanelContainer ds={socrata_url}></FieldPanelContainer>
        <MainView></MainView>
      </Flex>
    </Box>
  );
};
