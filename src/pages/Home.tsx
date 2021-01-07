import React, { useState } from "react";
import { me } from "../constants/urls";
import { useCreateTweetMutation, useMeQuery } from "../generated/graphql";
import * as S from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [{ error, data }, postTweet] = useCreateTweetMutation();
  console.log(error, data);
  const [tweetInput, setTweetInput] = useState<string>("");
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
                  onChange={(e) => setTweetInput(e.target.value)}
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

        <S.Tweets></S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
