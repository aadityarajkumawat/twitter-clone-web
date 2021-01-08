import React, { Fragment, useEffect, useState } from "react";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
} from "../generated/graphql";
import * as S from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [
    { data: tweets, fetching: fetchingTweets },
    refetchTweets,
  ] = useGetTweetsByUserQuery();

  console.log({ tweets, fetchingTweets });

  // useEffect(() => {
  //   setInterval(() => {
  //     refetchTweets({ requestPolicy: "network-only" });
  //   }, 2000);
  // }, []);

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
          {!fetchingTweets ? (
            <Fragment>
              {tweets!.getTweetsByUser.tweets.map(
                ({
                  name,
                  username,
                  tweet_content,
                  likes,
                  comments,
                  liked,
                  tweet_id,
                }) => (
                  <Tweet
                    name={name}
                    liked={liked}
                    tweet_content={tweet_content}
                    key={tweet_id}
                    username={username}
                    likes={likes}
                    comments={comments}
                    tweet_id={tweet_id}
                  />
                )
              )}
            </Fragment>
          ) : (
            <Fragment>Loading...</Fragment>
          )}
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
