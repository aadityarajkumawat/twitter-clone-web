import { HomeAction, HomeState } from "../constants/interfaces";

export const reducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case "more":
      return { ...state, more: action.moreTweets };
    case "pag":
      return { ...state, pag: action.updatedPag };
    case "scroll":
      return { ...state, scrollProps: action.updatedScroll };
    case "rl":
      return { ...state, realTime: action.updatedRL };
    case "prog":
      return { ...state, feedProgress: action.updatedProg };
    case "file":
      return { ...state, files: action.updatedFile };
    case "tweet":
      return { ...state, tweetInput: action.updatedInp };
    default:
      return state;
  }
};
