import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useContext, useReducer } from "react";
import { useParams } from "react-router";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { InfiniteTweets } from "../../components/infinite-posts/InfiniteTweets";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import Tweet from "../../components/tweet/Tweet";
import { UserProfile } from "../../components/user-profile/UserProfile";
import { PAGINATE_USER_PROFILE } from "../../constants/consts";
import { ProfileRouteParams, ProfileState } from "../../constants/interfaces";
import { HomeContextI } from "../../context/HomeContext";
import {
  useGetTweetsByUserFQuery,
  useGetUserByUsernameQuery,
  useMeQuery,
} from "../../generated/graphql";
import {
  decideAndReturnCorrectId,
  getTweetProps,
  removeDuplicatesFromRealTime,
} from "../../helpers";
import * as S from "../../pages/home.styles";
import { profileReducer } from "../../reducers/profileReducer";
import { ProfileContainer } from "./profile.styles";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const initialState: ProfileState = {
    more: [],
    offset: 0,
    scrollProps: { dataLength: PAGINATE_USER_PROFILE, hasMore: true },
    realTime: [],
  };

  const { username } = useParams<ProfileRouteParams>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    state: { realTime },
  } = useContext(HomeContextI);

  const context = useReducer(profileReducer, initialState);

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });

  const { id } = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser },
    username
  );

  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useGetTweetsByUserFQuery({ variables: { id } });

  if (username === "home" || username === "login" || username === "register")
    return <Fragment></Fragment>;

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <LeftMenu />
        <S.HomeMain>
          <UserProfile onOpen={onOpen} />
          {!fetchingProfile && profileObj ? (
            <Fragment>
              {!fetchingUser && user && user.me.user.username === username && (
                <Fragment>
                  {removeDuplicatesFromRealTime(realTime, profileObj).map(
                    (tweet) => (
                      <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                    )
                  )}
                </Fragment>
              )}
              <Fragment>
                {profileObj.getTweetsByUserF.tweets.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>

              <InfiniteTweets
                profileObj={profileObj}
                id={id}
                context={context}
              />
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}
          <Box my="30px"></Box>
        </S.HomeMain>
        <RightMenu />
      </ProfileContainer>
    </Fragment>
  );
};
