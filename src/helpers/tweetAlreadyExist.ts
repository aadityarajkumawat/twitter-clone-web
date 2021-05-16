import { HomeState, ProfileState, TweetType } from "../constants/interfaces";
import { ListenTweetsSubscription } from "../generated/graphql";

export const tweetAlreadyExist = (
    state: HomeState | ProfileState,
    feed: TweetType[],
    rtPosts: ListenTweetsSubscription
): boolean => {
    const arr1 = state.more;
    const arr3 = state.realTime;
    if (!rtPosts.listenTweets.tweet) return false;
    const id = rtPosts.listenTweets.tweet.tweet_id;

    let found = false;
    for (let i = 0; i < arr1.length; i++) {
        const arr = arr1;
        if (arr[i].tweet_id === id) {
            found = true;
        }
    }
    for (let i = 0; i < feed.length; i++) {
        const arr = feed;
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
