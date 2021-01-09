import React, { Fragment, useEffect, useState } from "react";
import { useSubscription } from "urql";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  GetTweetsByUserQuery,
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
} from "../generated/graphql";
import * as S from "./home.styles";

interface HomeProps {}

interface Tweet {
  comments: number;
  // created_At: string;
  // liked: boolean;
  // likes: number;
  // name: string;
  // rel_acc: number;
  // tweet_content: string;
  // tweet_id: number;
  // username: string;
  // _type: string;
}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [user, setUser] = useState<Array<Tweet>>([]);
  const [
    { data: tweets, fetching: fetchingTweets },
  ] = useGetTweetsByUserQuery();

  const [{ data }] = useListenTweetsSubscription();

  const addName = () => {
    setUser([{ comments: 9 }]);
  };

  if (!fetchingTweets) {
    addName();
    // console.log()
  }

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
                {/* <button onClick={addName}>cool</button> */}
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
