import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import {
  ProfileProperties,
  ProfileRouteParams,
} from "../../constants/interfaces";
import { AppContextI } from "../../context/AppContext";
import {
  useGetProfileStuffQuery,
  useGetUserByUsernameQuery,
  useMeQuery,
} from "../../generated/graphql";
import { decideAndReturnCorrectId } from "../../helpers";
import {
  CoverImageContainer,
  ImgContainer,
  MoreInfo,
  ProfileImgContainer,
} from "../../pages/Profile/profile.styles";
import { FollowInfo } from "../follow-info/FollowInfo";
import { ProfileNav } from "../profile-nav/ProfileNav";

interface UserProfileProps {
  onOpen: () => void;
  refreshToken: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onOpen,
  refreshToken,
}) => {
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

  const appContext = useContext(AppContextI);
  const { setUserProfile, loggedUserProfile } = appContext;

  const [
    { data: profile, fetching: fetchingProfile },
    repres,
  ] = useGetProfileStuffQuery({ variables: { id } });

  const getProfileValByKey = (key: ProfileProperties) => {
    if (!fetchingProfile && profile) {
      const obj = profile.getProfileStuff.profile;
      const val = obj[key];
      return val.toString();
    }
    return "";
  };

  useEffect(() => {
    if (profile && profile.getProfileStuff.profile && isLoggedUser) {
      const {
        bio,
        cover_img,
        link,
        name,
        profile_img,
        username,
      } = profile.getProfileStuff.profile;
      setUserProfile({ bio, cover_img, link, name, profile_img, username });
    }
  }, [JSON.stringify(profile)]);

  useEffect(() => {
    repres({ requestPolicy: "network-only" });
    // eslint-disable-next-line
  }, [refreshToken]);

  return (
    <Box w="100%">
      <ProfileNav id={id} />
      <CoverImageContainer>
        <ImgContainer>
          <Image
            src={
              loggedUserProfile && isLoggedUser
                ? loggedUserProfile.cover_img
                : getProfileValByKey("cover_img")
            }
            alt="user-cover"
          />
        </ImgContainer>
        <ProfileImgContainer>
          <Image
            src={
              loggedUserProfile && isLoggedUser
                ? loggedUserProfile.profile_img
                : getProfileValByKey("profile_img")
            }
            alt="user"
          />
        </ProfileImgContainer>
        {isLoggedUser && (
          <Button variant="edit-profile" onClick={onOpen}>
            Edit Profile
          </Button>
        )}
      </CoverImageContainer>
      <MoreInfo>
        <Text fontWeight="600">
          {loggedUserProfile && isLoggedUser
            ? loggedUserProfile.name
            : getProfileValByKey("name")}
        </Text>
        <Text color="#a5a5a5">
          @
          {loggedUserProfile && isLoggedUser
            ? loggedUserProfile.username
            : getProfileValByKey("username")}
        </Text>
        <Text>
          {loggedUserProfile && isLoggedUser
            ? loggedUserProfile.bio
            : getProfileValByKey("bio")}
        </Text>
        <Text className="link">
          <Link href={getProfileValByKey("link")}>
            {loggedUserProfile && isLoggedUser
              ? loggedUserProfile.link
              : getProfileValByKey("link")}
          </Link>
        </Text>
        <FollowInfo id={id} isLoggedUser={isLoggedUser} />
      </MoreInfo>
      <Box w="100%" h="3px" bg="#424242" mb="8px"></Box>
    </Box>
  );
};
