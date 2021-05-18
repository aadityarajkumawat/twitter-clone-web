import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as SVG from "../../assets/tweetActionsSVGs";
import { OpenTweetRouteParams } from "../../constants/interfaces";
import { AppContextI } from "../../context/AppContext";
import { useGetTweetByIdQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
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

    const { disclosure } = useContext(AppContextI);
    const { setFocussedTweet } = useStore((s) => ({ ...s }));

    const fontSize = "16px";

    useEffect(() => {
        refreshDue({ requestPolicy: "network-only" });
        // eslint-disable-next-line
    }, [refresh]);

    return (
        <Flex
            justifyContent="space-between"
            px="1rem"
            py="10px"
            borderBottom="1px solid #4b4b4b"
        >
            <span>
                <Flex
                    cursor="pointer"
                    fontSize={fontSize}
                    onClick={() => {
                        if (!fetching && data && data.getTweetById.tweet) {
                            setFocussedTweet({
                                _type: data.getTweetById.tweet._type,
                                img: data.getTweetById.tweet.img,
                                name: data.getTweetById.tweet.name,
                                profile_img:
                                    data.getTweetById.tweet.profile_img,
                                tweet_content:
                                    data.getTweetById.tweet.tweet_content,
                                tweet_id: data.getTweetById.tweet.tweet_id,
                                username: data.getTweetById.tweet.username,
                            });
                        }
                        if (disclosure) {
                            disclosure.onOpen();
                        }
                    }}
                >
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
