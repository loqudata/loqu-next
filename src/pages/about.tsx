import { GetStaticProps } from "next";
import { AboutPage } from "features/about/components/AboutPage";
import React from "react";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { readFileSync } from "fs";
import { components } from "@/components/ChakraComponents";

import { resolve } from "path";
import Layout from "@/components/Layout";

const About = ({ source }) => {
  return (
    <Layout title="About">
      <AboutPage>
        <MDXRemote {...source} components={components} />
      </AboutPage>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = readFileSync(resolve("src/posts/about.md"), "utf-8");
  const mdxSource = await serialize(data);
  console.log(mdxSource);

  return { props: { source: mdxSource } };
};

export default About;
