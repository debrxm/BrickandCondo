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
import {useRouter} from 'next/router'
import {NextSeo} from 'next-seo'
const Home: NextPage = () => {
  //Hooks
  const queryHook = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [hasProperty, setHasProperty] = React.useState(false);
  const [Location, setLocation] = React.useState<any | []>([]);
  const [propertiesRef, setPropertiesRef] = React.useState<any>(
    firestore.collection("properties").limit(10).orderBy("created_at", "desc")
  );
  const [query, setQuery] = React.useState<any>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isMoreLoading, setIsMoreLoading] = React.useState<boolean>(false);
  const [lastDoc, setLastDoc] = React.useState<any | {}>({});
  const [properties, setProperties] = React.useState<any | []>([]);

  React.useEffect(() => { 
    
    queryHook.query.filter && setQuery(queryHook.query.filter);
    if(queryHook.query.filter) { 
      let value = queryHook.query.filter
      setPropertiesRef(
        firestore
          .collection("properties")
          .where("property_location", "==", value)
          .limit(10)
      );
      setQuery(queryHook.query.filter);
    }
  }, [JSON.stringify(queryHook)])
  //Small Components
  const LocationItem = ({ item }: { item: string }) => {
    const changeLocation = () => {
      if (item === "All") {
        setPropertiesRef(firestore.collection("properties").limit(10));
        setQuery("Filter By Location");
      } 
      else {
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
        fontFamily="ProductLight"
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
        mt={{lg: 20, base: 4}}
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
        <Text textTransform='capitalize' fontFamily="ProductBold" color="#C5C5C5">
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
          {Location.map((item: string, index: number) => {
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
        if (snapShot.docs.length < 10) setLastDoc(null);
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
  const checkLocation = async () => {
    const loc = [
      "All",
      "Lekki",
      "Magodo",
      "Ikorodu",
      "Bakew",
      "Small London",
      "Ikoyi",
      "VI",
      "Ajah",
      "Sangotedo",
    ];
    setIsLoading(true);
    const availableLocation: any = [];
    loc.forEach(async (item: string, index: number) => {
      const snapshot = await firestore
        .collection("properties")
        .where("property_location", "==", item.toLowerCase())
        .get();

      if (!snapshot.empty) {
        availableLocation.push(item);
        setLocation([ 'All', ...availableLocation]);

        getProperties();
      }
    });
    setIsLoading(false);
  };
  React.useEffect(() => {
    checkLocation();
  }, [query, propertiesRef]);

  return (
    <Flex direction="column">
      <NextSeo 
        title='BrickandCondo'
        description=' Brick & Condo gives you the needed assistance as your venture
        into real estate investing.'
      />
      <Flex
        mb={{ base: 10, lg: 2, '2xl': '10' }}
        direction={{ base: "column" }}
        position={{ base: "relative", lg: "relative" }}
      >
        <Flex
          direction={{ base: "column" }}
          py={{ lg: 32, '2xl': 48, base: 20 }}
          px={{ lg: 80, base: 2 }}
          borderRadius="2xl"
          bg={`linear-gradient(0deg, rgba(3, 28, 32, 0.71), rgba(3, 28, 32, 0.71)), url(https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)`}
          bgPos="center"
          bgSize="cover"
          textAlign='center'
          fontFamily="ProductLight"
          align={{lg: 'center', base: 'center'}}
        >
          <Heading
            w={{lg: '80%', base: '90%'}}
            mb={{ base: 6 }}
            fontSize={{ base: "4xl", lg: "6xl" }}
            fontFamily="ProductBold"
            color="white"
            mx='auto'
          >
            Purchase your next Property-
          </Heading>
          <Text
            fontFamily="ProductBold"
            color="white"
            fontSize={{ base: "sm", lg: "md" }}
          >
            Brick & Condo gives you the needed <br /> assistance as your venture
            into real <br /> estate investing.
          </Text>
          <SearchComp />
        </Flex>
        <Fade in={isOpen}>
          <Flex
            direction="column"
            w={{ lg: "25%", base: "80%" }}
            position={{ lg: "absolute", base: "absolute" }}
            bottom={{ base: "-65%", lg: "35%", '2xl': '40%' }}
            left={{ base: "10%", lg: "39%", '2xl': '44%' }}
            gap={{ base: 4, lg: 4 }}
            transition="display 4s"
            zIndex="5"
            display={isOpen ? 'flex' : 'none'}
          >
            <ListLocationComp />
          </Flex>
        </Fade>
      </Flex>

      <Flex 
        w={{lg: '90%'}}
        mx={{lg: 'auto'}}
      >
        {query !== "Filter By Location" && query !== "" ? (
          <Heading
            my={{ base: 10 }}
            fontSize={{ lg: "30", base: '25px' }}
            fontFamily={"ProductBold"}
            textTransform='capitalize'
            color='secondary.100'
          >
            Explore Properties in {query}
          </Heading>
        ) : (
          <Heading
            my={{ base: 10 }}
            fontSize={{ lg: "30", base: '25px'  }}
            fontFamily={"ProductBold"}
            color='secondary.100'
          >
            Explore all properties
          </Heading>
        )}
      </Flex>
      <Flex
        mb={{ lg: 40, base: 32 }}
        direction={{ base: "column", lg: "row" }}
        flexWrap="wrap"
        gap="2%"
        w={{lg: '90%'}}
        mx={{lg: 'auto'}}
      >
        {properties.map((item: object, index: number) => {
          return <PropertyPreviewCard key={index} data={item} />;
        })}
      </Flex>
      {lastDoc && (
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
      )}
    </Flex>
  );
};

export default Home;
