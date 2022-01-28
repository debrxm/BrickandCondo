import {
  Box,
  Divider,
  Fade,
  Flex,
  Heading,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import searchIcon from "../public/searchIcon.svg";
import React from "react";
import { PropertyPreviewCard } from "../components/PropertyPreviewCard";
import { firestore } from "../firebase/config";

const Location = ["All", "Lekki", "Magodo", "Ikorodu", "Bakew", "Small London"];

const Home: NextPage = () => {
  //Hooks
  const { isOpen, onToggle } = useDisclosure();
  const [hasProperty, setHasProperty] = React.useState(false);
  const [propertiesRef, setPropertiesRef] = React.useState<any>(
    firestore.collection("properties").limit(10)
  );
  const [query, setQuery] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isMoreLoading, setIsMoreLoading] = React.useState<boolean>(false);
  const [lastDoc, setLastDoc] = React.useState<any | {}>({});
  const [properties, setProperties] = React.useState<any | []>([]);
  //Small Components
  const LocationItem = ({ item }: { item: string }) => {
    const changeLocation = () => {
      if (item === "All") {
        setPropertiesRef(firestore.collection("properties").limit(10));
        setQuery("Filter By Location");
      } else {
        setPropertiesRef(
          firestore
            .collection("properties")
            .where("property_location", "==", item.toLowerCase())
            .limit(10)
        );
        setQuery(item);
      }
      onToggle();
    };
    return (
      <Text
        onClick={changeLocation}
        _hover={{ bg: "secondary.100", color: "white" }}
        fontFamily="PropertyLight"
        borderRadius="xl"
        color="secondary.100"
        bg="white"
        p={{ base: 4 }}
        transition="all 0.3s"
        cursor="pointer"
      >
        {item}
      </Text>
    );
  };

  const SearchComp = () => {
    return (
      <Flex
        onClick={onToggle}
        cursor="pointer"
        borderRadius={{ base: "full", lg: "full", md: "xl" }}
        gap={{ base: 4, lg: 20 }}
        bg="white"
        align="center"
        w="fit-content"
        py={{ lg: 4, base: 4 }}
        px={{ lg: 8, base: 4 }}
        boxShadow="0px 9px 11px 9px rgba(0, 0, 0, 0.04);"
      >
        <Text fontFamily="PropertyLight" color="#C5C5C5">
          {query || "Filter By Location"}
        </Text>
        <Box w={{ base: "45px" }} h={{ base: "45px" }}>
          <Image alt="" src={searchIcon} />
        </Box>
      </Flex>
    );
  };

  const ListLocationComp = () => {
    return (
      <Flex
        direction="column"
        bg="primary.200"
        borderRadius="xl"
        px={{ base: 4 }}
        py={{ base: 8 }}
        transition="all 4s"
      >
        <Flex direction="column" gap="4">
          {Location.map((item, index) => {
            return <LocationItem item={item} key={index} />;
          })}
        </Flex>
      </Flex>
    );
  };
  const getProperties = async () => {
    setIsLoading(true);

    const snapshot = await propertiesRef;
    snapshot.onSnapshot((snapShot: any) => {
      if (!snapShot.empty) {
        setHasProperty(true);
        let newProperties = [];
        setLastDoc(snapShot.docs[snapShot.docs.length - 1]);
        for (let i = 0; i < snapShot.docs.length; i++) {
          newProperties.push(snapShot.docs[i].data());
        }
        setProperties(newProperties);
      } else {
        setLastDoc(null);
      }
    });
    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);
      let snapshot = await propertiesRef
        .orderBy("id")
        .startAfter(lastDoc.data().id)
        .limit(10);
      snapshot.onSnapshot((snapShot: any) => {
        if (!snapShot.empty) {
          let newProperties = properties;

          setLastDoc(snapShot.docs[snapShot.docs.length - 1]);

          for (let i = 0; i < snapShot.docs.length; i++) {
            newProperties.push(snapShot.docs[i].data());
          }

          setProperties(newProperties);
          if (snapShot.docs.length < 10) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
      });
      setIsMoreLoading(false);
    }
  };
  React.useEffect(() => {
    getProperties();
  }, [query, propertiesRef]);

  return (
    <Flex direction="column">
      <Flex
        mb={{ base: 20 }}
        direction={{ base: "column" }}
        position={{ base: "relative", lg: "relative" }}
      >
        <Flex
          direction={{ base: "column" }}
          py={{ lg: 52, base: 40 }}
          px={{ lg: 80, base: 10 }}
          borderRadius="2xl"
          bg={`linear-gradient(0deg, rgba(3, 28, 32, 0.71), rgba(3, 28, 32, 0.71)), url(https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)`}
          bgPos="center"
          bgSize="cover"
          fontFamily="ProductLight"
        >
          <Heading
            mb={{ base: 6 }}
            fontSize={{ base: "4xl", lg: "6xl" }}
            fontFamily="PropertyBold"
            color="white"
          >
            Purchase your next Property-
          </Heading>
          <Text
            fontFamily="ProductBold"
            color="white"
            fontSize={{ base: "sm", lg: "md" }}
          >
            Brick & Condo gives you the needed <br /> assistance as your venture
            into real <br /> estate inveting.
          </Text>
        </Flex>

        <Flex
          direction="column"
          w={{ base: "fit-content" }}
          position={{ lg: "absolute", base: "absolute" }}
          bottom={{ base: "-10%", lg: "-7%" }}
          left={{ base: "7%", lg: "36%" }}
          gap={{ base: 4, lg: 4 }}
        >
          <SearchComp />
        </Flex>
        <Fade in={isOpen}>
          <Flex
            direction="column"
            w={{ lg: "25%", base: "70%" }}
            position={{ lg: "absolute", base: "absolute" }}
            bottom={{ base: "-93%", lg: "7%" }}
            left={{ base: "7%", lg: "36%" }}
            gap={{ base: 4, lg: 4 }}
            transition="display 4s"
            zIndex="5"
          >
            <ListLocationComp />
          </Flex>
        </Fade>
      </Flex>

      <Grid
        mb={{ lg: 40, base: 32 }}
        rowGap={{ base: "28" }}
        columnGap={{ base: "25" }}
        direction={{ base: "column", lg: "row" }}
        gridTemplateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      >
        {properties.map((item, index) => {
          return <PropertyPreviewCard key={index} data={item} />;
        })}
      </Grid>
      <Flex direction="row" justify="center" align="center" gap={2}>
        <Divider
          orientation="horizontal"
          w={{ lg: "40%", base: "30%", md: "40%" }}
          borderColor="primary.200"
        />
        <Text onClick={getMore} cursor="pointer" fontFamily="ProductLight">
          Load More
        </Text>
        <Divider
          orientation="horizontal"
          w={{ lg: "40%", base: "30%", md: "40%" }}
          borderColor="primary.200"
        />
      </Flex>
    </Flex>
  );
};

export default Home;
