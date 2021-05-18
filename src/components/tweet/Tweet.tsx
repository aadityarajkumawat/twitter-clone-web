import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import * as SVG from "../../assets/tweetActionsSVGs";
import { AppContextI } from "../../context/AppContext";
import { useGetTweetByIdQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
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
    tweet_id: number;
    img: string;
    captain: string;
}

const Tweet: React.FC<TweetProps> = ({
    username,
    tweet_content,
    name,
    tweet_id,
    img,
    captain,
}) => {
    const [{ data, fetching }, reloadQuery] = useGetTweetByIdQuery({
        variables: { tweet_id },
    });

    const { disclosure } = useContext(AppContextI);

    const { setFocussedTweet, refreshTweet } = useStore((s) => ({ ...s }));
    const [refresh, setRefresh] = useState<string>(v4());
    const history = useHistory();

    let liked = false;
    if (!fetching && data && data.getTweetById.tweet) {
        liked = data.getTweetById.tweet.liked;
    }

    useEffect(() => {
        reloadQuery({ requestPolicy: "network-only" });
        //eslint-disable-next-line
    }, [refresh, refreshTweet]);

    return (
        <motion.div style={{ width: "100%" }} layout>
            <TweetWrapper>
                <UserProfileImg>
                    <div>
                        <img src={img} alt="user" />
                    </div>
                </UserProfileImg>
                <TweetContainer>
                    <Box
                        onClick={() =>
                            history.push(`/status/${username}/${tweet_id}`)
                        }
                    >
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
                    </Box>
                    <TweetActionBar>
                        <span>
                            <Flex
                                cursor="pointer"
                                fontSize="14px"
                                onClick={() => {
                                    if (
                                        !fetching &&
                                        data &&
                                        data.getTweetById.tweet
                                    ) {
                                        setFocussedTweet({
                                            _type: data.getTweetById.tweet
                                                ._type,
                                            img: data.getTweetById.tweet.img,
                                            name: data.getTweetById.tweet.name,
                                            profile_img:
                                                data.getTweetById.tweet
                                                    .profile_img,
                                            tweet_content:
                                                data.getTweetById.tweet
                                                    .tweet_content,
                                            tweet_id:
                                                data.getTweetById.tweet
                                                    .tweet_id,
                                            username:
                                                data.getTweetById.tweet
                                                    .username,
                                        });
                                    }
                                    if (disclosure) {
                                        disclosure.onOpen();
                                    }
                                }}
                            >
                                {SVG.commentSVG}
                                <Box ml="5px" color="rgb(136, 153, 166)">
                                    {!fetching &&
                                    data &&
                                    data.getTweetById.tweet
                                        ? data.getTweetById.tweet.comments
                                        : 0}
                                </Box>
                            </Flex>
                        </span>
                        <span>
                            <Flex fontSize="14px">
                                {SVG.retweetSVG}
                                <Box ml="5px" color="rgb(136, 153, 166)">
                                    0
                                </Box>
                            </Flex>
                        </span>
                        <span>
                            <Flex
                                fontSize="14px"
                                alignItems="center"
                                cursor="pointer"
                            >
                                <LikeSVG
                                    liked={liked}
                                    tweet_id={tweet_id}
                                    setR={setRefresh}
                                />
                                <Box
                                    ml="5px"
                                    color={
                                        liked
                                            ? "rgb(224, 36, 94)"
                                            : "rgb(136, 153, 166)"
                                    }
                                >
                                    {data ? data.getTweetById.tweet?.likes : 0}
                                </Box>
                            </Flex>
                        </span>
                        <span>
                            <Flex fontSize="14px">
                                {SVG.shareSVG}
                                <Box ml="5px" color="rgb(136, 153, 166)">
                                    0
                                </Box>
                            </Flex>
                        </span>
                    </TweetActionBar>
                </TweetContainer>
            </TweetWrapper>
        </motion.div>
    );
};

export default Tweet;
