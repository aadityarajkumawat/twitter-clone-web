import { Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { useParams } from "react-router";
import { OpenTweetHeader } from "../../components/open-tweet-header/OpenTweetHeader";
import { PostComment } from "../../components/post-comment/PostComment";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { TweetActions } from "../../components/tweet-action-bar/TweetActions";
import { TweetComments } from "../../components/tweet-comments/TweetComments";
import { OpenTweetRouteParams } from "../../constants/interfaces";
import {
    useGetTweetByIdQuery,
    useGetUserByUsernameQuery,
} from "../../generated/graphql";
import { BaseComponent } from "../home.styles";

interface OpenTweetProps {}
export const OpenTweet: React.FC<OpenTweetProps> = () => {
    const { tweet_id, username } = useParams<OpenTweetRouteParams>();
    const intTweetsId = parseInt(tweet_id);

    const [tweetData] = useGetTweetByIdQuery({
        variables: { tweet_id: intTweetsId },
    });
    const { data: tweet, fetching: loadingTweet } = tweetData;

    const [userData] = useGetUserByUsernameQuery({ variables: { username } });
    const { data: user, fetching: loadingUser } = userData;

    return (
        <BaseComponent>
            <PostComment />
            <Flex
                w="596px"
                borderX="1px solid #4b4b4b"
                flexDir="column"
                h="auto"
                transition="all 2s ease"
                overflowY="hidden"
            >
                <motion.div animate={{ height: "auto" }}>
                    <motion.div layout>
                        <OpenTweetHeader />
                    </motion.div>
                    <motion.div layout>
                        {!loadingUser && user ? (
                            <Flex
                                w="100%"
                                h="60px"
                                px="1rem"
                                alignItems="center"
                            >
                                <Image
                                    src={user.getUserByUsername.user.img}
                                    borderRadius="100%"
                                    w="45px"
                                    h="45px"
                                    objectFit="cover"
                                />
                                <Flex
                                    flexDir="column"
                                    ml="1.5rem"
                                    color="white"
                                >
                                    <Text fontWeight="600">
                                        {user.getUserByUsername.user.name}
                                    </Text>
                                    <Text color="#999999">
                                        @{user.getUserByUsername.user.username}
                                    </Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Fragment></Fragment>
                        )}
                    </motion.div>

                    <Flex
                        p="1rem"
                        borderBottom="1px solid #4b4b4b"
                        h="auto"
                        className="tweet-content-container"
                        overflowY="hidden"
                    >
                        <motion.div layout>
                            {!loadingTweet &&
                            tweet &&
                            tweet.getTweetById.tweet ? (
                                <Flex flexDir="column">
                                    <Text color="white" fontSize="21px">
                                        {tweet.getTweetById.tweet.tweet_content}
                                    </Text>
                                    {tweet.getTweetById.tweet.img && (
                                        <Image
                                            src={tweet.getTweetById.tweet.img}
                                            w="100%"
                                            height="auto"
                                            borderRadius="10px"
                                        />
                                    )}
                                </Flex>
                            ) : (
                                <Flex
                                    justifyContent="center"
                                    w="100%"
                                    className="spinner"
                                >
                                    <LoadingSpinner h="30px" />
                                </Flex>
                            )}
                        </motion.div>
                    </Flex>
                    <TweetActions />
                    <TweetComments tweet_id={intTweetsId} />
                </motion.div>
            </Flex>
        </BaseComponent>
    );
};
