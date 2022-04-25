import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Real State</title>
      </Head>
      <h1>Puto</h1>
      <Box maxWidth="1280px" m="auto">
        {children}
      </Box>
    </>
  )
}

export default Layout