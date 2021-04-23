import React from "react";
import { Spinner } from "@chakra-ui/spinner";

interface SplashLoadingProps {}

export const SplashLoading: React.FC<SplashLoadingProps> = () => {
  return (
    <div>
      <Spinner />
    </div>
  );
};
