import Link from "next/link";
import React from "react";
import { DataSourcePage } from "../features/dataSources/components/DataSourcePage";
import Layout from "../components/Layout";
const IndexPage = () => (
  <Layout title="Data Sources | Loqu">
    <DataSourcePage></DataSourcePage>
  </Layout>
);

export default IndexPage;
