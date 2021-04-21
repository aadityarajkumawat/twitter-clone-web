import { setForm } from "../actions/editProfileActions";
import { EditProfileContext } from "../constants/interfaces";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  context: EditProfileContext
) => {
  const { name, value } = e.target;
  const [state, dispatch] = context;

  setForm(dispatch, { ...state.form, [name]: value });
};
