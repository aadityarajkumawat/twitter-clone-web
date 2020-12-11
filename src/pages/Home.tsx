import React, { useEffect, useState } from "react";
import { myImage } from "../constants/urls";
import * as S from "./home.styles";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
} from "../generated/graphql";
import Tweet from "../components/tweet/Tweet";
import { refresh } from "../helpers/refresh";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [{ data: createTweetData }, createTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [{ data: tweets }, refetchTweets] = useGetTweetsByUserQuery();

  useEffect(() => {
    refetchTweets({ requestPolicy: "network-only" });
  }, [refresh(createTweetData)]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetInput(() => e.target.value);
  };

  const makeTweet = () => {
    createTweet({ tweet_content: tweetInput });
  };

  return (
    <S.BaseComponent>
      <S.HomeMain>
        <S.FeedHeader>
          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage src={myImage} />
            </S.ProfileImageInc>
            <S.MTweet>
              <S.TweetInput>
                <S.TweetInputField
                  placeholder="What's Happening?"
                  onBlur={handleChange}
                />
              </S.TweetInput>
              <S.EditTweetOptions>
                <S.TweetAc></S.TweetAc>
                <S.TweetButton onClick={makeTweet}>Tweet</S.TweetButton>
              </S.EditTweetOptions>
            </S.MTweet>
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {tweets?.getTweetsByUser &&
            tweets.getTweetsByUser.tweets.map((tweet) => (
              <Tweet
                key={tweet.tweet_id}
                tweet_content={tweet.tweet_content}
                username={"Aditya"}
                tweet_id={tweet.tweet_id}
              />
            ))}
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};
export default Home;
