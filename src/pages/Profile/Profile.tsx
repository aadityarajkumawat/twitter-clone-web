import { Box, useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { InfiniteTweets } from "../../components/infinite-posts/InfiniteTweets";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import Tweet from "../../components/tweet/Tweet";
import { UserProfile } from "../../components/user-profile/UserProfile";
import { ProfileRouteParams, ProfileState } from "../../constants/interfaces";
import {
  useGetTweetsByUserFQuery,
  useGetUserByUsernameQuery,
  useListenTweetsSubscription,
  useMeQuery,
} from "../../generated/graphql";
import {
  decideAndReturnCorrectId,
  getTweetProps,
  tweetAlreadyExist,
} from "../../helpers";
import * as S from "../../pages/home.styles";
import { profileReducer } from "../../reducers/profileReducer";
import { ProfileContainer } from "./profile.styles";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const initialState: ProfileState = {
    more: [],
    offset: 0,
    scrollProps: { dataLength: 0, hasMore: true },
    realTime: [],
  };

  const { username } = useParams<ProfileRouteParams>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useReducer(profileReducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });
  const [{ data: rtPosts }] = useListenTweetsSubscription();

  const { id } = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser },
    username
  );

  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useGetTweetsByUserFQuery({ variables: { id } });

  useEffect(() => {
    if (rtPosts && profileObj) {
      const userFeed = profileObj.getTweetsByUserF.tweets;
      const alreadyExists = tweetAlreadyExist(state, userFeed, rtPosts);
      if (alreadyExists) return;

      const tweet = rtPosts.listenTweets.tweet;
      dispatch({ type: "rt", realTimePosts: [tweet, ...state.realTime] });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(rtPosts)]);

  console.log(profileObj, state.realTime);

  if (username === "home" || username === "login" || username === "register") {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <LeftMenu />
        <S.HomeMain>
          <UserProfile onOpen={onOpen} />
          {!fetchingProfile && profileObj ? (
            <Fragment>
              {/* {!fetchingUser && user && user.me.user.username === username && (
                <Fragment>
                  {removeDuplicatesFromRealTime(state.realTime, profileObj).map(
                    (tweet) => (
                      <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                    )
                  )}
                </Fragment>
              )} */}
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
