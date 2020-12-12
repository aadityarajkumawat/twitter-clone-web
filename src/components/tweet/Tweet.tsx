import React, { useEffect } from "react";
import { useHighContext } from "stithi";
import * as SVG from "../../assets/tweetActionsSVGs";
import { myImage } from "../../constants/urls";
import { useLikeTweetMutation } from "../../generated/graphql";
import { contextNames } from "../../stithi/callContext";
import LikeSVG from "../svgs/LikeSVG";
import {
  FadedUsername,
  TweetActionBar,
  TweetContainer,
  TweetContent,
  TweetUsername,
  TweetWrapper,
  UserProfileImg,
} from "./tweet.styles";

interface TweetProps {
  username: string;
  tweet_content: string;
  tweet_id: number;
  name: string;
  liked: boolean;
}

interface LikeContext {
  isClicked: boolean;
  click: () => void;
  unclick: () => void;
}

const Tweet: React.FC<TweetProps> = ({
  username,
  tweet_content,
  tweet_id,
  name,
  liked,
}) => {
  const [, likeTweet] = useLikeTweetMutation();
  const like = useHighContext<LikeContext>(contextNames.likeClick);
  const { click } = like;
  return (
    <TweetWrapper>
      <UserProfileImg>
        <img src={myImage} alt="user" />
      </UserProfileImg>
      <TweetContainer>
        <TweetUsername>
          <span>{name}</span>
          <FadedUsername>@{username}</FadedUsername>
        </TweetUsername>
        <TweetContent>{tweet_content}</TweetContent>
        <TweetActionBar>
          <span>{SVG.commentSVG}</span>
          <span>{SVG.retweetSVG}</span>
          <span
            onClick={() => {
              likeTweet({ tweet_id });
              click();
            }}
          >
            <LikeSVG liked={liked} />
          </span>
          <span>{SVG.shareSVG}</span>
        </TweetActionBar>
      </TweetContainer>
    </TweetWrapper>
  );
};
export default Tweet;
