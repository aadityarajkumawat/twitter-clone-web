import { EditProfileContext, HandleFileF } from "../constants/interfaces";
import Axios from "axios";
import { ImageURI } from "../constants/urls";

async function uploadImage(
  type: "profile" | "cover",
  saveImg: (o: { url: string; type: "profile" | "cover" }) => Promise<any>,
  context: EditProfileContext
) {
  const [state, dispatch] = context;
  const images = state.images;
  let canUpload = false;
  let count = 0;

  if (images.cover_img && images.profile_img) count = 2;
  else if (images.cover_img || images.profile_img) count = 1;

  const imagePart = count === 2 ? 45 : 90;

  const formData = new FormData();
  if (state.images.cover_img && type === "cover") {
    canUpload = true;
    formData.append("image", state.images.cover_img[0]);
  } else if (state.images.profile_img && type === "profile") {
    canUpload = true;
    formData.append("image", state.images.profile_img[0]);
  } else {
    return;
  }

  if (canUpload) {
    try {
      const r = await Axios.post(ImageURI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (p) => {
          if (count === 2 && type === "profile") {
            dispatch({
              type: "saving",
              updatedProgress: imagePart + (p.loaded * imagePart) / p.loaded,
            });
          } else {
            dispatch({
              type: "saving",
              updatedProgress: (p.loaded * imagePart) / p.loaded,
            });
          }
        },
      });

      await saveImg({
        url: r.data.data.display_url,
        type,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const uploadImagesAndSave: HandleFileF = async (
  context,
  saveImg,
  save
) => {
  const [state, dispatch] = context;

  await uploadImage("cover", saveImg, context);
  await uploadImage("profile", saveImg, context);

  await save({ ...state.form });
  dispatch({ type: "saving", updatedProgress: state.savingProgress + 10 });
};
