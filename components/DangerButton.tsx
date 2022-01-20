import React from "react";
import { Button } from "@chakra-ui/react";

export const DangerButton = (props: any) => {
  return (
    <Button
      px={10}
      color="white" 
      border="1px solid transparent"
      _hover={{
        bg: "secondary.300",
      }}
      bg="secondary.300"
      onClick={props.onClick}
      fontFamily='ProductBold'
    >
      {props.children}
    </Button>
  );
};
