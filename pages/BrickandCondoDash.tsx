/* eslint-disable @next/next/link-passhref */
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LightButton } from "../components/LightButton";
import { LoggedInBanner } from "../components/LoggedInBanner";
import { ManagePropertyCard } from "../components/ManagePropertyCard";
import { firestore, auth } from "../firebase/config";

const BrickandCondoDash = ({ user }: { user: object }) => {
  
  const [properties, setProperties] = React.useState<object | any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasProperty, setHasProperty] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  const propertiesRef = firestore.collection("properties");
  const getProperties = async () => {
    setIsLoading(true);
    propertiesRef.onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        setHasProperty(true);
        let loadedProperties = [];
        for (let index = 0; index < snapShot.docs.length; index++) {
          const data = {
            ...snapShot.docs[index].data(),
          };
          loadedProperties.push(data);
        }
        console.log(typeof loadedProperties)
        setProperties(loadedProperties);
      }
    });
    setIsLoading(false);
  };
  React.useEffect(() => {
    getProperties();
    if (!auth.currentUser) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [JSON.stringify(user)]);

  const DeleteThisFakeData = [
    {
      propName: "Main Street House 24 1717 Fraser Cir",
      propTotalVisits: "6",
    },
    {
      propName: "1717 Fraser Cir",
      propTotalVisits: "0",
    },
    {
      propName: "Crumbs Road 13",
      propTotalVisits: "1",
    },
  ];

  return (
    <>
      {isAdmin && (
        <Flex direction="column">
          <LoggedInBanner email={user && {...Object.values(user)}} />
          <Flex direction="column">
            <Flex
              align="center"
              my={{ lg: 10, base: 10 }}
              direction={{ base: "column", lg: "row" }}
            >
              <Heading
                fontFamily="ProductBold"
                color="secondary.100"
                fontSize={{ lg: "5xl", base: "3xl" }}
                w={{ lg: "80%", base: "100%" }}
                mb={{ base: "4" }}
              >
                Welcome, Admin
              </Heading>
              <Box w={{ base: "100%", lg: "40%" }}>
                <Link href="BrickandCondoUpload">
                  <LightButton>Upload New Property</LightButton>
                </Link>
              </Box>
            </Flex>
            <Flex direction="column" mt={{ lg: 20 }}>
              <Heading
                fontFamily="ProductBold"
                color="secondary.100"
                fontSize={{ lg: "2xl", base: "2xl" }}
                w={{ lg: "80%" }}
              >
                Propeties to manage:
              </Heading>
              <Flex
                gap={{ lg: 4, base: 4 }}
                mt={{ lg: 4 }}
                direction={{ base: "column", lg: "row" }}
              >
                {
                  Object.values(properties)[0] ? 
                  properties.map((item: any, index: number) => {
                    console.log(Object.values(properties)[0]);
                    return (
                      <ManagePropertyCard
                        key={index}
                        propertyID={item.id}
                        property_name={item.property_name}
                        propTotalVisits={item.propTotalVisits}
                      />
                    );
                  })

                  : 
                  <Heading
                    fontFamily="ProductBold"
                    color="secondary.200"
                    fontSize={{ lg: "2xl", base: "2xl" }}
                    w={{ lg: "80%" }}
                  >
                    They are currently no properties to manage
                  </Heading>
                }
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default BrickandCondoDash;
