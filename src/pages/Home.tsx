import React, { useEffect, useState } from "react";
import { myImage } from "../constants/urls";
import {
  BaseComponent,
  CreateTweet,
  EditTweetOptions,
  FeedHeader,
  HomeMain,
  IncImage,
  MTweet,
  PageName,
  ProfileImageInc,
  TweetAc,
  TweetButton,
  TweetInput,
  TweetInputField,
  Tweets,
} from "./home.styles";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
} from "../generated/graphql";
import Tweet from "../components/tweet/Tweet";

interface HomeProps {}

interface UploadedTweetI {
  uploaded: string;
  error: string | null | undefined;
}

const Home: React.FC<HomeProps> = () => {
  const [, createTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [
    { data: tweets, fetching: fetchingTweets },
  ] = useGetTweetsByUserQuery();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetInput((prev) => e.target.value);
  };

  const makeTweet = () => {
    createTweet({ tweet_content: tweetInput });
  };

  return (
    <BaseComponent>
      <HomeMain>
        <FeedHeader>
          <PageName>Home</PageName>
          <CreateTweet>
            <ProfileImageInc>
              <IncImage src={myImage} />
            </ProfileImageInc>
            <MTweet>
              <TweetInput>
                <TweetInputField
                  placeholder="What's Happening?"
                  onChange={handleChange}
                />
              </TweetInput>
              <EditTweetOptions>
                <TweetAc></TweetAc>
                <TweetButton onClick={makeTweet}>Tweet</TweetButton>
              </EditTweetOptions>
            </MTweet>
          </CreateTweet>
        </FeedHeader>

        <Tweets>
          {tweets?.getTweetsByUser &&
            tweets.getTweetsByUser.tweets.map((tweet) => (
              <Tweet
                key={tweet.tweet_id}
                tweet_content={tweet.tweet_content}
                username={"Aditya"}
              />
            ))}
        </Tweets>
      </HomeMain>
    </BaseComponent>
  );
};
export default Home;
