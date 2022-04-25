import type { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '@utils/fetchApi';
import { Hit, PropertyList } from '../types';

import Property from '@components/property';

type BannerProps = {
  purpose: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  buttonText: string;
  linkName: string;
  imageUrl: string;
}
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}: BannerProps) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br />
        {title2}
      </Text>
      <Text
        color="gray.700"
        fontSize="lg"
        paddingTop="3"
        paddingBottom="3"
        fontWeight="medium"
      >
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);
type HomeProps = {
  propertiesForSale: Hit[];
  propertiesForRent: Hit[];
};
const Home: NextPage<HomeProps> = ({ propertiesForSale, propertiesForRent }) => {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental homes for"
        title2="Everyone"
        desc1="Explore apartments, Villas, homes"
        desc2="And more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property: Hit) => (<Property key={property.id} property={property} />))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property: Hit) => (<Property key={property.id} property={property} />))}
      </Flex>
    </Box>
  )
}

export default Home



export async function getStaticProps() {
  const propertyForSale: PropertyList = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent: PropertyList = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}