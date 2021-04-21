import { EditProfileAction, EditProfileState } from "../constants/interfaces";

export const editProfileReducer = (
  state: EditProfileState,
  action: EditProfileAction
): EditProfileState => {
  switch (action.type) {
    case "form":
      return { ...state, form: action.updatedForm };
    case "saving":
      return { ...state, savingProgress: action.updatedProgress };
    case "image":
      return { ...state, images: action.updatedImages };
    default:
      return state
  }
};
