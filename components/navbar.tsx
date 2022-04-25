import React from 'react'
import Link from 'next/link'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react'
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs'
import { FiKey } from 'react-icons/fi'


type Props = {}

const Navbar = (props: Props) => {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
      <Box fontSize="3xl" color="blue.400" paddingLeft="2" fontWeight="bold">
        <Link href="/" >Realtor</Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400" aria-label="icon button"  />
          <MenuList>
            <Link href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href="/search" passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Home</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Home</MenuItem>
            </Link>
            
          </MenuList>
        </Menu>
      </Box>

    </Flex>
  )
}

export default Navbar

