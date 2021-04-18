import React, { Fragment, useEffect, useReducer } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet from "../components/tweet/Tweet";
import { HomeState } from "../constants/interfaces";
import {
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useMeQuery,
} from "../generated/graphql";
import { getTweetProps } from "../helpers";
import * as S from "./home.styles";
import { RightMenu } from "../components/right-menu/RightMenu";
import { placeholderImg } from "../constants/urls";
import { ComposeTweet } from "../components/compose-tweet/ComposeTweet";
import { TopLoader } from "../components/top-loader/TopLoader";
import { Box } from "@chakra-ui/layout";
import { reducer } from "../reducers/homeReducer";
import { getInfiniteScrollProps } from "../helpers/getInfiniteScrollProps";
import {
  setFeedProgress,
  setFile,
  pushTweetToFeed,
  subscribeToRealtime,
  unsubscribeToRealtime,
} from "../actions";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const initialState: HomeState = {
    more: [],
    pag: { offset: 0 },
    realTime: [],
    feedProgress: 1,
    files: null,
    scrollProps: { dataLength: 3, hasMore: true },
    tweetInput: "",
    subscribed: true,
  };

  const context = useReducer(reducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: loadingUser }, refreshUser] = useMeQuery();
  const [
    { data: feed, fetching: fetchingFeed },
    refreshFeed,
  ] = useGetTweetsByUserQuery();
  const [{ data: rtPosts }] = useListenTweetsSubscription({
    pause: !state.subscribed,
  });

  const paginationProps = { feed, state, dispatch };

  useEffect(() => {
    refreshUser({ requestPolicy: "network-only" });
    refreshFeed({ requestPolicy: "network-only" });
  }, []);

  useEffect(() => {
    subscribeToRealtime(dispatch);

    if (rtPosts && feed) {
      const tweet = rtPosts.listenTweets.tweet;
      pushTweetToFeed(tweet, context);
    }

    return () => unsubscribeToRealtime(dispatch);
  }, [JSON.stringify(rtPosts)]);

  useEffect(() => {
    if (state.feedProgress === 100) {
      setFeedProgress(1, dispatch);
      setFile(null, dispatch);
    }
  }, [state.feedProgress]);

  console.log(state.feedProgress);

  return (
    <S.BaseComponent className="main">
      <S.LeftMenu>
        <LeftMenu />
      </S.LeftMenu>
      <S.HomeMain>
        <S.FeedHeader>
          <TopLoader feedProgress={state.feedProgress} />
          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage
                src={!loadingUser && user ? user.me.user.img : placeholderImg}
              />
            </S.ProfileImageInc>
            <ComposeTweet
              dispatch={dispatch}
              tweetInput={state.tweetInput}
              files={state.files}
            />
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && feed && (
            <Fragment>
              <Box>
                {[...state.realTime, ...feed.getTweetsByUser.tweets].map(
                  (tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  )
                )}
              </Box>
              <InfiniteScroll
                {...getInfiniteScrollProps(feed, paginationProps, context)}
              >
                {state.more.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </InfiniteScroll>
            </Fragment>
          )}
          <div style={{ height: "50px" }}></div>
        </S.Tweets>
      </S.HomeMain>
      <S.RightMenu>
        <RightMenu />
      </S.RightMenu>
    </S.BaseComponent>
  );
};

export default Home;
