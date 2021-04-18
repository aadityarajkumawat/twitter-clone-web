import React from "react";
import { setFeedProgress, setFile, setTweetInput } from "../../actions";
import { AttachImage } from "../../assets/AttachImage";
import { FileEvent, HomeAction } from "../../constants/interfaces";
import { useCreateTweetMutation } from "../../generated/graphql";
import { handleFileAndUpload } from "../../helpers/handleFileAndUpload";
import * as S from "../../pages/home.styles";

interface ComposeTweetProps {
  tweetInput: string;
  files: FileEvent;
  dispatch: React.Dispatch<HomeAction>;
}

export const ComposeTweet: React.FC<ComposeTweetProps> = ({
  tweetInput,
  files,
  dispatch,
}) => {
  const [, postTweet] = useCreateTweetMutation();
  return (
    <S.MTweet>
      <S.TweetInput>
        <S.TweetInputField
          placeholder="What's Happening?"
          onChange={(e) => setTweetInput(e.target.value, dispatch)}
          value={tweetInput}
        />
      </S.TweetInput>
      <S.EditTweetOptions>
        <S.TweetAc>
          <S.UploadI>
            <AttachImage />
            <input type="file" onChange={(e) => setFile(e, dispatch)} />
          </S.UploadI>
        </S.TweetAc>
        <S.TweetButton
          onClick={async () => {
            handleFileAndUpload(
              setFeedProgress,
              files,
              tweetInput,
              postTweet,
              setTweetInput,
              dispatch
            );
          }}
        >
          Tweet
        </S.TweetButton>
      </S.EditTweetOptions>
    </S.MTweet>
  );
};
