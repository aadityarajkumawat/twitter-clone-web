import React, { useContext } from "react";
import { AttachImage } from "../../assets/AttachImage";
import { FileEvent, HomeContextType } from "../../constants/interfaces";
import { HomeContextI } from "../../context/HomeContext";
import { useCreateTweetMutation } from "../../generated/graphql";
import { handleFileAndUpload } from "../../helpers/handleFileAndUpload";
import * as S from "../../pages/home.styles";

interface ComposeTweetProps {
    tweetInput: string;
    files: FileEvent;
}

export const ComposeTweet: React.FC<ComposeTweetProps> = ({
    tweetInput,
    files,
}) => {
    const [, postTweet] = useCreateTweetMutation();
    const {
        HomeActionFn: { setTweetInput, setFile },
        dispatch,
    } = useContext<HomeContextType>(HomeContextI);
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
                        <input type="file" onChange={(e) => setFile(e)} />
                    </S.UploadI>
                </S.TweetAc>
                <S.TweetButton
                    onClick={async () => {
                        handleFileAndUpload(
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
