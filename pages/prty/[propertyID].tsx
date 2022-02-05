/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Input,
} from "@chakra-ui/react";
import React from "react";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../../components/CustomInput";
import { DangerButton } from "../../components/DangerButton";
import { LightButton } from "../../components/LightButton";
import { LoggedInBanner } from "../../components/LoggedInBanner";
import { ScheduleCard } from "../../components/ScheduleCard";
import Image from "next/image";
import AddIcon from "../../public/addIcon.svg";
import {
  AddMulitplePhotos,
  AddedImagesPreview,
  EditMainUploadComp,
} from "../../components/UploadComponents";
import firebase, { firestore } from "../../firebase/config";
import Router from "next/router";
import { DeleteProperty, UpdateProperty } from "../../firebase/firestore";


const IndividualProperty = ({ user }: { user: object }) => {
  // let property;
  const [property, setProperty] = React.useState<any>();
  const [schedules, setSchedules] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const [currentUpload, setCurrentUpload] = React.useState("");
  const [mainImageUploadURL, setMainImageUploadURL] = React.useState("");
  const [mainImageBlob, setMainImageBlob] = React.useState<any>();
  const [subImageOneBlob, setSubImageOneBlob] = React.useState<any>();
  const [subImageTwoBlob, setSubImageTwoBlob] = React.useState<any>();

  const [otherImagesBlob, setOtherImagesBlob] = React.useState<any | []>([]);
  const [otherImagesUploadURL, setOtherImagesUploadURL] = React.useState<
    any | []
  >([]);
  const [otherImagesUploadName, setOtherImagesUploadName] = React.useState("");
  const [otherImageUrl, setOtherImageUrl] = React.useState("");
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
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [uploadOtherImageLoading, setUploadOtherImageLoading] =
    React.useState(false);
  let lmainImageUploadURL: string;
  let lotherImagesUploadURL: any;
  let lsubImageOneUploadURL: string;
  let lsubImageTwoUploadURL: string;
  const [id, setId] = React.useState();

  console.log(schedules);
  
  const onUploadImage = async (e: any, anchor: string) => {
    const selectedFile = e.target.files[0];
    switch (anchor) {
      case "main":
        setCurrentUpload(selectedFile.name);
        setMainImageUploadName(selectedFile.name);
        setMainImageBlob(selectedFile);
        setMainImageUploadURL("");
        onDeletePropertyImage("main");
        break;
      case "subImageOne":
        setCurrentUpload(selectedFile.name);
        setSubImageOneUploadName(selectedFile.name);
        setSubImageOneBlob(selectedFile);
        setSubImageOneUploadURL("");
        onDeletePropertyImage("subImageOne");
        break;
      case "subImageTwo":
        setCurrentUpload(selectedFile.name);
        setSubImageTwoUploadName(selectedFile.name);
        setSubImageTwoBlob(selectedFile);
        setSubImageTwoUploadURL("");
        onDeletePropertyImage("subImageTwo");
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
              if (subImageOneBlob) {
                uploadsubImageOne();
              } else if (subImageTwoBlob) {
                uploadsubImageTwo();
              } else {
                onUpdateProperty();
              }
              break;
            case "subImageOne":
              setSubImageOneUploadURL(downloadURL);
              lsubImageOneUploadURL = downloadURL;
              if (subImageTwoBlob) {
                uploadsubImageTwo();
              } else {
                onUpdateProperty();
              }
              break;
            case "subImageTwo":
              setSubImageTwoUploadURL(downloadURL);
              lsubImageTwoUploadURL = downloadURL;
              onUpdateProperty();
              break;
            default:
              break;
          }
          setIsLoading(false);
        });
      }
    );
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
          setOtherImagesUploadURL([
            ...otherImagesUploadURL,
            { pathId: otherImagesBlob.length, imageURL: downloadURL },
          ]);
          setUploadOtherImageLoading(false);
        });
      }
    );
  };
  const deleteFile = (pathToFile: string, fileName: string) => {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete();
  };
  const onDeletePropertyImage = async (anchor: string) => {
    const storageRef = firebase.storage().ref(`properties/${id}/${anchor}`);
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
  };

  // const onAddOtherImagesUploadURL = (url: string) => {
  //   if (otherImageUrl.trim() === "") {
  //     return;
  //   }
  //   setOtherImagesUploadURL([...otherImagesUploadURL, url]);
  //   setOtherImageUrl("");
  // };

  const onUpdateProperty = async () => {
    setUpdateLoading(true);
    setUploadLoading(false);

    const main = lmainImageUploadURL || mainImageUploadURL;
    const subOne = lsubImageOneUploadURL || lsubImageOneUploadURL;
    const subTwo = lsubImageTwoUploadURL || lsubImageTwoUploadURL;

    if (main && subOne && subTwo) {
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
        property_name,
        property_location,
        property_sublocation,
        property_description,
        one_time_payment_naira: one_time_payment_naira || 0,
        rental_value_naira: rental_value_naira || 0,
        one_time_payment_dollar: one_time_payment_dollar || 0,
        rental_value_dollar: rental_value_dollar || 0,
      };
      UpdateProperty(propertyData, cleanUp);
    } else {
      console.log("====================================");
      console.log("FALSE");
      console.log("====================================");
    }
  };

  const onDeleteProperty = async () => {
    DeleteProperty(property, cleanUp);
  };

  const cleanUp = () => {
    setUpdateLoading(false);
    Router.push("/BrickandCondoDash");
  };
  const uploadMain = () => {
    setUploadLoading(true);
    setUpdateLoading(true);
    fetchImageUrl(mainImageBlob, `${id}`, "main");
  };
  const uploadsubImageOne = () =>
    fetchImageUrl(subImageOneBlob, `${id}`, "subImageOne");
  const uploadsubImageTwo = () => {
    fetchImageUrl(subImageTwoBlob, `${id}`, "subImageTwo");
  };
  React.useEffect(() => {
    const propertyID: any = localStorage.getItem("propertyID");
    getProperty(propertyID);
    getSchedules(propertyID);
    if (!user) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [user]);

  const getSchedules = async (propertyID: number) => {
    const scheduleRef = firestore
      .collection(`properties`)
      .doc(`${propertyID}`)
      .collection(`schedules`);
    const snapshot: any = await scheduleRef.get();
    console.log(snapshot)
    if (snapshot.exists) {      
      const data: any = snapshot.data();
      setSchedules(data);
    }
  };
  const getProperty = async (propertyID: number) => {
    setUploadLoading(false);
    setUpdateLoading(false);
    setIsLoading(true);
    const propertyRef = firestore.collection("properties").doc(`${propertyID}`);
    const snapshot = await propertyRef.get();
    if (snapshot.exists) {
      const data: any = snapshot.data();
      setBathroom(data.bathroom);
      setRooms(data.rooms);
      setId(data.id);
      setSquareFoot(data.square_foot);
      setPropertyName(data.property_name);
      setPropertyLocation(data.property_location);
      setPropertySubLocation(data.property_sublocation);
      setPropertyDescription(data.property_description);
      setOneTimePaymentNaira(data.one_time_payment_naira);
      setRentalValueNaira(data.rental_value_naira);
      setOneTimePaymentDollar(data.one_time_payment_dollar);
      setRentalValueDollar(data.rental_value_dollar);
      lmainImageUploadURL = data.images.main;
      lsubImageOneUploadURL = data.images.sub_image_one;
      lsubImageTwoUploadURL = data.images.sub_image_two;
      lotherImagesUploadURL = data.images.other_images;
      setMainImageUploadURL(data.images.main);
      setOtherImagesUploadURL(data.images.other_images);
      setOtherImagesBlob(data.images.other_images);
      setSubImageOneUploadURL(data.images.sub_image_one);
      setSubImageTwoUploadURL(data.images.sub_image_two);
      setProperty(data);
    }

    setIsLoading(false);
  };
  const checkImageChanges = () => {
    lmainImageUploadURL = property.images.main;
    lsubImageOneUploadURL = property.images.sub_image_one;
    lsubImageTwoUploadURL = property.images.sub_image_two;
    lotherImagesUploadURL = property.images.other_images;
    if (mainImageBlob) {
      setUploadLoading(true);
      setUpdateLoading(true);
      uploadMain();
    } else if (subImageOneBlob) {
      setUploadLoading(true);
      setUpdateLoading(true);
      uploadsubImageOne();
    } else if (subImageTwoBlob) {
      setUploadLoading(true);
      setUpdateLoading(true);
      uploadsubImageTwo();
    } else {
      onUpdateProperty();
    }
  };

  return isLoading ? (
    <Flex direction="column"></Flex>
  ) : (
    <Flex direction="column">
      <LoggedInBanner email={user && { ...Object.values(user) }} />
      <Popover>
        <PopoverTrigger>
          <Flex direction="column" w="fit-content" my={{ base: 4 }}>
            <DangerButton>Delete This Property</DangerButton>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Heading fontFamily="ProductBold" fontSize="2xl">
              Are you sure?
            </Heading>
          </PopoverHeader>
          <PopoverBody>
            <Text
              mb={{ base: 4 }}
              fontFamily="ProductLight"
              fontSize={{ base: "16px" }}
            >
              Are you sure? You can't retrieve this property once deleted.
            </Text>
            <DangerButton onClick={onDeleteProperty}>Yes, Delete</DangerButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Flex
        my={{ base: 10 }}
        justifyContent="flex-start"
        direction={{ base: "column", lg: "row" }}
      >
        <Heading
          w={{ base: "100%", lg: "80%" }}
          fontSize="3xl"
          color="secondary.100"
          fontFamily="ProductBold"
        >
          Updating: {property.property_name}
        </Heading>
      </Flex>

      <Flex gap={{ base: 4 }} direction={{ base: "column", lg: "row" }}>
        <Box w={{ lg: "80%", base: "100%" }}>
          <EditMainUploadComp
            imageURL={mainImageUploadURL}
            text={mainImageUploadName || "Change Main Image"}
            onChange={
              isLoading
                ? () => {}
                : (e: any) => {
                    onUploadImage(e, "main");
                  }
            }
          />
        </Box>
        <Flex
          gap={{ base: 4 }}
          direction={{ base: "column" }}
          w={{ lg: "20%", base: "100%" }}
        >
          <Box>
            <EditMainUploadComp
              imageURL={subImageOneUploadURL}
              text={subImageOneUploadName || "Change Sub Image"}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      onUploadImage(e, "subImageOne");
                    }
              }
            />
          </Box>
          <Box>
            <EditMainUploadComp
              imageURL={subImageTwoUploadURL}
              text={subImageTwoUploadName || "Change Sub Image"}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      onUploadImage(e, "subImageTwo");
                    }
              }
            />
          </Box>
        </Flex>
      </Flex>

      <Flex gap={{ lg: 4, base: 10 }} my="6">
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
      </Flex>
      {uploadOtherImageLoading && (
        <Flex gap={{ lg: 4, base: 10 }} my="4">
          <Text fontFamily="ProductBold" color="primary.300">
            Uploading...
          </Text>
        </Flex>
      )}

      <Flex my={{ base: 8 }} gap={{ base: 4 }} direction="column">
        <Heading fontFamily="ProductBold" fontSize="2xl">
          Added Images:
        </Heading>
        <Flex gap={{ base: 4 }}>
          {otherImagesUploadURL.map((item: any, index: number) => {
            return (
              <Box w="fit-content" key={index}>
                <AddedImagesPreview
                  imageURL={item.imageURL}
                  index={index}
                  pathId={item.pathId}
                  propertyId={property.id}
                  otherImagesUploadURL={otherImagesUploadURL}
                  setOtherImagesUploadURL={setOtherImagesUploadURL}
                />
              </Box>
            );
          })}
        </Flex>
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

        <Flex my={{ base: 8 }} gap={{ base: 4 }} direction="column"></Flex>

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

      <Flex>
        <Divider mt={{ lg: "8" }} colorScheme="secondary" />
      </Flex>

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
              <CustomSelect
                defaultValue={property_location}
                updateSelect={(data: { data: any; target: any }) => {
                  !isLoading && setPropertyLocation(data.target.value);
                }}
                label="Property Location"
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
          <LightButton onClick={checkImageChanges}>
            {uploadLoading && updateLoading
              ? "Uploading Images..."
              : updateLoading
              ? "Updating Document...."
              : "Update Property"}
          </LightButton>
        </Box>
      </Flex>

      <Divider my={{ lg: "8" }} colorScheme="secondary" />
      <Heading
        fontSize={{ lg: "25px" }}
        fontFamily="ProductBold"
        color="secondary.100"
        mb={8}
      >
        Scheduled Date
      </Heading>
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 4 }}>
        {/* {schedules.map((item, index) => {
          return (
            <ScheduleCard
              key={index}
              clientName={item.clientName}
              scheduledDate={item.scheduledDate}
              clientEmail={item.clientEmail}
            />
          );
        })} */}
      </Flex>
    </Flex>
  );
};

export default IndividualProperty;
