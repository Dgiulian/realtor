import { Box } from '@chakra-ui/react'
import React from 'react'



function Footer() {
  return (
    <Box textAlign="center" padding="5" color="gray.600" borderTop="1px" borderColor="gray.100">
      {new Date().getFullYear()} Realtor Inc
    </Box>
  )
}

export default Footer