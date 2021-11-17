import { Box, Button, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import React from "react";
import { responsivePadding } from "../shared/theme";
import { NavLink } from "./NavLink";

const routes = [
  { name: "About", path: "/about" },
  { name: "Data Sources", path: "/sources" },
  { name: "Search", path: "/search" },
  { name: "Visualize", path: "/visualize" },
];

export const Nav = () => {
  return (
    // TODO: make the distance from each side uniform
    <Flex
      px={responsivePadding}
      py={2}
      boxShadow="sm"
      // borderBottom="1px solid lightgrey"
      alignItems="center"
      position="relative"
      zIndex="999"
      backgroundColor="white"
    >
      <Box mr={6}>
        <Link href="/">
          <Heading
            cursor="pointer"
            fontWeight="medium"
            letterSpacing="tighter"
            // color="#332455"
            fontFamily="Quicksand"
            size="lg"
            lineHeight="0.8"
            position="relative"
            top="-2px"
          >
            loqu
          </Heading>
        </Link>
      </Box>

      <HStack spacing={5}>
        {routes.map((route) => (
          <NavLink key={route.path} href={route.path}>
            {route.name}
          </NavLink>
        ))}
      </HStack>
      <Box flexGrow={1} />
      <Button size="sm" variant="outline" ml={6} mr={2}>
        Sign In
      </Button>
      <Button size="sm" colorScheme="primary" variant="outline">
        Sign Up
      </Button>
    </Flex>
  );
};
