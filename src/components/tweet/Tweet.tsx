import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import * as SVG from "../../assets/tweetActionsSVGs";
import { useGetTweetByIdQuery } from "../../generated/graphql";
import LikeSVG from "../svgs/LikeSVG";
import {
  FadedUsername,
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
        <div>
          <img src={img} alt="user" />
        </div>
      </UserProfileImg>
      <TweetContainer>
        <TweetUsername>
          <span>{name}</span>
          <FadedUsername>@{username}</FadedUsername>
        </TweetUsername>
        <TweetContent>{tweet_content}</TweetContent>
        {captain !== "" && (
          <TweetImageContainer>
            <img src={captain} alt="" />
          </TweetImageContainer>
        )}
        <TweetActionBar>
          <span>
            <Flex fontSize="14px">
              {SVG.commentSVG}
              <Box ml="5px" color="rgb(136, 153, 166)">
                {comments}
              </Box>
            </Flex>
          </span>
          <span>
            <Flex fontSize="14px">
              {SVG.retweetSVG}
              <Box ml="5px" color="rgb(136, 153, 166)">
                1
              </Box>
            </Flex>
          </span>
          <span>
            <Flex fontSize="14px" alignItems="center" cursor="pointer">
              <LikeSVG liked={liked} tweet_id={tweet_id} setR={setRefresh} />
              <Box
                ml="5px"
                color={liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)"}
              >
                {data ? data!.getTweetById.tweet?.likes : 0}
              </Box>
            </Flex>
          </span>
          <span>
            <Flex fontSize="14px">
              {SVG.shareSVG}
              <Box ml="5px" color="rgb(136, 153, 166)">
                1
              </Box>
            </Flex>
          </span>
        </TweetActionBar>
      </TweetContainer>
    </TweetWrapper>
  );
};
export default Tweet;
