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
  Follows,
  ImgContainer,
  MoreInfo,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "../../pages/Profile/profile.styles";
import { Follow } from "../follow/Follow";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import {
  useFollowAUserMutation,
  useGetProfileStuffQuery,
  useGetUserByUsernameQuery,
  useMeQuery,
} from "../../generated/graphql";
import { decideAndReturnCorrectId } from "../../helpers/decideAndReturnCorrectId";
import { useParams } from "react-router-dom";

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

  const followContext = useFollowAUserMutation();

  const [
    { data: profile, fetching: fetchingProfile },
    refetchProfileStuff,
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
              refr={refetchProfileStuff}
            />
          </Follows>
        </MoreInfo>
      ) : (
        <LoadingSpinner />
      )}
      <Box w="100%" h="3px" bg="#424242" mb="8px"></Box>
    </Box>
  );
};
