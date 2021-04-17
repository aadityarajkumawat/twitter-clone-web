import React from "react";
import { FileEvent } from "../constants/interfaces";
import { uploadTweetImage } from "./uploadTweetImage";

interface PostTweetInput {
  tweet_content: string;
  img: string;
}

export const handleFileAndUpload = async (
  fn: (value: React.SetStateAction<number>) => void,
  e: FileEvent,
  tweetInput: string,
  postTweet: (vars: PostTweetInput) => Promise<any>,
  setTweetInput: (value: React.SetStateAction<string>) => void
): Promise<void> => {
  let imgUrl = "";
  if (e && e.target.files) {
    const res = await uploadTweetImage(fn, e.target.files[0]);
    if (res.img) imgUrl = res.img;
  }
  await postTweet({ tweet_content: tweetInput, img: imgUrl });
  setTweetInput("");
};
