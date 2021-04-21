import { EditProfileAction, EditProfileI } from "../constants/interfaces";

export const setForm = (
  dispatch: React.Dispatch<EditProfileAction>,
  val: EditProfileI
) => {
  dispatch({ type: "form", updatedForm: val });
};
