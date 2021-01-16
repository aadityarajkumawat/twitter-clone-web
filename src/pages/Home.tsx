import React, { Fragment, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetPaginatedPostsQuery,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import * as S from "./home.styles";

interface HomeProps {}

interface Pag {
  limit: number;
  offset: number;
}

interface InfiniteScrolling {
  hasMore: boolean;
  dataLength: number;
}

const Home: React.FC<HomeProps> = () => {
  // Posting a tweet mutation
  const [, postTweet] = useCreateTweetMutation();
  // Tweet input field
  const [tweetInput, setTweetInput] = useState<string>("");

  // localstate of realtime-tweets and more-fetched tweets
  const [realTime, setRealTime] = useState<Array<any>>([]);
  const [more, setMore] = useState<Array<any>>([]);

  // Fetching user-feed
  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();

  // Listening to realtime tweets
  const [{ data: realTimePost }] = useListenTweetsSubscription();

  // local state of pagination params
  const [pag, setPag] = useState<Pag>({ offset: 0, limit: -1 });

  // fetching paginated posts
  const [{ data }] = useGetPaginatedPostsQuery({
    variables: pag,
  });

  // local state for infinite scrolling props
  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 2,
    hasMore: true,
  });

  useEffect(() => {
    if (realTimePost && feed) {
      if (
        !tweetAlreadyExist(
          more,
          feed?.getTweetsByUser.tweets,
          realTime,
          realTimePost.listenTweets.tweet!.tweet_id
        )
      )
        setRealTime((prev) => [realTimePost.listenTweets.tweet, ...prev]);
    }
  }, [realTimePost?.listenTweets.tweet?.tweet_id]);

  const getMore = () => {
    if (feed?.getTweetsByUser.num) {
      if (pag.offset === feed.getTweetsByUser.num) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }
      console.log(7, scrollProps.dataLength, realTime.length);
      setPag({
        limit: 1,
        offset: 7 + scrollProps.dataLength + realTime.length,
      });
      if (data) {
        if (data.getPaginatedPosts.tweets.length === 1) {
          setMore((prev) => [...prev, data.getPaginatedPosts.tweets[0]]);
        }
      }
      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + 1,
      }));
    }
  };

  return (
    <S.BaseComponent>
      <S.HomeMain>
        <S.FeedHeader>
          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage src={me} />
            </S.ProfileImageInc>
            <S.MTweet>
              <S.TweetInput>
                <S.TweetInputField
                  placeholder="What's Happening?"
                  onBlur={(e) => setTweetInput(e.target.value)}
                />
              </S.TweetInput>
              <S.EditTweetOptions>
                <S.TweetAc></S.TweetAc>
                <S.TweetButton
                  onClick={() => postTweet({ tweet_content: tweetInput })}
                >
                  Tweet
                </S.TweetButton>
              </S.EditTweetOptions>
            </S.MTweet>
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && (
            <Fragment>
              {[...realTime, ...feed!.getTweetsByUser.tweets].map((tweet) => (
                <Tweet
                  tweet_id={tweet.tweet_id}
                  tweet_content={tweet.tweet_content}
                  name={tweet.name}
                  comments={tweet.comments}
                  username={tweet.username}
                  key={tweet.tweet_id}
                />
              ))}
            </Fragment>
          )}
          <InfiniteScroll
            dataLength={scrollProps.dataLength}
            hasMore={scrollProps.hasMore}
            next={getMore}
            loader={<h4>loading...</h4>}
          >
            <Fragment>
              {more
                .filter((t) => t !== undefined)
                .map((tweet) => (
                  <Tweet
                    tweet_id={tweet.tweet_id}
                    tweet_content={tweet.tweet_content}
                    name={tweet.name}
                    comments={tweet.comments}
                    username={tweet.username}
                    key={tweet.tweet_id}
                  />
                ))}
            </Fragment>
          </InfiniteScroll>
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
