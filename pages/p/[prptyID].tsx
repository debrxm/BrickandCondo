import { Box, Flex, Heading, Text, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { firestore } from "../../firebase/config";
import BackIcon from "../../public/BackIcon.svg";
import sqftIcnBlack from "../../public/sqftIconBlack.svg";
import bathRmIcnBlack from "../../public/bathRmIconBlack.svg";
import bedRmIconBlack from "../../public/bedRmIcnBlack.svg";
import ImgSampleIcon from "../../public/ImgSampleIcon.svg";
import { ClientScheduleCard } from "../../components/ClientScheduleCard";
import { LightButton } from "../../components/LightButton";

const FullProperty = () => {
  // Property 0bject including the images
  const [property, setProperty] = React.useState<any>();
  // 3 other properties array
  const [otherProperties, setOtherProperties] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showNaira, setShowNaira] = React.useState(true);

  //Hooks 
  const [allImage, setAllImage] = React.useState<Array<string>>([]);

  const getProperty = async (propertyID: number) => {
    setIsLoading(true);
    const propertyRef = firestore.collection("properties").doc(`${propertyID}`);
    const snapshot = await propertyRef.get();
    if (snapshot.exists) {
      const data: any = snapshot.data();
      setProperty(data);
      const allImgArr = [data.images.main, data.images.sub_image_one, data.images.sub_image_two]; 
      
      data.images && data.images.other_images.forEach((i: {i: object, imageURL: string}, index: number) => { 
        allImgArr.push(i.imageURL);
        console.log(allImgArr);
        
      }); 
      
      setAllImage([...allImgArr]);
      getOtherProperty(data.property_location);
    } else {
      setIsLoading(false);
    }
  };
  const getOtherProperty = async (loc: string) => {
    console.log(loc);

    const propertyRef = firestore
      .collection("properties")
      .where("property_location", "==", loc.toLowerCase())
      .limit(3);
    const snapshot = await propertyRef;
    snapshot.onSnapshot((snapShot: any) => {
      if (!snapShot.empty) {
        let newProperties = [];
        for (let i = 0; i < snapShot.docs.length; i++) {
          newProperties.push(snapShot.docs[i].data());
        }
        setOtherProperties(newProperties);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };
  React.useEffect(() => {
    const propertyID: any = localStorage.getItem("propertyID");
    getProperty(propertyID);
  }, [""]);

  let dateAttr = new Date();

  const CostPriceCard = () => {
    return (
      <Flex
        direction="column"
        w={{ base: "100%", md: "50%", lg: "100%" }}
        display={property?.id ? "flex" : "none"}
      >
        <Box my={{ base: 8 }}>
          <LightButton
            onClick={() => {
              setShowNaira(!showNaira);
            }}
          >
            {showNaira ? "Show Dollar Equivalent" : "Show Naira Equivalent"}
          </LightButton>
        </Box>
        <Flex gap={{ base: 8 }} w="100%">
          <Box w={{ base: "50%", lg: "100%" }}>
            <Text fontFamily="ProductBold" color="secondary.200">
              {showNaira ? "Naira" : "Dollar"}
            </Text>
            <Heading
              fontSize={{ lg: "5xl", base: "3xl" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              {showNaira
                ? Number(property?.one_time_payment_naira).toLocaleString()
                : Number(property?.one_time_payment_dollar).toLocaleString()}
            </Heading>
            <Text fontFamily="ProductBold" color="secondary.200">
              One-Time Payment.
            </Text>
          </Box>
          <Box w={{ base: "50%", lg: "100%" }}>
            <Text fontFamily="ProductBold" color="secondary.200">
              {showNaira ? "Naira" : "Dollar"}
            </Text>
            <Heading
              fontSize={{ lg: "5xl", base: "3xl" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              {showNaira
                ? Number(property?.rental_value_naira).toLocaleString()
                : Number(property?.rental_value_dollar).toLocaleString()}{" "}
            </Heading>
            <Text fontFamily="ProductBold" color="secondary.200">
              Rental Value
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  };
  return (
    <Flex direction="column">
      <Flex
        mb={{ lg: 10, base: 8 }}
        cursor="pointer"
        w="fit-content"
        px={{ base: 2 }}
        py={{ base: 2 }}
      >
        <Link href="/">
          <Flex gap={4}>
            <Box>
              <Image src={BackIcon} />
            </Box>
            <Text fontFamily="ProductBold" color="secondary.400">
              Back
            </Text>
          </Flex>
        </Link>
      </Flex>

      <Flex
        mb={{ lg: 10, base: 8 }}
        gap={{ base: 4 }}
        direction={{ base: "column", lg: "row" }}
        h={{ lg: "570px" }}
        cursor="pointer"
        _hover={{ transform: "scale(1.03)" }}
        transition="all 0.3s"
      >
        <Box w={{ lg: "70%", base: "100%" }}>
          <Flex
            h={{ lg: "100%", base: "20vh" }}
            align="center"
            justifyContent="center"
            borderRadius="xl"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
            bg={
              property?.images?.main
                ? `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),url(${property?.images.main})`
                : "secondary.100"
            }
            bgSize="cover"
            bgPosition="center"
          />
        </Box>
        <Flex
          gap={{ base: 4 }}
          direction={{ base: "row", lg: "column" }}
          w={{ lg: "30%", base: "100%" }}
        >
          <Box h="100%" w={{ base: "50%", lg: "100%" }}>
            <Flex
              h={{ lg: "100%", base: "25vh" }}
              align="center"
              justifyContent="center"
              borderRadius="xl"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
              bg={
                property?.images?.sub_image_one
                  ? `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),url(${property?.images?.sub_image_one})`
                  : "secondary.100"
              }
              bgSize="cover"
              bgPosition="center"
            />
          </Box>
          <Box h={{ lg: "100%", base: "25vh" }} w={{ base: "50%", lg: "100%" }}>
            <Flex
              h={{ lg: "100%", base: "25vh" }}
              align="center"
              justifyContent="center"
              borderRadius="xl"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
              bg={
                property?.images?.sub_image_two
                  ? `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),url(${property?.images?.sub_image_two})`
                  : "secondary.100"
              }
              bgSize="cover"
              bgPosition="center"
            />
          </Box>
        </Flex>
      </Flex>

      <Flex
        gap={{ base: "8", lg: "0" }}
        direction={{ lg: "row", base: "column" }}
      >
        <Flex width={{ lg: "80%" }}>
          <Flex align="center" gap="10">
            <Flex direction={{ base: "column" }} rowGap="2">
              <Box w="30px" h="30px">
                <Image alt="" src={bedRmIconBlack} />
              </Box>
              <Text fontFamily="ProductBold" color="secondary.100">
                {property?.rooms} Beds
              </Text>
            </Flex>
            <Flex direction={{ base: "column" }} rowGap="2">
              <Box w="30px" h="30px">
                <Image alt="" src={bathRmIcnBlack} />
              </Box>
              <Text fontFamily="ProductBold" color="secondary.100">
                {property?.bathroom} Baths
              </Text>
            </Flex>
            <Flex direction={{ base: "column" }} rowGap="2">
              <Box w="30px" h="30px">
                <Image alt="" src={sqftIcnBlack} />
              </Box>
              <Text fontFamily="ProductBold" color="secondary.100">
                {property?.square_foot} Sqft.
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex width={{ lg: "20%" }}>
          <Flex
            justify="center"
            w={{ lg: "100%" }}
            align="center"
            gap="4"
            bg="white"
            px={{ base: 4, lg: 4, md: 6 }}
            py={{ base: 4, lg: 4, md: 4 }}
            borderRadius="xl"
            cursor="pointer"
            boxShadow="0px 0px 22px rgba(0, 0, 0, 0.08);"
          >
            <Box w="30px" h="30px">
              <Image alt="" src={ImgSampleIcon} />
            </Box>
            <Text fontFamily="ProductBold">See more images</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        my={{ lg: 10, base: 8 }}
        direction={{ lg: "row", base: "column" }}
        align={{ lg: "center" }}
      >
        <Flex direction="column" w={{ lg: "70%", base: "100%" }}>
          <Heading
            fontFamily="ProductBold"
            color="secondary.100"
            fontSize="3xl"
            textTransform="capitalize"
          >
            {property?.property_name}
          </Heading>
          <Heading
            fontFamily="ProductLight"
            color="primary.300"
            fontSize="2xl"
            textTransform="capitalize"
          >
            {property?.property_location}, {property?.property_sublocation}
          </Heading>
        </Flex>

        <Flex w={{ lg: "30%", base: "100%" }}>
          <CostPriceCard />
        </Flex>
      </Flex>

      <Flex gap={{ base: 6 }} direction={{ base: "column", lg: "row" }}>
        <Flex w={{ lg: "70%", base: "100%" }}>
          <Text
            w={{ base: "100%", lg: "90%" }}
            fontSize="lg"
            fontFamily="ProductLight"
            lineHeight="2"
          >
            {property?.property_description}
          </Text>
        </Flex>

        <Flex
          gap={{ base: 4 }}
          w={{ lg: "30%", base: "100%" }}
          direction={{ base: "column" }}
        >
          <ClientScheduleCard propertyID={property?.id} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FullProperty;
