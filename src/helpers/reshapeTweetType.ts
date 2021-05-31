import { TweetProps } from "../components/tweet/Tweet";
import { TweetType } from "../constants/interfaces";

export const getTweetProps = (tweet: TweetType) => {
    const tweetProps: TweetProps = {
        ...tweet,
    };

    return tweetProps;
};
