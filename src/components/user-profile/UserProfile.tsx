import React from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { BackSVG } from "../../assets/BackSVG";
import {
  ProfileProperties,
  ProfileRouteParams,
} from "../../constants/interfaces";
import {
  Back,
  CoverImageContainer,
  ImgContainer,
  MoreInfo,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "../../pages/Profile/profile.styles";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import {
  useGetProfileStuffQuery,
  useGetUserByUsernameQuery,
  useMeQuery,
} from "../../generated/graphql";
import { decideAndReturnCorrectId } from "../../helpers";
import { useParams } from "react-router-dom";
import { FollowInfo } from "../follow-info/FollowInfo";

interface UserProfileProps {
  onOpen: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onOpen }) => {
  const history = useHistory();
  const { username } = useParams<ProfileRouteParams>();

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });

  const { id, isLoggedUser } = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser },
    username
  );

  const [
    { data: profile, fetching: fetchingProfile },
  ] = useGetProfileStuffQuery({ variables: { id } });

  const getProfileValByKey = (key: ProfileProperties, fallback: string) => {
    if (!fetchingProfile && profile) {
      const obj = profile.getProfileStuff.profile;
      const val = obj[key];
      return val.toString();
    }
    return fallback;
  };

  return (
    <Box w="100%">
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
      {!fetchingProfile && profile ? (
        <MoreInfo>
          <b>{getProfileValByKey("name", "")}</b>
          <p className="username">@{getProfileValByKey("username", "")}</p>
          <p className="bio">{getProfileValByKey("bio", "")}</p>
          <p className="link">
            <a href={getProfileValByKey("link", "")}>
              {getProfileValByKey("link", "")}
            </a>
          </p>
          <FollowInfo id={id} isLoggedUser={isLoggedUser} />
        </MoreInfo>
      ) : (
        <LoadingSpinner />
      )}
      <Box w="100%" h="3px" bg="#424242" mb="8px"></Box>
    </Box>
  );
};
