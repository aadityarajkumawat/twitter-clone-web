import { EditProfileAction } from "../constants/interfaces";
import Axios from "axios";
import { ImageURI } from "../constants/urls";

export const handleFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  fn: (dispatch: React.Dispatch<EditProfileAction>, value: number) => void,
  type: string,
  dispatch: React.Dispatch<EditProfileAction>,
  saveImg: (obj: any) => Promise<any>
) => {
  const formData = new FormData();
  if (e.target.files) formData.append("image", e.target.files[0]);
  try {
    const r = await Axios.post(ImageURI, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (p) => {
        fn(dispatch, (p.loaded * 100) / p.total);
      },
    });
    await saveImg({
      url: r.data.data.display_url,
      type,
    });
  } catch (e) {
    console.log(e.message);
  }
};
