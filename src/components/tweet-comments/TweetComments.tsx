import { Flex } from "@chakra-ui/layout";
import React, { Fragment, useEffect } from "react";
import { useGetCommentsQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import { Comment } from "../comment/Comment";

interface TweetCommentsProps {
    tweet_id: number;
}

export const TweetComments: React.FC<TweetCommentsProps> = ({ tweet_id }) => {
    const [{ data, fetching }, reloadComments] = useGetCommentsQuery({
        variables: { fetchFrom: "tweet", postId: tweet_id },
    });

    const { refreshComments } = useStore((s) => ({ ...s }));

    useEffect(() => {
        reloadComments({ requestPolicy: "network-only" });
        // eslint-disable-next-line
    }, [refreshComments]);

    return (
        <Flex flexDir="column">
            {!fetching && data ? (
                <Fragment>
                    {data.getComments.comments.map((tweet) => (
                        <Comment
                            name={tweet.name}
                            commentMsg={tweet.commentMsg}
                            captain={tweet.img}
                            img={tweet.profileImg}
                            comment_id={tweet.comment_id}
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
