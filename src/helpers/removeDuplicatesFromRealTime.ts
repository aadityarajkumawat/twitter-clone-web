import { TweetType } from "../constants/interfaces";
import { GetTweetsByUserFQuery } from "../generated/graphql";

export const removeDuplicatesFromRealTime = (
    realTime: TweetType[],
    profileObj: GetTweetsByUserFQuery
): TweetType[] => {
    const betterRealTime: TweetType[] = [];
    const tweets = profileObj.getTweetsByUserF.tweets;

    if (tweets.length === 0) {
        for (let i = 0; i < realTime.length; i++) {
            betterRealTime.push(realTime[i]);
        }

        return betterRealTime;
    }

    for (let i = 0; i < realTime.length; i++) {
        const currentRealTimeTweet = realTime[i];
        let isFound = false;

        for (let j = 0; j < tweets.length; j++) {
            if (tweets[j].tweet_id === currentRealTimeTweet.tweet_id) {
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            betterRealTime.push(currentRealTimeTweet);
        }
    }

    return betterRealTime;
};
