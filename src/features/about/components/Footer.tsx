import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Link from "next/link"

import React from "react"

const footerSections = [
  {
    title: "Community",
    links: [
      { name: "Github", url: "https://github.com/loqudata" },
      // {name: "", url: "https://github.com/loqudata"}
    ],
  },
]

export const Footer = () => {
  return (
    <Flex as="footer" p={8} px={10} backgroundColor="gray.50">
      {/* <hr /> */}

      <Box flexGrow={1}>
        <Stack spacing={2} maxW="45vw">
          <Link href="/">
            <Heading
              size="md"
              letterSpacing="tighter"
              cursor="pointer"
            >
              LoquData
            </Heading>
          </Link>
          <Text>
            Data credits: DBNomics, Wikidata, Geonames, Geoboundaries,
            and a basemap from CARTO.
            <br /> All data used is available under open licenses.
          </Text>
          <Text>
            Copyright &copy; {new Date().getFullYear()} Loqu Project
            Contributors. Source code available under the Apache 2.0
            License.
          </Text>
        </Stack>
      </Box>
      {footerSections.map((s) => (
        <Box flexGrow={1} key={s.title}>
          <Heading size="sm" mb={2}>
            {s.title}
          </Heading>
          {s.links.map((l) => (
            <ChakraLink key={l.url} href={l.url} color="green.600">
              {l.name}
            </ChakraLink>
          ))}
        </Box>
      ))}
      {/* <Container maxW="container.xl">
      </Container> */}
    </Flex>
  )
}
