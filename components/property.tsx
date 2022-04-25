import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar, Button } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import DefaultImage from '@assets/images/house.jpg';
import millify from 'millify';
import { Hit } from '../types'

type Props = {
  property: Hit
}

const Property = ({ property }: Props) => {
  const { coverPhoto, price, rentFrequency, agency, area, rooms, title, baths, isVerified, externalID, } = property;
  return (
    <Link href={`/property/${externalID}`} >
      <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
        <Box>
          <Image src={coverPhoto?.url ?? DefaultImage} width={400} height={260} alt="House" />
        </Box>
        <Box w="full">
          <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">{isVerified ? <GoVerified /> : null}</Box>
              <Text fontWeight="bold" fontSize="lg">AED {millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" w="250px" color="blue.400">
            {rooms} <FaBed /> | {baths} <FaBath /> | sqft {millify(area)} | <BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}

export default Property