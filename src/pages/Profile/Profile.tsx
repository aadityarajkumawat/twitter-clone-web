import { Box, useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import Tweet from "../../components/tweet/Tweet";
import { UserProfile } from "../../components/user-profile/UserProfile";
import { ProfileRouteParams, ProfileState } from "../../constants/interfaces";
import { HomeContextI } from "../../context/HomeContext";
import {
  useGetUserByUsernameQuery,
  useListenUserTweetsSubscription,
  useMeQuery,
  useTriggerUserTweetQuery,
} from "../../generated/graphql";
import { decideAndReturnCorrectId, getTweetProps } from "../../helpers";
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
  const homeContext = useContext(HomeContextI);

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });

  const { id } = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser },
    username
  );

  const [{ data: userFeed }] = useListenUserTweetsSubscription({
    variables: { id },
  });

  const [
    { data: triggered, fetching: triggering },
    refe,
  ] = useTriggerUserTweetQuery({
    variables: { id },
  });

  useEffect(() => {
    refe({ requestPolicy: "network-only" });
  }, [JSON.stringify(userFeed)]);

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <LeftMenu />
        <S.HomeMain>
          <UserProfile onOpen={onOpen} />
          {!triggering && triggered && userFeed ? (
            <Fragment>
              {/* {!fetchingUser && user && user.me.user.username === username && (
                <Fragment>
                  {removeDuplicatesFromRealTime(
                    homeContext.state.realTime,
                    profileObj
                  ).map((tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  ))}
                </Fragment>
              )} */}
              <Fragment>
                {userFeed.listenUserTweets.tweets &&
                  userFeed.listenUserTweets.tweets.map((tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  ))}
              </Fragment>

              {/* <InfiniteTweets
                profileObj={profileObj}
                id={id}
                context={context}
              /> */}
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
