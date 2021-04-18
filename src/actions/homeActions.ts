import React from "react";
import {
  FileEvent,
  HomeAction,
  HomeState,
  TweetType,
} from "../constants/interfaces";

export const setFeedProgress = (
  prog: number,
  dispatch: React.Dispatch<HomeAction>
) => {
  dispatch({ type: "prog", updatedProg: prog });
};

export const setFile = (e: FileEvent, dispatch: React.Dispatch<HomeAction>) => {
  dispatch({ type: "file", updatedFile: e });
};

export const setTweetInput = (
  input: string,
  dispatch: React.Dispatch<HomeAction>
) => {
  dispatch({ type: "tweet", updatedInp: input });
};

export const pushTweetToFeed = (
  tweet: TweetType | null | undefined,
  context: [HomeState, React.Dispatch<HomeAction>]
) => {
  const [state, dispatch] = context;
  if (tweet) {
    dispatch({ type: "rl", updatedRL: [tweet, ...state.realTime] });
  }
};

export const subscribeToRealtime = (dispatch: React.Dispatch<HomeAction>) => {
  dispatch({ type: "sub", connection: true });
};

export const unsubscribeToRealtime = (dispatch: React.Dispatch<HomeAction>) => {
  dispatch({ type: "sub", connection: false });
};
