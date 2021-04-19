import { ProfileAction, ProfileState } from "../constants/interfaces";

export const profileReducer = (
  state: ProfileState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case "more":
      return { ...state, more: action.moreTweets };
    case "offset":
      return { ...state, offset: action.updatedOffset };
    case "scroll":
      return { ...state, scrollProps: action.updatedScroll };
    default:
      return state;
  }
};
