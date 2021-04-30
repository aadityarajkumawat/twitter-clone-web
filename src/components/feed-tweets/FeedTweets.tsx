import { Box } from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeContextI } from "../../context/HomeContext";
import {
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
} from "../../generated/graphql";
import {
  getInfiniteScrollProps,
  getTweetProps,
  tweetAlreadyExist,
} from "../../helpers";
import { Tweets } from "../../pages/home.styles";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import Tweet from "../tweet/Tweet";

interface FeedTweetsProps {}

export const FeedTweets: React.FC<FeedTweetsProps> = ({}) => {
  const context = useContext(HomeContextI);
  const { state, HomeActionFn } = context;
  const { pushTweetToFeed } = HomeActionFn;

  const [feedResponse] = useGetTweetsByUserQuery();
  const { data: feed, fetching: fetchingFeed } = feedResponse;

  const [{ data: rtPosts }] = useListenTweetsSubscription();

  useEffect(() => {
    if (rtPosts && feedResponse.data) {
      const alreadyExists = tweetAlreadyExist(
        state,
        feedResponse.data,
        rtPosts
      );
      if (alreadyExists) return;

      const tweet = rtPosts.listenTweets.tweet;
      pushTweetToFeed(tweet);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(rtPosts)]);

  return (
    <Tweets>
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
    </Tweets>
  );
};
