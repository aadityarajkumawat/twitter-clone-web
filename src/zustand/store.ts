import create from "zustand";
import { TweetDataForComment } from "../constants/interfaces";

type StateI = {
    showSearchResults: boolean;
    toggleShowSearchResults: (bool: boolean) => void;

    authenticated: boolean;
    setAuthenticated: (bool: boolean) => void;

    refreshFeed: string;
    setFeedRefresh: (refreshFeed: string) => void;

    focusedTweet: TweetDataForComment;
    setFocussedTweet: (id: TweetDataForComment) => void;

    refreshComments: string;
    setRefreshComments: (refreshComments: string) => void;

    refreshTweet: string;
    setRefreshTweet: (refreshTweet: string) => void;
};

export const useStore = create<StateI>((set) => ({
    showSearchResults: false,
    toggleShowSearchResults: (bool) => set(() => ({ showSearchResults: bool })),

    authenticated: false,
    setAuthenticated: (bool) => set(() => ({ authenticated: bool })),

    refreshFeed: "",
    setFeedRefresh: (refreshFeed) => set(() => ({ refreshFeed })),

    focusedTweet: {
        _type: "",
        img: "",
        name: "",
        profile_img: "",
        tweet_content: "",
        tweet_id: -1,
        username: "",
    },
    setFocussedTweet: (tweet) => set(() => ({ focusedTweet: tweet })),

    refreshComments: "",
    setRefreshComments: (refreshComments) => set(() => ({ refreshComments })),

    refreshTweet: "",
    setRefreshTweet: (refreshTweet) => set(() => ({ refreshTweet })),
}));
