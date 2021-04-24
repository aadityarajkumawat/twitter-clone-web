import { Box } from "@chakra-ui/layout";
import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { BackSVG } from "../../assets/BackSVG";
import { ProfileProperties } from "../../constants/interfaces";
import {
  Back,
  CoverImageContainer,
  Follows,
  ImgContainer,
  MoreInfo,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "../../pages/Profile/profile.styles";
import { Follow } from "../follow/Follow";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { useProfileStuffAndUserTweetsQuery } from "../../generated/graphql";

interface UserProfileProps {}

export const UserProfile: React.FC<UserProfileProps> = () => {
  const history = useHistory();

  const [
    { data: profileObj, fetching: fetchingProfile },
    refetchProfileStuffAndUserTweets,
  ] = useProfileStuffAndUserTweetsQuery({ variables: { id } });

  const getProfileValByKey = (key: ProfileProperties, fallback: string) => {
    if (!fetchingProfile && profileObj) {
      const profile = profileObj.profileStuffAndUserTweets.profile;
      const val = profile[key];

      return val.toString();
    }
    return fallback;
  };

  return (
    <Box>
      <ProfileNav>
        <Back onClick={() => history.goBack()}>
          <BackSVG />
        </Back>
        <ProfileInfo>
          <Flex flexDir="column">
            <b>{getProfileValByKey("name", "")}</b>
            <span>
              {getProfileValByKey("num", "0")}
              {" Tweets"}
            </span>
          </Flex>
        </ProfileInfo>
      </ProfileNav>
      <CoverImageContainer>
        <ImgContainer>
          <img src={getProfileValByKey("cover_img", "")} alt="user-cover" />
        </ImgContainer>
        <ProfileImgContainer>
          <img src={getProfileValByKey("profile_img", "")} alt="user" />
        </ProfileImgContainer>
        <Button variant="edit-profile" onClick={onOpen}>
          Edit Profile
        </Button>
      </CoverImageContainer>
      {!fetchingProfile && profileObj ? (
        <MoreInfo>
          <b>{getProfileValByKey("name", "")}</b>
          <p className="username">@{getProfileValByKey("username", "")}</p>
          <p className="bio">{getProfileValByKey("bio", "")}</p>
          <p className="link">
            <a href={getProfileValByKey("link", "")}>
              {getProfileValByKey("link", "")}
            </a>
          </p>
          <Follows>
            <span>
              {getProfileValByKey("following", "0")}
              <span className="faded"> Following</span>
            </span>
            <span>
              {getProfileValByKey("followers", "0")}
              <span className="faded"> Followers</span>
            </span>
            <Follow
              isLoggedUser={isLoggedUser}
              followContext={followContext}
              id={id}
              refr={refetchProfileStuffAndUserTweets}
            />
          </Follows>
        </MoreInfo>
      ) : (
        <LoadingSpinner />
      )}
    </Box>
  );
};
