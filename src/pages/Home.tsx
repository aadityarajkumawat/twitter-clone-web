import React from "react";
import { me } from "../constants/urls";
import { useMeQuery } from "../generated/graphql";
import * as S from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [{ data, fetching }, gg] = useMeQuery();
  console.log(data);
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
                <S.TweetInputField placeholder="What's Happening?" />
              </S.TweetInput>
              <S.EditTweetOptions>
                <S.TweetAc></S.TweetAc>
                <S.TweetButton>Tweet</S.TweetButton>
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
