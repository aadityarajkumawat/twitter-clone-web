import { CLICK, UNCLICK } from "../actionTypes";
import { ReducerFn } from "stithi";
import { LikeClick } from "../stateTypes";

export type LikeActionTypes = { type: typeof CLICK } | { type: typeof UNCLICK };

export const likeClickReducer: ReducerFn<LikeClick, LikeActionTypes> = (
  state,
  action
): LikeClick => {
  switch (action.type) {
    case CLICK:
      return { ...state, isClicked: true };
    case UNCLICK:
      return { ...state, isClicked: false };
    default:
      return state;
  }
};
