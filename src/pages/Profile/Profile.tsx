import React, { Fragment, useReducer } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Back,
  CoverImageContainer,
  EditProfileBtn,
  Follows,
  ImgContainer,
  MoreInfo,
  ProfileContainer,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "./profile.styles";
import * as S from "../../pages/home.styles";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { BackSVG } from "../../assets/BackSVG";
import {
  useFollowAUserMutation,
  useMeQuery,
  useProfileStuffAndUserTweetsQuery,
  useGetUserByUsernameQuery,
  MeQuery,
  GetUserByUsernameQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import { ProfileProperties, ProfileState } from "../../constants/interfaces";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { getMoreUserPosts } from "../../helpers/getMore";
import { profileReducer } from "../../reducers/profileReducer";
import { Box, Flex } from "@chakra-ui/layout";
import { getTweetProps } from "../../helpers";
import { Button, useDisclosure } from "@chakra-ui/react";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { useHistory, useParams } from "react-router";
import { Follow } from "../../components/follow/Follow";
import { UserProfile } from "../../components/user-profile/UserProfile";
import { UseQueryResponse } from "urql";

interface ProfileProps {}

interface ProfileRouteParams {
  username: string;
}

type MeParam = {
  fetchingUser: UseQueryResponse<MeQuery, object>[0]["fetching"];
  user: UseQueryResponse<MeQuery, object>[0]["data"];
};
type NUserParam = {
  fetchingNUser: UseQueryResponse<
    GetUserByUsernameQuery,
    object
  >[0]["fetching"];
  nUser: UseQueryResponse<GetUserByUsernameQuery, object>[0]["data"];
};

type DecideAndReturnCorrectId = (cU: MeParam, nU: NUserParam) => number;

export const Profile: React.FC<ProfileProps> = () => {
  const initialState: ProfileState = {
    more: [],
    offset: 0,
    scrollProps: { dataLength: 3, hasMore: true },
  };

  const { username } = useParams<ProfileRouteParams>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const context = useReducer(profileReducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });

  const decideAndReturnCorrectId: DecideAndReturnCorrectId = (fetchingUser) => {
    let id = 0;
    let isLoggedUser = false;
    if (!fetchingUser && user && user.me.user.username === username) {
      id = user.me.user.id;
      isLoggedUser = true;
    } else if (!fetchingNUser && nUser) {
      id = nUser.getUserByUsername.user.id;
      isLoggedUser = false;
    }

    return id;
  };

  const id = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser }
  );

  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useProfileStuffAndUserTweetsQuery({ variables: { id } });

  const followContext = useFollowAUserMutation();

  const paginationProps = { profile: profileObj, state, dispatch };

  // const getProfileValByKey = (key: ProfileProperties, fallback: string) => {
  //   if (!fetchingProfile && profileObj) {
  //     const profile = profileObj.profileStuffAndUserTweets.profile;
  //     const val = profile[key];

  //     return val.toString();
  //   }
  //   return fallback;
  // };

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <S.LeftMenu>
          <LeftMenu />
        </S.LeftMenu>
        <S.HomeMain>
          <UserProfile />
          {/* <ProfileNav>
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
          )} */}

          <div
            style={{
              borderBottom: "1px solid #eeeeee20",
              width: "100%",
              height: "0px",
            }}
          ></div>

          {!fetchingProfile && profileObj ? (
            <Fragment>
              <Fragment>
                {profileObj.profileStuffAndUserTweets.tweets.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>

              <InfiniteScroll
                dataLength={state.scrollProps.dataLength}
                hasMore={
                  profileObj.profileStuffAndUserTweets.profile.num > 5
                    ? state.scrollProps.hasMore
                    : false
                }
                next={() => getMoreUserPosts(paginationProps)}
                loader={<LoadingSpinner />}
              >
                <Fragment>
                  {state.more.map((tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  ))}
                </Fragment>
              </InfiniteScroll>
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}

          <Box my="30px"></Box>
        </S.HomeMain>
        <S.RightMenu>
          <RightMenu />
        </S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
