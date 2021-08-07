import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { Heading } from "@chakra-ui/react";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Heading>Hello Next.js</Heading>
  </Layout>
);

export default IndexPage;
