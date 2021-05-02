import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as SVG from "../../assets/tweetActionsSVGs";
import { OpenTweetRouteParams } from "../../constants/interfaces";
import { useGetTweetByIdQuery } from "../../generated/graphql";
import LikeSVG from "../svgs/LikeSVG";

interface TweetActionsProps {}

export const TweetActions: React.FC<TweetActionsProps> = () => {
  const [refresh, setRefresh] = useState<string>("");
  const { tweet_id } = useParams<OpenTweetRouteParams>();
  const intTweetsId = parseInt(tweet_id);

  const [tweetData, refreshDue] = useGetTweetByIdQuery({
    variables: { tweet_id: intTweetsId },
  });
  const { data, fetching } = tweetData;

  const fontSize = "16px";

  useEffect(() => {
    refreshDue({ requestPolicy: "network-only" });
  }, [refresh]);

  return (
    <Flex
      justifyContent="space-between"
      px="1rem"
      py="10px"
      borderBottom="1px solid #4b4b4b"
    >
      <span>
        <Flex fontSize={fontSize}>
          {SVG.commentSVG20}
          <Box ml="5px" color="rgb(136, 153, 166)">
            {!fetching && data && data.getTweetById.tweet
              ? data.getTweetById.tweet.comments
              : 0}
          </Box>
        </Flex>
      </span>
      <span>
        <Flex fontSize={fontSize}>
          {SVG.retweetSVG20}
          <Box ml="5px" color="rgb(136, 153, 166)">
            0
          </Box>
        </Flex>
      </span>
      <span>
        <Flex fontSize={fontSize} alignItems="center" cursor="pointer">
          <LikeSVG
            liked={
              !fetching && data && data.getTweetById.tweet
                ? data.getTweetById.tweet.liked
                : false
            }
            tweet_id={intTweetsId}
            setR={setRefresh}
            size="20px"
          />
          <Box
            ml="5px"
            color={
              !fetching &&
              data &&
              data.getTweetById.tweet &&
              data.getTweetById.tweet.liked
                ? "rgb(224, 36, 94)"
                : "rgb(136, 153, 166)"
            }
          >
            {!fetching && data && data.getTweetById.tweet
              ? data.getTweetById.tweet.likes
              : 0}
          </Box>
        </Flex>
      </span>
      <span>
        <Flex fontSize={fontSize}>
          {SVG.shareSVG20}
          <Box ml="5px" color="rgb(136, 153, 166)">
            0
          </Box>
        </Flex>
      </span>
    </Flex>
  );
};
