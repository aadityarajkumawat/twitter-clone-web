import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

interface LoadingSpinnerProps {
  h?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ h }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h={h ? h : "160px"}
      overflowY="hidden"
    >
      <Spinner color="white" />
    </Flex>
  );
};
