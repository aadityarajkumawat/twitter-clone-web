import React from "react";
import { PAGINATE_USER_PROFILE } from "../constants/consts";
import { ProfileAction } from "../constants/interfaces";

export const resetProfileState = (
  dispatch: React.Dispatch<ProfileAction>
): void => {
  dispatch({ type: "more", moreTweets: [] });
  dispatch({ type: "offset", updatedOffset: 0 });
  dispatch({
    type: "scroll",
    updatedScroll: { dataLength: PAGINATE_USER_PROFILE, hasMore: true },
  });
};
