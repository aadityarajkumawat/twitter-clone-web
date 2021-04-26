import React, { Fragment, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet from "../components/tweet/Tweet";
import { HomeContextType } from "../constants/interfaces";
import {
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useMeQuery,
} from "../generated/graphql";
import { getTweetProps, tweetAlreadyExist } from "../helpers";
import * as S from "./home.styles";
import { RightMenu } from "../components/right-menu/RightMenu";
import { placeholderImg } from "../constants/urls";
import { ComposeTweet } from "../components/compose-tweet/ComposeTweet";
import { TopLoader } from "../components/top-loader/TopLoader";
import { Box } from "@chakra-ui/layout";
import { getInfiniteScrollProps } from "../helpers/getInfiniteScrollProps";
import { HomeContextI } from "../context/HomeContext";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const context = useContext<HomeContextType>(HomeContextI);
  const { state, HomeActionFn } = context;

  const [{ data: user, fetching: loadingUser }, refreshUser] = useMeQuery();
  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [{ data: rtPosts }] = useListenTweetsSubscription({
    pause: !state.subscribed,
  });

  useEffect(() => {
    refreshUser({ requestPolicy: "network-only" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rtPosts && feed) {
      const alreadyExists = tweetAlreadyExist(state, feed, rtPosts);
      if (alreadyExists) return;

      const tweet = rtPosts.listenTweets.tweet;
      HomeActionFn.pushTweetToFeed(tweet);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(rtPosts)]);

  useEffect(() => {
    if (state.feedProgress === 100) {
      HomeActionFn.setFeedProgress(0);
      HomeActionFn.setFile(null);
    }
    // eslint-disable-next-line
  }, [state.feedProgress]);

  return (
    <S.BaseComponent className="main">
      <LeftMenu />
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
            <ComposeTweet tweetInput={state.tweetInput} files={state.files} />
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && feed ? (
            <Fragment>
              <Box>
                {[...state.realTime, ...feed.getTweetsByUser.tweets].map(
                  (tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  )
                )}
              </Box>
              <InfiniteScroll {...getInfiniteScrollProps(feed, context)}>
                {state.more.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </InfiniteScroll>
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}
          <div style={{ height: "50px" }}></div>
        </S.Tweets>
      </S.HomeMain>
      <RightMenu />
    </S.BaseComponent>
  );
};

export default Home;
