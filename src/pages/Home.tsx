import React, { Fragment, useEffect, useState } from "react";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useGetPaginatedPostsQuery,
} from "../generated/graphql";
import * as S from "./home.styles";

interface HomeProps {}

interface Tweet {
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

interface PaginationParams {
  offset: number;
  limit: number;
}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [
    { data: tweets, fetching: fetchingTweets },
  ] = useGetTweetsByUserQuery();
  const [realTimeAdded, setRealTimeAdded] = useState<Array<Tweet>>([]);
  const [morePosts, setMorePosts] = useState<Array<Tweet>>([]);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    limit: -1,
    offset: 0,
  });
  const [{ data: realtimePosts }] = useListenTweetsSubscription();
  const [
    { data: loadedPosts, fetching: fetchingMorePosts },
  ] = useGetPaginatedPostsQuery({ variables: paginationParams });

  useEffect(() => {
    if (realtimePosts?.listenTweets.tweet?.tweet_id) {
      const newTweet = realtimePosts.listenTweets.tweet;
      setRealTimeAdded((prev) => [newTweet, ...prev]);
    }
  }, [realtimePosts?.listenTweets.tweet?.tweet_id]);

  useEffect(() => {
    if (loadedPosts) {
      const moreP = loadedPosts.getPaginatedPosts.tweets;
      setMorePosts((prev) => [...prev, ...moreP]);
    }
  }, [JSON.stringify(loadedPosts?.getPaginatedPosts.tweets)]);

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
          {realTimeAdded.length > 0 && (
            <Fragment>
              {realTimeAdded.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  liked={tweet.liked}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  likes={tweet.likes}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          )}
          {!fetchingTweets ? (
            <Fragment>
              {tweets!.getTweetsByUser.tweets.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  liked={tweet.liked}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  likes={tweet.likes}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>Loading...</Fragment>
          )}
          {!fetchingMorePosts ? (
            <Fragment>
              {morePosts.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  liked={tweet.liked}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  likes={tweet.likes}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>Fetching more posts...</Fragment>
          )}
          <div>
            <button
              onClick={() => {
                let currentNumberOfPosts =
                  realTimeAdded.length +
                  tweets!.getTweetsByUser.tweets.length +
                  morePosts.length;

                setPaginationParams((prev) => ({
                  ...prev,
                  limit: 6,
                  offset: currentNumberOfPosts,
                }));
              }}
            >
              load more tweets
            </button>
          </div>
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
