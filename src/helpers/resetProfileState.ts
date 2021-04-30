import React from "react";
import { ProfileAction } from "../constants/interfaces";

export const resetProfileState = (
  dispatch: React.Dispatch<ProfileAction>
): void => {
  dispatch({ type: "more", moreTweets: [] });
  dispatch({ type: "offset", updatedOffset: 0 });
  dispatch({
    type: "scroll",
    updatedScroll: { dataLength: 0, hasMore: true },
  });
};
