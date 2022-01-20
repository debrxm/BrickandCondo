import React from "react";
import { Button } from "@chakra-ui/react";

export const LightButton = (props: any) => {
  return (
    <Button
      px={10}
      color="white"
      border="1px solid transparent"
      _hover={{
        color: "primary.200",
        bg: "primary.100",
        borderColor: "primary.200",
      }}
      bg="primary.200"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
