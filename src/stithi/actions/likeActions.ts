import { dispatcherOnSteroids } from "stithi";
import { CLICK, UNCLICK } from "../actionTypes";
import { LikeActionTypes } from "../reducers/likeClickReducer";

export const getLikeAction = (dispatch: React.Dispatch<LikeActionTypes>) => {
  const click = () => {
    dispatcherOnSteroids(dispatch, { type: CLICK });
  };

  const unclick = () => {
    dispatcherOnSteroids(dispatch, { type: UNCLICK });
  };

  return { click, unclick };
};
