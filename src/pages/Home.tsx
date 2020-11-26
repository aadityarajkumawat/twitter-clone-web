import React from "react";
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
} from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <BaseComponent>
      <HomeMain>
        <FeedHeader>
          <PageName>Home</PageName>
          <CreateTweet>
            <ProfileImageInc>
              <IncImage src="https://pbs.twimg.com/profile_images/1329408550347579393/A3OheCtd_bigger.jpg" />
            </ProfileImageInc>
            <MTweet>
              <TweetInput>
                <TweetInputField placeholder="What's Happening?" />
              </TweetInput>
              <EditTweetOptions>
                <TweetAc></TweetAc>
                <TweetButton>Tweet</TweetButton>
              </EditTweetOptions>
            </MTweet>
          </CreateTweet>
        </FeedHeader>
      </HomeMain>
    </BaseComponent>
  );
};
export default Home;
