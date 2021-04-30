import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import {
  ProfileProperties,
  ProfileRouteParams,
} from "../../constants/interfaces";
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
import { LoadingSpinner } from "../spinner/LoadingSpinner";

interface UserProfileProps {
  onOpen: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onOpen }) => {
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

  const getProfileValByKey = (key: ProfileProperties) => {
    if (!fetchingProfile && profile) {
      const obj = profile.getProfileStuff.profile;
      const val = obj[key];
      return val.toString();
    }
    return "";
  };

  return (
    <Box w="100%">
      <ProfileNav id={id} />
      <CoverImageContainer>
        <ImgContainer>
          <Image src={getProfileValByKey("cover_img")} alt="user-cover" />
        </ImgContainer>
        <ProfileImgContainer>
          <Image src={getProfileValByKey("profile_img")} alt="user" />
        </ProfileImgContainer>
        {isLoggedUser && (
          <Button variant="edit-profile" onClick={onOpen}>
            Edit Profile
          </Button>
        )}
      </CoverImageContainer>
      {!fetchingProfile && profile ? (
        <MoreInfo>
          <Text fontWeight="600">{getProfileValByKey("name")}</Text>
          <Text color="#a5a5a5">@{getProfileValByKey("username")}</Text>
          <Text>{getProfileValByKey("bio")}</Text>
          <Text className="link">
            <Link href={getProfileValByKey("link")}>
              {getProfileValByKey("link")}
            </Link>
          </Text>
          <FollowInfo id={id} isLoggedUser={isLoggedUser} />
        </MoreInfo>
      ) : (
        <LoadingSpinner />
      )}
      <Box w="100%" h="3px" bg="#424242" mb="8px"></Box>
    </Box>
  );
};
