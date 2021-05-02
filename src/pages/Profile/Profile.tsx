import { Box, useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useContext, useReducer } from "react";
import { useParams } from "react-router";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { InfiniteTweets } from "../../components/infinite-posts/InfiniteTweets";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import Tweet from "../../components/tweet/Tweet";
import { UserProfile } from "../../components/user-profile/UserProfile";
import {
  ProfileRouteParams,
  ProfileState,
  TweetType,
} from "../../constants/interfaces";
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
import { HomeMain } from "../../pages/home.styles";
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

  const [{ data, fetching }] = useGetTweetsByUserFQuery({ variables: { id } });

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <LeftMenu />
        <HomeMain>
          <UserProfile onOpen={onOpen} />

          {!fetching && data ? (
            <Fragment>
              {!fetchingUser && user && user.me.user.username === username && (
                <Fragment>
                  {removeDuplicatesFromRealTime(
                    homeContext.state.realTime,
                    data
                  ).map((tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  ))}
                </Fragment>
              )}
              <Fragment>
                {data.getTweetsByUserF.tweets.map((tweet: TweetType) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>

              <InfiniteTweets profileObj={data} id={id} context={context} />
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}
          <Box my="30px"></Box>
        </HomeMain>
        <RightMenu />
      </ProfileContainer>
    </Fragment>
  );
};
