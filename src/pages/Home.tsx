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
import { v4 as uuidv4 } from "uuid";

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
  // First fetched tweets
  const [
    { data: tweets, fetching: fetchingTweets },
  ] = useGetTweetsByUserQuery();
  // Realtime added tweets state
  const [realTimeAdded, setRealTimeAdded] = useState<Array<Tweet>>([]);
  // More loaded tweets state
  const [morePosts, setMorePosts] = useState<Array<Tweet>>([]);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    limit: -1,
    offset: 0,
  });
  // Fetching realtime tweets
  const [{ data: realtimePosts }] = useListenTweetsSubscription();
  // Fetching more tweets
  const [
    { data: loadedPosts, fetching: fetchingMorePosts },
  ] = useGetPaginatedPostsQuery({ variables: paginationParams });
  // refresh tweet token
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    if (realtimePosts?.listenTweets.tweet?.tweet_id) {
      const newTweet = realtimePosts.listenTweets.tweet;
      const idOfThisTweet = newTweet.tweet_id;
      let found = false;
      for (let i = 0; i < tweets!.getTweetsByUser.tweets.length; i++) {
        const arr = tweets!.getTweetsByUser.tweets;
        if (arr[i].tweet_id === idOfThisTweet) {
          console.log(realtimePosts);
          console.log("ok hey, hhhooow u doin");
          setRefreshToken(uuidv4());
          found = true;
        }
      }
      if (!found) {
        setRealTimeAdded((prev) => [newTweet, ...prev]);
      }
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
                  refresh={refreshToken}
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
                  refresh={refreshToken}
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
                  refresh={refreshToken}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>Fetching more posts...</Fragment>
          )}
          <S.LoadMoreContainer>
            <S.LoadMoreBtn
              onClick={() => {
                let currentNumberOfPosts =
                  realTimeAdded.length +
                  tweets!.getTweetsByUser.tweets.length +
                  morePosts.length;

                setPaginationParams((prev) => ({
                  ...prev,
                  limit: 2,
                  offset: currentNumberOfPosts,
                }));
              }}
            >
              load more tweets
            </S.LoadMoreBtn>
          </S.LoadMoreContainer>
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
