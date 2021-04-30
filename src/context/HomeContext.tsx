import React, { createContext, useReducer } from "react";
import {
  FileEvent,
  HomeContextType,
  HomeState,
  TweetType,
} from "../constants/interfaces";
import { reducer } from "../reducers/homeReducer";

interface HomeContextProps {}

const intialStateHome = {
  more: [],
  pag: { offset: 0 },
  realTime: [],
  feedProgress: 0,
  files: null,
  scrollProps: { dataLength: 0, hasMore: true },
  tweetInput: "",
  subscribed: true,
};

const fns = {
  pushTweetToFeed: () => null,
  setFeedProgress: () => null,
  setFile: () => null,
  setTweetInput: () => null,
};

export const HomeContextI = createContext<HomeContextType>({
  state: intialStateHome,
  HomeActionFn: fns,
  dispatch: () => null,
});

export const HomeContext: React.FC<HomeContextProps> = ({ children }) => {
  const initialState: HomeState = intialStateHome;

  const context = useReducer(reducer, initialState);
  const [state, dispatch] = context;

  const setFeedProgress = (prog: number) => {
    dispatch({ type: "prog", updatedProg: prog });
  };

  const setFile = (e: FileEvent) => {
    dispatch({ type: "file", updatedFile: e });
  };

  const setTweetInput = (input: string) => {
    dispatch({ type: "tweet", updatedInp: input });
  };

  const pushTweetToFeed = (tweet: TweetType | null | undefined) => {
    if (tweet) {
      dispatch({ type: "rl", updatedRL: [tweet, ...state.realTime] });
    }
  };

  const homeActions = {
    pushTweetToFeed,
    setFeedProgress,
    setFile,
    setTweetInput,
  };

  return (
    <HomeContextI.Provider
      value={{
        state,
        HomeActionFn: homeActions,
        dispatch,
      }}
    >
      {children}
    </HomeContextI.Provider>
  );
};
