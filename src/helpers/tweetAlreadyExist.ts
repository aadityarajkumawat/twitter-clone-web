import { HomeState } from "../constants/interfaces";
import {
  GetTweetsByUserQuery,
  ListenTweetsSubscription,
} from "../generated/graphql";

export const tweetAlreadyExist = (
  state: HomeState,
  feed: GetTweetsByUserQuery,
  rtPosts: ListenTweetsSubscription
): boolean => {
  const arr1 = state.more;
  const arr2 = feed.getTweetsByUser.tweets;
  const arr3 = state.realTime;
  const id = rtPosts.listenTweets.tweet.tweet_id;

  let found = false;
  for (let i = 0; i < arr1.length; i++) {
    const arr = arr1;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    const arr = arr2;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  for (let i = 0; i < arr3.length; i++) {
    const arr = arr3;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  return found;
};
