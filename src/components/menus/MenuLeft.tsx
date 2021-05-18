import { Flex } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { calc } from '../../helpers';
import { LeftMenu } from "../left-menu/LeftMenu";

interface MenuLeftProps {}

export const MenuLeft: React.FC<MenuLeftProps> = () => {
    const location = useLocation();
    return (
        <Fragment>
            {location.pathname !== "/login" &&
                location.pathname !== "/register" && (
                    <Flex
                        className="left"
                        justifyContent="flex-end"
                        w={calc("50%", "299px")}
                        bg="#222"
                        minWidth="70px"
                    >
                        <LeftMenu />
                    </Flex>
                )}
        </Fragment>
    );
};
