import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetPaginatedPostsQuery,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import { useGetPaginatedPosts } from "../hooks/useGetPaginatedPosts";
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

interface TweetType {
  comments: number;
  created_At: string;
  liked: boolean;
  likes: number;
  name: string;
  rel_acc: number;
  tweet_content: string;
  tweet_id: number;
  username: string;
  _type: string;
}

const Home: React.FC<HomeProps> = () => {
  // Posting a tweet mutation
  const [, postTweet] = useCreateTweetMutation();
  // Tweet input field
  const [tweetInput, setTweetInput] = useState<string>("");

  // localstate of realtime-tweets and more-fetched tweets
  const [realTime, setRealTime] = useState<Array<TweetType>>([]);

  // Fetching user-feed
  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();

  // Listening to realtime tweets
  const [{ data: realTimePost }] = useListenTweetsSubscription();

  const { more, hasMore, dataLength, getMore } = useGetPaginatedPosts(
    feed,
    realTime
  );

  useEffect(() => {
    if (realTimePost && feed) {
      if (
        !tweetAlreadyExist(
          more,
          feed?.getTweetsByUser.tweets,
          realTime,
          realTimePost.listenTweets.tweet!.tweet_id
        ) &&
        realTimePost.listenTweets.tweet
      ) {
        const post = realTimePost.listenTweets.tweet;
        setRealTime((prev) => [post, ...prev]);
      }
    }
  }, [realTimePost?.listenTweets.tweet?.tweet_id]);

  return (
    <S.BaseComponent className="main">
      <S.LeftMenu>
        <LeftMenu />
      </S.LeftMenu>
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
            dataLength={dataLength}
            hasMore={hasMore}
            next={getMore}
            loader={
              feed ? (
                feed.getTweetsByUser.num >= 7 && <h4>loading...</h4>
              ) : (
                <div></div>
              )
            }
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
      <S.RightMenu></S.RightMenu>
    </S.BaseComponent>
  );
};

export default Home;
