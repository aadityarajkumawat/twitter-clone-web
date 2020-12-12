import { initializeContext, createContextProvider } from "stithi";
import { getLikeAction } from "./actions/likeActions";
import { LikeActionTypes, likeClickReducer } from "./reducers/likeClickReducer";
import { LikeClick } from "./stateTypes";

export const contextNames = {
  likeClick: "likeClick",
};

export const callContext = () => {
  initializeContext<LikeClick>(contextNames.likeClick, { isClicked: false });
  createContextProvider<LikeClick, LikeActionTypes>(
    contextNames.likeClick,
    likeClickReducer,
    getLikeAction
  );
};
