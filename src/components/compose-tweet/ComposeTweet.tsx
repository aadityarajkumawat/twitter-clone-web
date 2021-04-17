import React from "react";
import { AttachImage } from "../../assets/AttachImage";
import { FileEvent } from "../../constants/interfaces";
import { useCreateTweetMutation } from "../../generated/graphql";
import { handleFileAndUpload } from "../../helpers/handleFileAndUpload";
import * as S from "../../pages/home.styles";

interface ComposeTweetProps {
  setTweetInput: (value: React.SetStateAction<string>) => void;
  tweetInput: string;
  getFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFeedProgress: (value: React.SetStateAction<number>) => void;
  files: FileEvent;
}

export const ComposeTweet: React.FC<ComposeTweetProps> = ({
  getFile,
  setTweetInput,
  setFeedProgress,
  tweetInput,
  files,
}) => {
  const [, postTweet] = useCreateTweetMutation();
  return (
    <S.MTweet>
      <S.TweetInput>
        <S.TweetInputField
          placeholder="What's Happening?"
          onChange={(e) => setTweetInput(e.target.value)}
          value={tweetInput}
        />
      </S.TweetInput>
      <S.EditTweetOptions>
        <S.TweetAc>
          <S.UploadI>
            <AttachImage />
            <input type="file" onChange={(e) => getFile(e)} />
          </S.UploadI>
        </S.TweetAc>
        <S.TweetButton
          onClick={async () => {
            handleFileAndUpload(
              setFeedProgress,
              files,
              tweetInput,
              postTweet,
              setTweetInput
            );
          }}
        >
          Tweet
        </S.TweetButton>
      </S.EditTweetOptions>
    </S.MTweet>
  );
};
