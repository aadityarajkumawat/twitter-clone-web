import { HomeAction, UploadTweetImage } from "../constants/interfaces";
import Axios from "axios";
import { ImageURI } from "../constants/urls";
import React from "react";

export const uploadTweetImage = async (
  file: File,
  dispatch: React.Dispatch<HomeAction>
): Promise<UploadTweetImage> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await Axios.post(ImageURI, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (p) => {
      dispatch({ type: "prog", updatedProg: (p.loaded * 100) / p.total });
    },
  });

  if (!res) return { error: "Image not uploaded", img: "" };

  return { error: null, img: res.data.data.display_url };
};
