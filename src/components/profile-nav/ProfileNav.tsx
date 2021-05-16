import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { BackSVG } from "../../assets/BackSVG";
import { HomeContextI } from "../../context/HomeContext";
import { useGetProfileStuffQuery } from "../../generated/graphql";
import {
    Back,
    ProfileInfo,
    ProfileNav as ProfileN,
} from "../../pages/Profile/profile.styles";

interface ProfileNavProps {
    id: number;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ id }) => {
    const history = useHistory();
    const [{ data, fetching }, refe] = useGetProfileStuffQuery({
        variables: { id },
    });
    const context = useContext(HomeContextI);

    useEffect(() => {
        refe({ requestPolicy: "network-only" });
        // eslint-disable-next-line
    }, [context.state.realTime.length]);

    return (
        <ProfileN>
            <Back onClick={() => history.goBack()}>
                <BackSVG />
            </Back>
            <ProfileInfo>
                <Flex flexDir="column">
                    <Text fontWeight="600" fontSize="sm">
                        {!fetching && data
                            ? data.getProfileStuff.profile.name
                            : ""}
                    </Text>
                    <Box fontSize="sm">
                        {!fetching && data
                            ? data.getProfileStuff.profile.num
                            : 0}
                        {" Tweets"}
                    </Box>
                </Flex>
            </ProfileInfo>
        </ProfileN>
    );
};
