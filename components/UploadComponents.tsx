import React from "react";
import { Flex, Box, Text, Input, Icon, Tag, HStack } from "@chakra-ui/react";
import Image from "next/image";
import UploadIcon from "../public/Uploadicon.svg";

export const MainUploadComp = ({
  text,
  onChange,
}: {
  text: string;
  onChange: any;
}) => {
  return (
    <Flex
      h="100%"
      py="60px"
      align="center"
      justifyContent="center"
      borderRadius="xl"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
      bgColor="white"
      bgSize="cover"
      bgPosition="center"
      opacity="0.4"
    >
      <label>
        <Box
          cursor="pointer"
          bgPosition="left"
          bgSize="cover"
          bgRepeat="no-repeat"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            wrap="wrap"
            direction="column"
          >
            <Box w="40px" h="40px" mb="22px">
              <Image src={UploadIcon} alt="" />
            </Box>
            <Text
              fontSize="18px"
              textTransform="capitalize"
              color="primary.300"
              fontFamily="ProductLight"
            >
              {text}
            </Text>
          </Flex>
        </Box>
        <Input
          display="none"
          type="file"
          name="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={onChange}
        />
      </label>
    </Flex>
  );
};

export const AddMulitplePhotos = ({
  text,
  onChange,
  disabled,
}: {
  text: string;
  onChange: any;
  disabled: boolean;
}) => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
      bg="white"
      p="12px 10px"
      w="fit-content"
      cursor="pointer"
    >
      <label style={{ cursor: "pointer" }}>
        <Flex align="center" justify="center" gap="4">
          <Box w="20px" h="20px">
            <Image src={UploadIcon} alt="" />
          </Box>
          <Text
            color="secondary.200"
            fontFamily="ProductBold"
            textTransform="capitalize"
          >
            {text}
          </Text>
        </Flex>
        <Input
          display="none"
          type="file"
          name="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </Flex>
  );
};
