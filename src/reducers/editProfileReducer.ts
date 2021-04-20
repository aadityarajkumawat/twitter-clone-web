import { EditProfileAction, EditProfileState } from "../constants/interfaces";

export const editProfileReducer = (
  state: EditProfileState,
  action: EditProfileAction
): EditProfileState => {
  switch (action.type) {
    case "form":
      return { ...state, form: action.updatedForm };
    case "cover":
      return { ...state, coverProgress: action.updatedCover };
    case "profile":
      return { ...state, profileProgress: action.updatedProgress };
    default:
      return state;
  }
};
