import React from "react";
import { FileEvent, HomeAction } from "../constants/interfaces";
import { uploadTweetImage } from "./uploadTweetImage";

interface PostTweetInput {
  tweet_content: string;
  img: string;
}

export const handleFileAndUpload = async (
  fn: (prog: number, dispatch: React.Dispatch<HomeAction>) => void,
  e: FileEvent,
  tweetInput: string,
  postTweet: (vars: PostTweetInput) => Promise<any>,
  setTweetInput: (value: string, dispatch: React.Dispatch<HomeAction>) => void,
  dispatch: React.Dispatch<HomeAction>
): Promise<void> => {
  let imgUrl = "";
  if (e && e.target.files) {
    const res = await uploadTweetImage(fn, e.target.files[0], dispatch);
    if (res.img) imgUrl = res.img;
  }
  await postTweet({ tweet_content: tweetInput, img: imgUrl });
  setTweetInput("", dispatch);
};
