import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import * as SVG from "../../assets/tweetActionsSVGs";
import { AppContextI } from "../../context/AppContext";
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
    profile_img: string;
    likes: number;
    liked: boolean;
    comments: number;
    _type: string;
}

const Tweet: React.FC<TweetProps> = ({
    username,
    tweet_content,
    name,
    tweet_id,
    img,
    profile_img,
    comments,
    liked,
    likes,
    _type,
}) => {
    // const [{ data, fetching }, reloadQuery] = useGetTweetByIdQuery({
    //     variables: { tweet_id },
    // });

    const { disclosure } = useContext(AppContextI);

    const { setFocussedTweet, refreshTweet } = useStore((s) => ({ ...s }));
    const [refresh, setRefresh] = useState<string>(v4());
    const history = useHistory();

    useEffect(() => {
        // reloadQuery({ requestPolicy: "network-only" });
        //eslint-disable-next-line
    }, [refresh, refreshTweet]);

    return (
        <motion.div style={{ width: "100%" }} layout>
            <TweetWrapper>
                <UserProfileImg>
                    <div>
                        <img
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push(`/${username}`)}
                            src={profile_img}
                            alt="user"
                        />
                    </div>
                </UserProfileImg>
                <TweetContainer>
                    <Box>
                        <TweetUsername>
                            <span onClick={() => history.push(`/${username}`)}>
                                {name}
                            </span>
                            <FadedUsername
                                onClick={() => history.push(`/${username}`)}
                            >
                                @{username}
                            </FadedUsername>
                        </TweetUsername>
                        <TweetContent
                            onClick={() =>
                                history.push(`/status/${username}/${tweet_id}`)
                            }
                        >
                            {tweet_content}
                        </TweetContent>
                        {img !== "" && (
                            <TweetImageContainer>
                                <img src={img} alt="" />
                            </TweetImageContainer>
                        )}
                    </Box>
                    <TweetActionBar>
                        <span>
                            <Flex
                                cursor="pointer"
                                fontSize="14px"
                                onClick={() => {
                                    setFocussedTweet({
                                        _type,
                                        img,
                                        name,
                                        profile_img,
                                        tweet_content,
                                        tweet_id,
                                        username,
                                    });
                                    if (disclosure) {
                                        disclosure.onOpen();
                                    }
                                }}
                            >
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
                                    {likes}
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
