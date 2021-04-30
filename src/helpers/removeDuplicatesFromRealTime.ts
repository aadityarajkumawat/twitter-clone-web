import { TweetType } from "../constants/interfaces";
import { GetTweetsByUserFQuery } from "../generated/graphql";

export const removeDuplicatesFromRealTime = (
  realTime: TweetType[],
  profileObj: GetTweetsByUserFQuery
) => {
  const betterRealTime: TweetType[] = [];
  const tweets = profileObj.getTweetsByUserF.tweets;

  if (tweets.length === 0) {
    for (let i = 0; i < realTime.length; i++) {
      betterRealTime.push(realTime[i])
    }
    return betterRealTime;
  }

  for (let i = 0; i < tweets.length; i++) {
    if (realTime[i] && realTime[i].tweet_id !== tweets[i].tweet_id) {
      betterRealTime.push(realTime[i]);
    }
  }

  return betterRealTime;
};
