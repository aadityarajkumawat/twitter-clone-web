import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router";
import { BackSVG } from "../../assets/BackSVG";
import {
  Back,
  ProfileInfo,
  ProfileNav as ProfileN,
} from "../../pages/Profile/profile.styles";

interface OpenTweetHeaderProps {}

export const OpenTweetHeader: React.FC<OpenTweetHeaderProps> = () => {
  const history = useHistory();

  return (
    <ProfileN>
      <Back onClick={() => history.goBack()}>
        <BackSVG />
      </Back>
      <ProfileInfo>
        <Flex flexDir="column">
          <Text fontWeight="600" fontSize="md">
            Tweet
          </Text>
        </Flex>
      </ProfileInfo>
    </ProfileN>
  );
};
