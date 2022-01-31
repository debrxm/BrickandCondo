/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CustomInput, CustomTextArea } from "../components/CustomInput";
import { DangerButton } from "../components/DangerButton";
import firebase from "../firebase/config";
import {
  AddedImagesPreview,
  AddMulitplePhotos,
  MainUploadComp,
} from "../components/UploadComponents";
import { LightButton } from "../components/LightButton";
import { CreateProperty } from "../firebase/firestore";
import Router from "next/router";
import { LoggedInBanner } from "../components/LoggedInBanner";
import Image from "next/image";
import AddIcon from "../public/addIcon.svg";

const BrickandCondoUpload = ({ user }: { user: object }) => {
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const [currentUpload, setCurrentUpload] = React.useState("");
  const [mainImageUploadURL, setMainImageUploadURL] = React.useState("");
  const [mainImageBlob, setMainImageBlob] = React.useState({});
  const [subImageOneBlob, setSubImageOneBlob] = React.useState({});
  const [subImageTwoBlob, setSubImageTwoBlob] = React.useState({});
  const [otherImagesBlob, setOtherImagesBlob] = React.useState<any | []>([]);
  const [otherImagesUploadURL, setOtherImagesUploadURL] = React.useState<
    any | []
  >([]);
  const [otherImagesUploadName, setOtherImagesUploadName] = React.useState("");
  const [mainImageUploadName, setMainImageUploadName] = React.useState("");
  const [subImageOneUploadURL, setSubImageOneUploadURL] = React.useState("");
  const [subImageOneUploadName, setSubImageOneUploadName] = React.useState("");
  const [subImageTwoUploadURL, setSubImageTwoUploadURL] = React.useState("");
  const [subImageTwoUploadName, setSubImageTwoUploadName] = React.useState("");
  const [bathroom, setBathroom] = React.useState("");
  const [rooms, setRooms] = React.useState("");
  const [square_foot, setSquareFoot] = React.useState("");
  const [property_name, setPropertyName] = React.useState("");
  const [property_location, setPropertyLocation] = React.useState("");
  const [property_sublocation, setPropertySubLocation] = React.useState("");
  const [property_description, setPropertyDescription] = React.useState("");
  const [one_time_payment_naira, setOneTimePaymentNaira] = React.useState();
  const [rental_value_naira, setRentalValueNaira] = React.useState();
  const [one_time_payment_dollar, setOneTimePaymentDollar] = React.useState();
  const [rental_value_dollar, setRentalValueDollar] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [uploadOtherImageLoading, setUploadOtherImageLoading] =
    React.useState(false);
  const [createLoading, setCreateLoading] = React.useState(false);
  let lmainImageUploadURL: string;
  let lsubImageOneUploadURL: string;
  let lsubImageTwoUploadURL: string;
  const [id] = React.useState(Date.now());

  const onUploadImage = async (e: any, anchor: string) => {
    const selectedFile = e.target.files[0];
    switch (anchor) {
      case "main":
        setCurrentUpload(selectedFile.name);
        setMainImageUploadName(selectedFile.name);
        setMainImageBlob(selectedFile);
        break;
      case "subImageOne":
        setCurrentUpload(selectedFile.name);
        setSubImageOneUploadName(selectedFile.name);
        setSubImageOneBlob(selectedFile);
        break;
      case "subImageTwo":
        setCurrentUpload(selectedFile.name);
        setSubImageTwoUploadName(selectedFile.name);
        setSubImageTwoBlob(selectedFile);
        break;
      case "otherImages":
        setCurrentUpload(selectedFile.name);
        setOtherImagesUploadName(selectedFile.name);
        setOtherImagesBlob([...otherImagesBlob, selectedFile]);
        fetchOtherImageUrl(
          selectedFile,
          `${id}`,
          `otherImages-${otherImagesBlob.length}`
        );
        break;
      default:
        break;
    }
  };
  const fetchImageUrl = async (
    selectedFile: any,
    dest: string,
    anchor: string
  ) => {
    const storageRef = firebase
      .storage()
      .ref(`properties/${dest}/${anchor}/${selectedFile}`);
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // get the uploaded image url back
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          switch (anchor) {
            case "main":
              setMainImageUploadURL(downloadURL);
              lmainImageUploadURL = downloadURL;
              uploadsubImageOne();
              break;
            case "subImageOne":
              setSubImageOneUploadURL(downloadURL);
              lsubImageOneUploadURL = downloadURL;
              uploadsubImageTwo();
              break;
            case "subImageTwo":
              setSubImageTwoUploadURL(downloadURL);
              lsubImageTwoUploadURL = downloadURL;
              onCreateProperty();
              break;
            default:
              break;
          }
          setIsLoading(false);
        });
      }
    );
  };
  const onCreateProperty = async () => {
    setUploadLoading(false);
    if (lmainImageUploadURL && lsubImageOneUploadURL && lsubImageTwoUploadURL) {
      const propertyData = {
        id,
        bathroom,
        rooms,
        square_foot,
        images: {
          main: lmainImageUploadURL,
          sub_image_one: lsubImageOneUploadURL,
          sub_image_two: lsubImageTwoUploadURL,
          other_images: otherImagesUploadURL || [],
        },
        created_at: Date.now(),
        property_name,
        property_location: property_location.toLowerCase(),
        property_sublocation,
        property_description,
        one_time_payment_naira: one_time_payment_naira || 0,
        rental_value_naira: rental_value_naira || 0,
        one_time_payment_dollar: one_time_payment_dollar || 0,
        rental_value_dollar: rental_value_dollar || 0,
      };
      CreateProperty(propertyData, cleanUp);
    } else {
      console.log("====================================");
      console.log("FALSE");
      console.log("====================================");
    }
  };
  const fetchOtherImageUrl = async (
    selectedFile: any,
    dest: string,
    anchor: string
  ) => {
    setUploadOtherImageLoading(true);
    const storageRef = firebase
      .storage()
      .ref(`properties/${dest}/${anchor}/${selectedFile}`);
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // get the uploaded image url back
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setOtherImagesUploadURL([...otherImagesUploadURL, downloadURL]);
          setUploadOtherImageLoading(false);
        });
      }
    );
  };
  const cleanUp = () => {
    setCreateLoading(false);
    Router.push("/BrickandCondoDash");
  };
  const uploadMain = () => {
    setUploadLoading(true);
    setCreateLoading(true);
    fetchImageUrl(mainImageBlob, `${id}`, "main");
  };
  const uploadsubImageOne = () =>
    fetchImageUrl(subImageOneBlob, `${id}`, "subImageOne");
  const uploadsubImageTwo = () =>
    fetchImageUrl(subImageTwoBlob, `${id}`, "subImageTwo");

  React.useEffect(() => {
    if (!user) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
    console.log("====================================");
    console.log(otherImagesUploadURL);
    console.log("====================================");
  }, [
    mainImageUploadURL,
    subImageOneUploadURL,
    subImageTwoUploadURL,
    otherImagesUploadURL,
    user,
  ]);

  return (
    <>
      {isAdmin && (
        <Box>
          <LoggedInBanner email={user} />
          <Heading
            fontFamily="ProductBold"
            fontSize={{ lg: "30px", base: "20px" }}
            color="primary.300"
            mt={{ base: 4 }}
          >
            Upload a new property
          </Heading>
          <Box my="8">
            <Grid gap="8" gridTemplateColumns={{ lg: "7fr 3fr" }}>
              <Box>
                <MainUploadComp
                  text={mainImageUploadName || "Upload Main Image"}
                  onChange={
                    isLoading
                      ? () => {}
                      : (e: any) => {
                          onUploadImage(e, "main");
                        }
                  }
                />
              </Box>
              <Flex gap="8" direction="column">
                <MainUploadComp
                  text={subImageOneUploadName || "Upload Sub Image"}
                  onChange={
                    isLoading
                      ? () => {}
                      : (e: any) => {
                          onUploadImage(e, "subImageOne");
                        }
                  }
                />
                <MainUploadComp
                  text={subImageTwoUploadName || "Upload Sub Image"}
                  onChange={
                    isLoading
                      ? () => {}
                      : (e: any) => {
                          onUploadImage(e, "subImageTwo");
                        }
                  }
                />
              </Flex>
            </Grid>
          </Box>
          <AddMulitplePhotos
            text={otherImagesUploadName || "Add other images"}
            onChange={
              isLoading || uploadOtherImageLoading
                ? () => {}
                : (e: any) => {
                    onUploadImage(e, "otherImages");
                  }
            }
            disabled={uploadOtherImageLoading}
          />
          {uploadOtherImageLoading && (
            <Flex gap={{ lg: 4, base: 10 }} my="4">
              <Text fontFamily="ProductBold" color="primary.300">
                Uploading...
              </Text>
            </Flex>
          )}
          <Flex
            gap={{ lg: 4, base: 4 }}
            w={{ lg: "fit-content", base: "100%" }}
            my="4"
          >
            {otherImagesUploadURL.map((item: any, index: number) => {
              return (
                <AddedImagesPreview
                  key={index}
                  index={index}
                  propertyId={id}
                  otherImagesUploadURL={otherImagesUploadURL}
                  setOtherImagesUploadURL={setOtherImagesUploadURL}
                  imageURL={item}
                />
              );
            })}
          </Flex>
          <Box>
            <DangerButton
              onClick={() => {
                setOtherImagesBlob([]);
                setOtherImagesUploadName("Add other images");
                setOtherImagesUploadURL([]);
              }}
            >
              Clear
            </DangerButton>
          </Box>

          <Flex direction="column" my="10">
            <Heading
              fontSize={{ lg: "25px" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              Property Meta Data
            </Heading>

            <Flex
              mt="10"
              w="fit-content"
              gap={{ lg: 4 }}
              direction={{ lg: "row", base: "column" }}
            >
              <CustomInput
                type="number"
                id="BathNum"
                label="How many Baths?"
                value={bathroom}
                onChange={
                  isLoading
                    ? () => {}
                    : (e: any) => {
                        setBathroom(e.target.value);
                      }
                }
              />
              <CustomInput
                type="number"
                id="RoomNum"
                label="How many Rooms?"
                value={rooms}
                onChange={
                  isLoading
                    ? () => {}
                    : (e: any) => {
                        setRooms(e.target.value);
                      }
                }
              />
              <CustomInput
                type="number"
                id="BathText"
                label="Total Square foot"
                value={square_foot}
                onChange={
                  isLoading
                    ? () => {}
                    : (e: any) => {
                        setSquareFoot(e.target.value);
                      }
                }
              />
            </Flex>
          </Flex>
          <Divider mt={{ lg: "8" }} colorScheme="secondary" />
          <Flex direction="column" my="10">
            <Heading
              fontSize={{ lg: "25px" }}
              mb={{ base: "4" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              Property Main Data
            </Heading>

            <Flex
              gap={{ lg: 4, base: 10 }}
              direction={{ lg: "row", base: "column" }}
            >
              <Box w={{ lg: "80%", base: "100%" }} my={{ lg: 4 }}>
                <Flex direction="column" gap={{ lg: 4, base: 6 }}>
                  <CustomInput
                    type="text"
                    id="propertyName"
                    label="Property Name"
                    value={property_name}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setPropertyName(e.target.value);
                          }
                    }
                  />
                  <CustomInput
                    type="text"
                    id="propertySubLocation"
                    label="Property SubLocation"
                    value={property_sublocation}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setPropertySubLocation(e.target.value);
                          }
                    }
                  />
                  <CustomInput
                    type="text"
                    id="propertyLocation"
                    label="Property Location"
                    value={property_location}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setPropertyLocation(e.target.value);
                          }
                    }
                  />
                  <CustomTextArea
                    type="text"
                    id="DescriptionData"
                    label={`Property's Description`}
                    value={property_description}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setPropertyDescription(e.target.value);
                          }
                    }
                  />
                </Flex>
              </Box>
              <Box w={{ lg: "20%", base: "100%" }} my={{ lg: 4 }}>
                <Flex direction="column" gap={{ lg: "4" }} h={{ lg: "100%" }}>
                  <CustomInput
                    type="number"
                    id="oneTimePaymentNaira"
                    label="One Time Payment- Naira"
                    value={one_time_payment_naira}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setOneTimePaymentNaira(e.target.value);
                          }
                    }
                  />
                  <CustomInput
                    type="number"
                    id="rentalValueNaira"
                    label="Rental Value- Naira"
                    value={rental_value_naira}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setRentalValueNaira(e.target.value);
                          }
                    }
                  />
                  <CustomInput
                    type="number"
                    id="oneTimePaymentDollar"
                    label="One Time Payment- Dollar"
                    value={one_time_payment_dollar}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setOneTimePaymentDollar(e.target.value);
                          }
                    }
                  />
                  <CustomInput
                    type="number"
                    id="rentalValueDollar"
                    label="Rental Value- Dollar"
                    value={rental_value_dollar}
                    onChange={
                      isLoading
                        ? () => {}
                        : (e: any) => {
                            setRentalValueDollar(e.target.value);
                          }
                    }
                  />
                </Flex>
              </Box>
            </Flex>
            <Box w={{ lg: "40%" }} mt={{ base: 4 }}>
              <LightButton onClick={createLoading ? () => {} : uploadMain}>
                {uploadLoading && createLoading
                  ? "Uploading Images..."
                  : createLoading
                  ? "Creating Document...."
                  : "Upload Property"}
              </LightButton>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default BrickandCondoUpload;
