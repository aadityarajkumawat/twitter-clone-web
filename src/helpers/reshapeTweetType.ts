import { TweetProps } from "../components/tweet/Tweet";
import { TweetType } from "../constants/interfaces";

export const getTweetProps = (tweet: TweetType) => {
    const { img, name, profile_img, tweet_content, username, tweet_id } = tweet;

    const tweetProps: TweetProps = {
        captain: img,
        img: profile_img,
        name,
        tweet_content,
        username,
        tweet_id,
    };

    return tweetProps;
};
