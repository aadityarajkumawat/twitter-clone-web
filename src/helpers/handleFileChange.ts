import { EditProfileContext } from "../constants/interfaces";

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  context: EditProfileContext
) => {
  const [state, dispatch] = context;
  const name = e.target.name;

  dispatch({
    type: "image",
    updatedImages: {
      ...state.images,
      [name]: e.target.files,
    },
  });
};
