/* eslint-disable @next/next/link-passhref */
import { Flex, Grid, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LightButton } from "../components/LightButton";
import { LoggedInBanner } from "../components/LoggedInBanner";
import { ManagePropertyCard } from "../components/ManagePropertyCard";
import { firestore } from "../firebase/config";

const BrickandCondoDash = ({ user }: { user: object }) => {
  const [properties, setProperties] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasProperty, setHasProperty] = React.useState(false);

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
        setProperties(loadedProperties);
      }
    });
    setIsLoading(false);
  };
  React.useEffect(() => {
    getProperties();
  }, [""]);

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
    <Flex direction="column">
      <LoggedInBanner email={user} />
      <Flex direction="column">
        <Flex align="center" mt={{ lg: 10 }}>
          <Heading
            fontFamily="ProductBold"
            color="secondary.100"
            fontSize="5xl"
            w={{ lg: "80%" }}
          >
            Welcome, Admin
          </Heading>
          <Link href="BrickandCondoUpload">
            <LightButton>Upload New Property</LightButton>
          </Link>
        </Flex>
        <Flex direction="column" mt={{ lg: 20 }}>
          <Heading
            fontFamily="ProductBold"
            color="secondary.100"
            fontSize="2xl"
            w={{ lg: "80%" }}
          >
            Propeties to manage:
          </Heading>
          <Flex gap={{ lg: 4 }} mt={{ lg: 4 }}>
            {properties.map((item: any, index) => {
              return (
                <ManagePropertyCard
                  key={index}
                  property_name={item.property_name}
                  propTotalVisits={item.propTotalVisits}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BrickandCondoDash;
