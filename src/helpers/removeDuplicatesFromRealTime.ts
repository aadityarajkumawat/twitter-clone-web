import { TweetType } from "../constants/interfaces";
import { GetTweetsByUserFQuery } from "../generated/graphql";

export const removeDuplicatesFromRealTime = (
  realTime: TweetType[],
  profileObj: GetTweetsByUserFQuery
) => {
  const betterRealTime: TweetType[] = [];
  const tweets = profileObj.getTweetsByUserF.tweets;
  for (let i = 0; i < tweets.length; i++) {
    if (realTime[i] && realTime[i].tweet_id !== tweets[i].tweet_id) {
      betterRealTime.push(realTime[i]);
    }
  }

  return betterRealTime;
};
