import { UploadTweetImage } from "../constants/interfaces";
import Axios from "axios";
import { ImageURI } from "../constants/urls";

export const uploadTweetImage = async (
  fn: (value: React.SetStateAction<number>) => void,
  file: File
): Promise<UploadTweetImage> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await Axios.post(ImageURI, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (p) => {
      fn((p.loaded * 100) / p.total);
    },
  });

  if (!res) return { error: "Image not uploaded", img: "" };

  return { error: null, img: res.data.data.display_url };
};
