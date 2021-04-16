import { TweetProps } from "../components/tweet/Tweet";
import { TweetType } from "../constants/interfaces";

export const getTweetProps = (tweet: TweetType) => {
  const {
    comments,
    img,
    name,
    profile_img,
    tweet_content,
    username,
    tweet_id,
  } = tweet;

  const tweetProps: TweetProps = {
    captain: img,
    comments,
    img: profile_img,
    name,
    tweet_content,
    username,
    tweet_id,
  };

  return tweetProps;
};
