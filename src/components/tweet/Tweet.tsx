import React from "react";
import * as SVG from "../../assets/tweetActionsSVGs";
import { myImage } from "../../constants/urls";
import { useLikeTweetMutation } from "../../generated/graphql";
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
}

const Tweet: React.FC<TweetProps> = ({ username, tweet_content, tweet_id }) => {
  const [d, d1] = useLikeTweetMutation();
  const likeTweet = () => {
    d1({ tweet_id });
  };

  // console.log(d);

  return (
    <TweetWrapper>
      <UserProfileImg>
        <img src={myImage} alt="" />
      </UserProfileImg>
      <TweetContainer>
        <TweetUsername>
          <span>{username}</span>
          <FadedUsername>@Aditya87587</FadedUsername>
        </TweetUsername>
        <TweetContent>{tweet_content}</TweetContent>
        <TweetActionBar>
          <span onClick={likeTweet}>{SVG.commentSVG}</span>
          <span>{SVG.retweetSVG}</span>
          <span>{SVG.likeSVG}</span>
          <span>{SVG.shareSVG}</span>
        </TweetActionBar>
      </TweetContainer>
    </TweetWrapper>
  );
};
export default Tweet;
