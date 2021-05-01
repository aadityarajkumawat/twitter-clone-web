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

    // console.log("1", { betterRealTime });
    return betterRealTime;
  }

  // console.log(tweets);
  for (let i = 0; i < realTime.length; i++) {
    if (tweets[i] && tweets[i].tweet_id !== realTime[i].tweet_id) {
      betterRealTime.push(realTime[i]);
    }
  }

  console.log("2", { betterRealTime });
  return betterRealTime;
};
