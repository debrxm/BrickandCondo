import {
  Box,
  Flex,
  Img as ChkImg,
  Heading,
  Link,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import BurgerMenuIcon from "../public/burgermenuicon.svg";
import WhatsappIcon from "../public/whatsapp.png";
import PhoneIcon from "../public/phone.png";
import CancelIcon from "../public/closeIcon.svg";
import DarkLogo from "../public/blackLogoBrickandCondo.svg";
import { useRouter } from "next/router";

const MobileMenuCover = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Function;
}) => {
  return (
    <Flex
      borderRadius="2xl"
      zIndex={1}
      display={{ lg: "none", base: show ? "flex" : "none" }}
      bg="secondary.100"
      h="100vh"
      w="100%"
      left="0"
      position="absolute"
      top="105%"
      py={{ base: 8 }}
      px={{ base: 4 }}
      direction={{ base: "column" }}
    >
      <Flex direction="column">
        <Heading color="white" fontSize="xl" fontFamily="ProductBold">
          Select A Location
        </Heading>
        <Flex direction="column" mt={6}>
          <MobileMenuItem clickFunc={setShow} text="lekki" />
          <MobileMenuItem clickFunc={setShow} text="ajah" />
          <MobileMenuItem clickFunc={setShow} text="vi" />
          <MobileMenuItem clickFunc={setShow} text="sangotedo" />
        </Flex>
      </Flex>
    </Flex>
  );
};

const MenuItem = ({ text }: { text: string }) => {
  let router = useRouter();
  return (
    <Text
      borderRadius="xl"
      py={{ lg: 3 }}
      px={{ lg: 6 }}
      fontFamily="ProductBold"
      textTransform="capitalize"
      cursor="pointer"
      _hover={{ color: "white", bg: "primary.200" }}
      transition="all 0.3s"
      onClick={() => {
        router.push(
          {
            query: { filter: text },
          },
          undefined
        );
      }}
    >
      {text}
    </Text>
  );
};

const MobileMenuItem = ({
  text,
  clickFunc,
}: {
  text: string;
  clickFunc: Function;
}) => {
  let router = useRouter();
  return (
    <Text
      color="white"
      borderRadius="xl"
      py={{ base: 3 }}
      fontSize="xl"
      fontFamily="ProductLight"
      textTransform="capitalize"
      cursor="pointer"
      _active={{ color: "white", bg: "primary.200" }}
      transition="all 0.3s"
      onClick={() => {
        clickFunc();
        router.push(
          {
            query: { filter: text },
          },
          undefined
        );
      }}
    >
      {text}
    </Text>
  );
};
const Header = () => {
  //Hooks
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  return (
    <Flex
      position="relative"
      align="center"
      pt={4}
      m="0 auto"
      w={{ base: "100%" }}
    >
      <Flex w={{ lg: "70%", base: "90%" }}>
        <Box>
          <Link href="/" _focus={{ outline: "4px solid red" }}>
            <Box w={{ base: "90px", lg: "120px" }} ml={{ lg: "-4%" }}>
              <Image src={DarkLogo} priority />
            </Box>
          </Link>
        </Box>
      </Flex>
      <Flex
        justifyContent="flex-end"
        gap={{ lg: 10 }}
        w={{ lg: "30%", base: "0" }}
        display={{ base: "none", lg: "flex" }}
      >
        <MenuItem text="lekki" />
        <MenuItem text="ajah" />
        <MenuItem text="vi" />
        <MenuItem text="sangotedo" />
      </Flex>

      <Flex
        w={{ base: "10%" }}
        gap={{ lg: 4 }}
        display={{ base: "flex", lg: "none" }}
      >
        <Box
          w={{ base: "100px" }}
          transform="scale(1.5)"
          onClick={() => {
            setShowMobileMenu(!showMobileMenu);
          }}
        >
          <Image src={showMobileMenu ? CancelIcon : BurgerMenuIcon} priority />
        </Box>
      </Flex>
      <MobileMenuCover
        setShow={() => {
          setShowMobileMenu(!showMobileMenu);
        }}
        show={showMobileMenu}
      />
    </Flex>
  );
};

