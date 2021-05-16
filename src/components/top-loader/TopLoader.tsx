import { Progress } from "@chakra-ui/progress";
import React, { Fragment } from "react";

interface TopLoaderProps {
    feedProgress: number;
}

export const TopLoader: React.FC<TopLoaderProps> = ({ feedProgress }) => {
    return (
        <Fragment>
            {feedProgress !== 0 && feedProgress !== 100 && (
                <Progress
                    w="100%"
                    value={feedProgress}
                    size="xs"
                    colorScheme="blue"
                />
            )}
        </Fragment>
    );
};
