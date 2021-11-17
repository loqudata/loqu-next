import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Nav } from './Nav'

import { makeGoogleFontsURL } from "utils/fonts";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href={makeGoogleFontsURL(["Inter", "Quicksand", "Merriweather"])}
        rel="stylesheet"
      />
    </Head>
    <Nav/>
    {children}
    {/* <footer>
    </footer> */}
  </>
)

export default Layout
