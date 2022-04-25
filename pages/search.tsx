import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '@components/search-filters'
import Property from '@components/property'
import { Hit, PropertyList } from 'types'
import noresult from 'assets/images/noresult.svg'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { baseUrl, fetchApi } from '@utils/fetchApi'

type Props = { properties: Hit[] }
const EmptyPropertyList = () => (
  <Flex justifyContent="center"
    alignItems="center"
    flexDirection="column"
    marginTop="5"
    marginBottom="5"
  >
    <Image alt="No properties found" src={noresult} width="400" height="400" />
  </Flex>
)
function Search({ properties }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        padding="2"
        fontWeight="bold"
        fontSize="lg"
        alignItems="center"
        justifyContent="center"
        onClick={() => setShowFilters(prevFilters => !prevFilters)}
      >
        <Text>Search properties by filter</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />


      </Flex>
      {showFilters && (
        <SearchFilters />
      )}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map(property => (<Property key={property.id} property={property} />))}
      </Flex>
      {properties.length === 0 && <EmptyPropertyList />}
    </Box >
  )
}

interface Query extends ParsedUrlQuery {
  purpose: string;
  rentFrequency: string;
  minPrice: string;
  maxPrice: string;
  roomsMin: string;
  bathsMin: string;
  sort: string;
  areaMax: string;
  locationExternalIDs: string;
  categoryExternalID: string;
}

export const getServerSideProps: GetServerSideProps<{
  properties: Hit[]
}, Query> = async (context) => {

  const query = context.query as Query;
  const purpose = query?.purpose || 'for-rent';
  const rentFrequency = query?.rentFrequency || 'yearly';
  const minPrice = query?.minPrice || '0';
  const maxPrice = query?.maxPrice || '1000000';
  const roomsMin = query?.roomsMin || '0';
  const bathsMin = query?.bathsMin || '0';
  const sort = query?.sort || 'price-desc';
  const areaMax = query?.areaMax || '35000';
  const locationExternalIDs = query?.locationExternalIDs || '5002';
  const categoryExternalID = query?.categoryExternalID || '4';

  const data: PropertyList = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits
    }
  }
}

export default Search