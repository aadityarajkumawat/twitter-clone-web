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
import { useCreateTweetMutation } from "../generated/graphql";

interface HomeProps {}

interface UploadedTweetI {
  uploaded: string;
  error: string | null | undefined;
}

const Home: React.FC<HomeProps> = () => {
  const [{ data, fetching }, createTweet] = useCreateTweetMutation();
  const [uploadStatus, setUploadStatus] = useState<UploadedTweetI>({
    error: "",
    uploaded: "",
  });

  const makeTweet = () => {
    createTweet({ tweet_content: "This is from react being nuts" });
  };

  useEffect(() => {
    if (data?.createPost.uploaded?.includes("uploaded")) {
      setUploadStatus({
        uploaded: data.createPost.uploaded,
        error: data.createPost.error,
      });
    }
  }, [fetching]);

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
      <Tweets>
        Upload Status: {uploadStatus.uploaded}
        <button onClick={makeTweet}>Tweet</button>
      </Tweets>
    </BaseComponent>
  );
};
export default Home;
