import { Spinner } from "@chakra-ui/spinner";
import React from "react";

interface SplashLoadingProps {}

export const SplashLoading: React.FC<SplashLoadingProps> = () => {
    return (
        <div>
            <Spinner />
        </div>
    );
};
