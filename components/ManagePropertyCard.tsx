import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { DarkFullWidthCard } from "./DarkFullWidthCard";
import { LightButton } from "./LightButton";

type ManagePropertyCardType = {
  property_name: string;
  propTotalVisits: string;
};
export const ManagePropertyCard = ({
  property_name,
  propTotalVisits,
}: ManagePropertyCardType) => {
  return (
    <Box
      bg="secondary.100"
      borderRadius="xl"
      py={8}
      px={8}
      fontFamily="ProductLight"
      color="white"
      w="100%"
    >
      <Flex direction="column" flexWrap="wrap" gap={{ lg: 10 }}>
        <Box>
          <Text>Property Name:</Text>
          <Heading
            fontFamily="ProductBold"
            color="white"
            fontSize="2xl"
            w={{ lg: "80%" }}
          >
            {property_name}
          </Heading>
        </Box>

        <Box>
          <Text>Property Name:</Text>
          <Heading
            fontFamily="ProductBold"
            color="white"
            fontSize="2xl"
            w={{ lg: "80%" }}
          >
            {property_name}
          </Heading>
        </Box>

        <Box w="fit-content">
          <Link href="BrickandCondoUpload">
            <LightButton>Manage</LightButton>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
