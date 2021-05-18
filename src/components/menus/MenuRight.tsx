import { Flex } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { calc } from "../../helpers";
import { RightMenu } from "../../pages/home.styles";

interface MenuRightProps {}

export const MenuRight: React.FC<MenuRightProps> = () => {
    const location = useLocation();
    return (
        <Fragment>
            {location.pathname !== "/login" &&
                location.pathname !== "/register" && (
                    <Flex className="right" w={calc("50%", "299px")} bg="#222">
                        <RightMenu />
                    </Flex>
                )}
        </Fragment>
    );
};
