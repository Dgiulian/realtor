import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Navbar from './navbar'
import Footer from './footer'
type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Real State</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  )
}

export default Layout