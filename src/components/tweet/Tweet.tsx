import React, { useEffect, useState } from "react";
import * as SVG from "../../assets/tweetActionsSVGs";
import { me } from "../../constants/urls";
import {
  useGetTweetByIdQuery,
  useMeQuery,
  useGetProfileImageQuery,
} from "../../generated/graphql";
import LikeSVG from "../svgs/LikeSVG";
import {
  CommentSpan,
  FadedUsername,
  LikeSpan,
  TweetActionBar,
  TweetContainer,
  TweetContent,
  TweetImageContainer,
  TweetUsername,
  TweetWrapper,
  UserProfileImg,
} from "./tweet.styles";

export interface TweetProps {
  username: string;
  tweet_content: string;
  name: string;
  comments: number;
  tweet_id: number;
  img: string;
  captain: string;
}

const Tweet: React.FC<TweetProps> = ({
  username,
  tweet_content,
  name,
  comments,
  tweet_id,
  img,
  captain,
}) => {
  const [{ data, fetching }, reloadQuery] = useGetTweetByIdQuery({
    variables: { tweet_id },
  });

  const [refresh, setRefresh] = useState<string>("");

  let liked = false;
  if (!fetching && data) {
    liked = data.getTweetById.tweet.liked;
  }

  useEffect(() => {
    reloadQuery({ requestPolicy: "network-only" });
    //eslint-disable-next-line
  }, [refresh]);

  return (
    <TweetWrapper>
      <UserProfileImg>
        <img src={img} alt="user" />
      </UserProfileImg>
      <TweetContainer>
        <TweetUsername>
          <span>{name}</span>
          <FadedUsername>@{username}</FadedUsername>
        </TweetUsername>
        <TweetContent>{tweet_content}</TweetContent>
        <TweetImageContainer>
          {captain !== "" && <img src={captain} alt="" />}
        </TweetImageContainer>
        <TweetActionBar>
          <CommentSpan>
            {SVG.commentSVG}
            <div style={{ color: "rgb(136, 153, 166)" }}>{comments}</div>
          </CommentSpan>
          <span>{SVG.retweetSVG}</span>
          <LikeSpan>
            <LikeSVG liked={liked} tweet_id={tweet_id} setR={setRefresh} />
            <div
              style={{
                color: liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)",
              }}
            >
              {data ? data!.getTweetById.tweet?.likes : 0}
            </div>
          </LikeSpan>
          <span>{SVG.shareSVG}</span>
        </TweetActionBar>
      </TweetContainer>
    </TweetWrapper>
  );
};
export default Tweet;
