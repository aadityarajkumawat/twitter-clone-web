import React, { Fragment, useEffect, useRef, useState } from "react";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useGetPaginatedPostsQuery,
  GetPaginatedPostsQuery,
} from "../generated/graphql";
import * as S from "./home.styles";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import InfiniteScroll from "react-infinite-scroll-component";

interface HomeProps {}

interface TweetItem {
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

interface Scroller {
  dataLength: number;
  hasMore: boolean;
}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
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

        <S.Tweets></S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
