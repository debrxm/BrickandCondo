import React from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Image as ChkImg,
} from "@chakra-ui/react";
import Image from "next/image";
import firebase from "../firebase/config";
import UploadIcon from "../public/Uploadicon.svg";
import DeleteIcon from "../public/DeleteIcon.svg";

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
  onChange?: any;
  disabled?: boolean;
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

export const EditMainUploadComp = ({
  text,
  onChange,
  imageURL,
}: {
  text: string;
  onChange?: any;
  imageURL?: string;
}) => {
  return (
    <Flex
      py="60px"
      h="100%"
      align="center"
      justifyContent="center"
      borderRadius="xl"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
      bg={`linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${imageURL})`}
      bgSize="cover"
      bgPosition="center"
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

export const AddedImagesPreview = ({
  imageURL,
  index,
  propertyId,
  otherImagesUploadURL,
  setOtherImagesUploadURL,
}: {
  imageURL: string;
  index: number;
  propertyId?: number;
  otherImagesUploadURL?: any;
  setOtherImagesUploadURL?: any;
}) => {
  const deleteFile = (pathToFile: string, fileName: string) => {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete();
  };
  return (
    <Flex
      justifyContent="center"
      w="100%"
      h="100%"
      bg="white"
      py={{ base: 5 }}
      px={{ base: 4 }}
      gap={{ base: 5 }}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
      borderRadius="xl"
      direction={{ base: "column", lg: "row" }}
    >
      <ChkImg
        borderRadius="xl"
        src={imageURL}
        w={{ lg: "50px", base: "100%" }}
        h={{ lg: "50px", base: "100%" }}
      />
      <Box
        cursor="pointer"
        w={{ lg: "50px", base: "100%" }}
        h={{ lg: "50px", base: "100%" }}
        onClick={() => {
          const storageRef = firebase
            .storage()
            .ref(`properties/${propertyId}/otherImages-${index}`);
          storageRef
            .listAll()
            .then((dir) => {
              dir.items.forEach((fileRef) => {
                deleteFile(storageRef.fullPath, fileRef.name);
              });
            })
            .catch((error) => {
              console.log(error);
            });
          setOtherImagesUploadURL(
            otherImagesUploadURL.filter((n: any, i: any) => i != index)
          );
        }}
      >
        <Image src={DeleteIcon} alt="" />
      </Box>
    </Flex>
  );
};
