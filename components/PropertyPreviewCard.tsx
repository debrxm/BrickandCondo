import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import BedRoomIcon from "../public/bedRoomIcon.svg";
import SqftIcon from "../public/sqtFtIcon.svg";
import BathRoomIcon from "../public/bathRoom.svg";
import Image from "next/image";
import Link from "next/link";

export const PropertyPreviewCard = ({ data }: { data: any }) => {
  return (
    <Link href={`/p/${data.id}`}>
      <Flex
        w={{lg:'48%', base: '100%'}}
        direction={{lg:"column", base: 'row'}}
        pt={{lg:"24rem", base: '24rem'}}
        bg={`linear-gradient(180.03deg, rgba(0, 0, 0, 0) 50%, #000000 99.97%), url(${data?.images?.main})`}
        bgPosition="center"
        bgSize="cover"
        pl={{ base: 10 }}
        // pr={{ lg: 28, base: 20 }}
        borderRadius={{ lg: "3xl", base: "2xl" }}
        position="relative"
        cursor="pointer"
        onClick={() => localStorage.setItem("propertyID", data.id)}
        mb={{base: 20}}
      >
        <Flex direction="column" pb={16}>
          <Heading
            fontFamily="ProductBold"
            color="white"
            lineHeight="0.9"
            textTransform="capitalize"
            fontSize={{ lg: "5xl", base: "4xl" }}
          >
            {data.property_name}
          </Heading>
          <Text w={{lg:'50%', base: '90%'}} fontFamily="ProductLight" color="white">
            {data.property_sublocation}
          </Text>
        </Flex>

        <Flex
          direction="row"
          bg="primary.200"
          w={{ lg: "fit-content" }}
          borderRadius="2xl"
          position="absolute"
          py={{ base: 3, lg: 6 }}
          px={{ base: 4, lg: 8 }}
          align="center"
          gap={{ base: 10, lg: 10 }}
          bottom={{ base: "-6%", lg: "-7%" }}
        >
          <Flex direction="column">
            <Box w="20px" h="20px">
              <Image alt="" src={BedRoomIcon} />
            </Box>
            <Text fontFamily="ProductLight" color="white">
              {data.rooms} Beds
            </Text>
          </Flex>

          <Flex direction="column">
            <Box w="20px" h="20px">
              <Image alt="" src={BathRoomIcon} />
            </Box>
            <Text fontFamily="ProductLight" color="white">
              {data.bathroom} Baths
            </Text>
          </Flex>

          <Flex direction="column">
            <Box w="20px" h="20px">
              <Image alt="" src={SqftIcon} />
            </Box>
            <Text fontFamily="ProductLight" color="white">
              {Number(data.square_foot).toLocaleString()} Sqft.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
