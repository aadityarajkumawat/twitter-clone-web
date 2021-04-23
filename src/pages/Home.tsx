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
import { getTweetProps, tweetAlreadyExist } from "../helpers";
import * as S from "./home.styles";
import { RightMenu } from "../components/right-menu/RightMenu";
import { placeholderImg } from "../constants/urls";
import { ComposeTweet } from "../components/compose-tweet/ComposeTweet";
import { TopLoader } from "../components/top-loader/TopLoader";
import { Box } from "@chakra-ui/layout";
import { reducer } from "../reducers/homeReducer";
import { getInfiniteScrollProps } from "../helpers/getInfiniteScrollProps";
import { setFeedProgress, setFile, pushTweetToFeed } from "../actions";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const initialState: HomeState = {
    more: [],
    pag: { offset: 0 },
    realTime: [],
    feedProgress: 0,
    files: null,
    scrollProps: { dataLength: 3, hasMore: true },
    tweetInput: "",
    subscribed: true,
  };

  const context = useReducer(reducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: loadingUser }, refreshUser] = useMeQuery();
  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [{ data: rtPosts }] = useListenTweetsSubscription({
    pause: !state.subscribed,
  });

  const paginationProps = { feed, state, dispatch };

  useEffect(() => {
    refreshUser({ requestPolicy: "network-only" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rtPosts && feed) {
      const alreadyExists = tweetAlreadyExist(state, feed, rtPosts);
      if (alreadyExists) return;

      const tweet = rtPosts.listenTweets.tweet;
      pushTweetToFeed(tweet, context);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(rtPosts)]);

  useEffect(() => {
    if (state.feedProgress === 100) {
      setFeedProgress(0, dispatch);
      setFile(null, dispatch);
    }
    // eslint-disable-next-line
  }, [state.feedProgress]);


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