const Footer = () => {
  let router = useRouter();
  return (
    <Box
      mt={{ lg: 10, base: 10 }}
      py={16}
      px={{ base: 0, lg: 0 }}
      borderRadius="3xl"
      w={{ base: "95%" }}
      mx={{ base: "auto" }}
    >
      <Box w={{ base: "90px" }} mb={14} ml={{ base: "-3%", lg: "-1%" }}></Box>
      <Box>
        <Flex direction={{ base: "column", lg: "row" }} gap="10">
          <Flex direction="column" gap="4" w="100%">
            <Heading fontFamily="ProductBold" fontSize="xl" color="primary.300">
              Explore BrickandCondo
            </Heading>
            <Flex gap="2" direction="column">
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Instagram
              </Link>
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Youtube
              </Link>
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Facebook
              </Link>
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Twitter
              </Link>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" w="100%">
            <Heading fontFamily="ProductBold" fontSize="xl" color="primary.300">
              Talk to Us
            </Heading>
            <Flex gap="2" direction="column">
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Email
              </Link>
              <Link
                w="fit-content"
                href="https://instagram.com"
                fontFamily="ProductLight"
              >
                Office Number
              </Link>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" w="100%">
            <Heading fontFamily="ProductBold" fontSize="xl" color="primary.300">
              Locations
            </Heading>
            <Flex gap="2" direction="column">
              <Link
                w="fit-content"
                cursor="pointer"
                onClick={() => {
                  router.push({ query: { filter: "lekki" } });
                }}
                fontFamily="ProductLight"
              >
                Lekki
              </Link>
              <Link
                w="fit-content"
                cursor="pointer"
                onClick={() => {
                  router.push({ query: { filter: "ajah" } });
                }}
                fontFamily="ProductLight"
              >
                Ajah
              </Link>
              <Link
                w="fit-content"
                cursor="pointer"
                onClick={() => {
                  router.push({ query: { filter: "sangotedo" } });
                }}
                fontFamily="ProductLight"
              >
                Sangotedo
              </Link>
              <Link
                w="fit-content"
                cursor="pointer"
                onClick={() => {
                  router.push({ query: { filter: "ikeja" } });
                }}
                fontFamily="ProductLight"
              >
                Ikeja
              </Link>
              <Link
                w="fit-content"
                cursor="pointer"
                onClick={() => {
                  router.push({ query: { filter: "vi" } });
                }}
                fontFamily="ProductLight"
              >
                VI
              </Link>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" w="100%">
            <Heading fontFamily="ProductBold" fontSize="xl" color="primary.300">
              We are for you.
            </Heading>
            <Flex gap="2" direction="column">
              <Text fontFamily="ProductLight">
                Brick & Condo gives you the needed assistance as your venture
                into real estate inveting.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const FloatingContact = () => {
  const [showMore, setShowMore] = React.useState<boolean>(false);
  return (
    <Flex
      bg="#06A7C2"
      onMouseEnter={() => {
        setShowMore(true);
      }}
      onMouseLeave={() => {
        setShowMore(false);
      }}
      position="fixed"
      zIndex={44}
      p="1.4rem"
      borderRadius="100px"
      bottom="5%"
      right="2%"
      boxShadow="0 0 20px 9px #09a7c26e"
      width="160px"
      height="80px"
      transition="all 2s"
      display="flex"
      alignItems="center"
      cursor="pointer"
    >
      <Text
        color="white"
        fontFamily="ProductBold"
        fontSize="1.3rem"
        display={!showMore ? "block" : "none"}
      >
        Contact Us!
      </Text>
      <Flex
        alignItems="center"
        display={showMore ? "flex" : "none"}
        gap="0.5rem"
        w="100%"
        justifyContent="center"
        flexDirection="row"
      >
        <Link
          p="0.4rem"
          target="_blank"
          href="https://api.whatsapp.com/send?phone=8056842804&text=Brickandcondo%20at%20your%20service"
          _focus={{ outline: "4px solid #06A7C2" }}
          w="40px"
        >
          <Image src={WhatsappIcon} priority />
        </Link>
        <Divider orientation="vertical" h="20px" />
        <Link
          p="0.4rem"
          target="_blank"
          href="tel:08056842804"
          _focus={{ outline: "4px solid #06A7C2" }}
          w="30px"
        >
          <Image src={PhoneIcon} priority />
        </Link>
      </Flex>
    </Flex>
  );
};
export const PageWrapper = (props: any) => {
  return (
    <Box>
      <Header />
      <FloatingContact />
      <Box
        maxWidth={{ lg: "100vw" }}
        mx="auto"
        py={{ lg: 4, base: 6 }}
        px={{ lg: 2, base: 4 }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};
