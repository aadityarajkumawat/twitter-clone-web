import React from "react";
import * as SVG from "../../assets/tweetActionsSVGs";
import { me } from "../../constants/urls";
import { useLikeTweetMutation } from "../../generated/graphql";
import LikeSVG from "../svgs/LikeSVG";
import {
  CommentSpan,
  FadedUsername,
  LikeSpan,
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
  name: string;
  liked: boolean;
  likes: number;
  comments: number;
  tweet_id: number;
}

interface LikeContext {
  isClicked: boolean;
  click: () => void;
  unclick: () => void;
}

const Tweet: React.FC<TweetProps> = ({
  username,
  tweet_content,
  name,
  liked,
  likes,
  comments,
  tweet_id,
}) => {
  return (
    <TweetWrapper>
      <UserProfileImg>
        <img src={me} alt="user" />
      </UserProfileImg>
      <TweetContainer>
        <TweetUsername>
          <span>{name}</span>
          <FadedUsername>@{username}</FadedUsername>
        </TweetUsername>
        <TweetContent>{tweet_content}</TweetContent>
        <TweetActionBar>
          <CommentSpan>
            {SVG.commentSVG}
            <div>{comments}</div>
          </CommentSpan>
          <span>{SVG.retweetSVG}</span>
          <LikeSpan>
            <LikeSVG liked={liked} tweet_id={tweet_id} />
            <div>{likes}</div>
          </LikeSpan>
          <span>{SVG.shareSVG}</span>
        </TweetActionBar>
      </TweetContainer>
    </TweetWrapper>
  );
};
export default Tweet;
