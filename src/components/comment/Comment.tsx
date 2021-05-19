import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import * as SVG from "../../assets/tweetActionsSVGs";
import { AppContextI } from "../../context/AppContext";
import { useGetOneCommentQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import { LikeComment } from "../like-comment/LikeComment";
import {
    FadedUsername,
    TweetActionBar,
    TweetContainer,
    TweetContent,
    TweetImageContainer,
    TweetUsername,
    TweetWrapper,
    UserProfileImg,
} from "../tweet/tweet.styles";

export interface TweetProps {
    username: string;
    commentMsg: string;
    name: string;
    comment_id: number;
    img: string;
    captain: string;
}

export const Comment: React.FC<TweetProps> = ({
    username,
    commentMsg,
    name,
    comment_id,
    img,
    captain,
}) => {
    const [{ data, fetching }, reloadQuery] = useGetOneCommentQuery({
        variables: { comment_id, fetchFrom: "tweet" },
    });

    const { disclosure } = useContext(AppContextI);

    const { setFocussedTweet, refreshTweet } = useStore((s) => ({ ...s }));
    const [refresh, setRefresh] = useState<string>(v4());
    const history = useHistory();

    let liked = false;
    if (
        !fetching &&
        data &&
        data.getOneComment.comment &&
        data.getOneComment.comment.liked
    ) {
        liked = data.getOneComment.comment.liked;
    }

    const prepareCommentModal = () => {
        if (!fetching && data && data.getOneComment.comment) {
            setFocussedTweet({
                _type: "tweet",
                img: data.getOneComment.comment.img,
                name: data.getOneComment.comment.name,
                profile_img: data.getOneComment.comment.profileImg,
                tweet_content: data.getOneComment.comment.commentMsg,
                tweet_id: data.getOneComment.comment.comment_id,
                username: data.getOneComment.comment.username,
            });
        }
        if (disclosure) {
            disclosure.onOpen();
        }
    };

    useEffect(() => {
        reloadQuery({ requestPolicy: "network-only" });
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
                            src={img}
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
                                history.push(
                                    `/status/${username}/${comment_id}`
                                )
                            }
                        >
                            {commentMsg}
                        </TweetContent>
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
                                onClick={prepareCommentModal}
                            >
                                {SVG.commentSVG}
                                <Box ml="5px" color="rgb(136, 153, 166)">
                                    {!fetching &&
                                    data &&
                                    data.getOneComment.comment
                                        ? data.getOneComment.comment.comments
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
                                <LikeComment
                                    liked={liked}
                                    comment_id={comment_id}
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
                                    {data &&
                                    !fetching &&
                                    data.getOneComment.comment
                                        ? data.getOneComment.comment.likes
                                        : 0}
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
