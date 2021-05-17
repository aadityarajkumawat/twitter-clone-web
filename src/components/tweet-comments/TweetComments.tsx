import { Flex } from "@chakra-ui/layout";
import React, { Fragment, useContext, useEffect } from "react";
import { AppContextI } from "../../context/AppContext";
import { useGetCommentsQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import Tweet from "../tweet/Tweet";

interface TweetCommentsProps {
    tweet_id: number;
}

export const TweetComments: React.FC<TweetCommentsProps> = ({ tweet_id }) => {
    const [{ data, fetching }, reloadComments] = useGetCommentsQuery({
        variables: { fetchFrom: "tweet", postId: tweet_id },
    });

    const { disclosure } = useContext(AppContextI);

    const { refreshComments } = useStore((s) => ({ ...s }));

    useEffect(() => {
        reloadComments({ requestPolicy: "network-only" });
    }, [refreshComments]);

    return (
        <Flex flexDir="column">
            {!fetching && data ? (
                <Fragment>
                    {data.getComments.comments.map((tweet) => (
                        <Tweet
                            name={tweet.name}
                            tweet_content={tweet.commentMsg}
                            captain={tweet.img}
                            img={tweet.profileImg}
                            tweet_id={tweet.comment_id}
                            username={tweet.username}
                            key={tweet.comment_id}
                        />
                    ))}
                </Fragment>
            ) : (
                <Fragment></Fragment>
            )}
        </Flex>
    );
};
