import create from "zustand";

type StateI = {
  showSearchResults: boolean;
  toggleShowSearchResults: (bool: boolean) => void;

  authenticated: boolean;
  setAuthenticated: (bool: boolean) => void;

  refreshFeed: string;
  setFeedRefresh: (refreshFeed: string) => void;

  focusedTweet: number;
  setFocussedTweet: (id: number) => void;
};

export const useStore = create<StateI>((set) => ({
  showSearchResults: false,
  toggleShowSearchResults: (bool) => set(() => ({ showSearchResults: bool })),

  authenticated: false,
  setAuthenticated: (bool) => set(() => ({ authenticated: bool })),

  refreshFeed: "",
  setFeedRefresh: (refreshFeed) => set(() => ({ refreshFeed })),

  focusedTweet: -1,
  setFocussedTweet: (id) => set(() => ({ focusedTweet: id })),
}));
