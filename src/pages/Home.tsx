import React, { useEffect, useState } from "react";
import { myImage } from "../constants/urls";
import * as S from "./home.styles";
import {
  useCreateTweetMutation,
  useGetLikesQuery,
  useGetTweetsByUserQuery,
} from "../generated/graphql";
import Tweet from "../components/tweet/Tweet";
import { refresh } from "../helpers/refresh";
import { StyledDiv } from "../constants/styles";
import { useHighContext } from "stithi";
import { contextNames } from "../stithi/callContext";

interface HomeProps {}

interface UserTweetsI {
  tweet_id: number;
  tweet_content: string;
  name: string;
  username: string;
  liked: boolean;
}

const Home: React.FC<HomeProps> = () => {
  const [{ data: createTweetData }, createTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [
    { data: tweets, fetching: fetchingTweets },
    refetchTweets,
  ] = useGetTweetsByUserQuery();
  const [{ data: likeData, fetching: fetchingLikes }, ref] = useGetLikesQuery();
  const [userFeed, setUserFeed] = useState<Array<UserTweetsI>>([]);
  const { unclick, isClicked } = useHighContext<any>(contextNames.likeClick);

  useEffect(() => {
    ref({ requestPolicy: "network-only" });
    unclick();
  }, [isClicked]);

  console.log(userFeed);

  useEffect(() => {
    if (likeData && tweets) {
      if (
        likeData.getLikes.likes.length > -1 &&
        tweets.getTweetsByUser.tweets.length > -1
      ) {
        console.log("fine");
        let finalUserFeed: Array<UserTweetsI> = [];
        for (let i = 0; i < tweets.getTweetsByUser.tweets.length; i++) {
          const {
            tweet_id,
            tweet_content,
            name,
            username,
          } = tweets.getTweetsByUser.tweets[i];
          let isLiked = false;
          for (let j = 0; j < likeData.getLikes.likes.length; j++) {
            if (likeData.getLikes.likes[j].tweet_id === tweet_id) {
              isLiked = true;
            }
          }
          finalUserFeed.push({
            tweet_id,
            tweet_content,
            name,
            username,
            liked: isLiked,
          });
        }
        setUserFeed(() => finalUserFeed);
      }
    }
  }, [fetchingLikes, fetchingTweets]);

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
          {userFeed.length > 0 ? (
            userFeed.map((tweet) => (
              <Tweet
                key={tweet.tweet_id}
                tweet_content={tweet.tweet_content}
                username={tweet.username}
                name={tweet.name}
                tweet_id={tweet.tweet_id}
                liked={tweet.liked}
              />
            ))
          ) : (
            <StyledDiv>Loading...</StyledDiv>
          )}
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};
export default Home;
