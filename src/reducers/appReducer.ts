import { AppContextAction, AppContextState } from "../constants/interfaces";

export const appReducer = (
  state: AppContextState,
  action: AppContextAction
): AppContextState => {
  switch (action.type) {
    case "user-profile":
      return { ...state, loggedUserProfile: action.profile };
    default:
      return state;
  }
};
