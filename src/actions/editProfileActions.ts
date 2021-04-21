import { EditProfileAction, EditProfileI } from "../constants/interfaces";

// export const setProfileProgress = (
//   dispatch: React.Dispatch<EditProfileAction>,
//   val: number
// ) => {
//   dispatch({ type: "profile", updatedProgress: val });
// };

// export const setCoverProgress = (
//   dispatch: React.Dispatch<EditProfileAction>,
//   val: number
// ) => {
//   dispatch({ type: "cover", updatedCover: val });
// };

export const setForm = (
  dispatch: React.Dispatch<EditProfileAction>,
  val: EditProfileI
) => {
  dispatch({ type: "form", updatedForm: val });
};
