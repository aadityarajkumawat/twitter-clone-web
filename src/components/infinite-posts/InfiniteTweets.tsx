import React, { Fragment, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import {
  ProfileAction,
  ProfileRouteParams,
  ProfileState,
} from "../../constants/interfaces";
import { GetTweetsByUserFQuery } from "../../generated/graphql";
import { getMoreUserPosts, getTweetProps } from "../../helpers";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import Tweet from "../tweet/Tweet";

interface InfiniteTweetsProps {
  profileObj: GetTweetsByUserFQuery;
  id: number;
  context: [ProfileState, React.Dispatch<ProfileAction>];
}

export const InfiniteTweets: React.FC<InfiniteTweetsProps> = ({
  profileObj,
  id,
  context,
}) => {
  const [state, dispatch] = context;
  const paginationProps = { profile: profileObj, state, dispatch };
  const { username } = useParams<ProfileRouteParams>();

  useEffect(() => {
    dispatch({ type: "more", moreTweets: [] });
    dispatch({ type: "offset", updatedOffset: 0 });
    dispatch({
      type: "scroll",
      updatedScroll: { dataLength: 3, hasMore: true },
    });
  }, [username]);

  return (
    <InfiniteScroll
      dataLength={state.scrollProps.dataLength}
      hasMore={
        profileObj.getTweetsByUserF.num > 5 ? state.scrollProps.hasMore : false
      }
      next={() => getMoreUserPosts(paginationProps, id)}
      loader={<LoadingSpinner />}
    >
      <Fragment>
        {state.more.map((tweet) => (
          <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
        ))}
      </Fragment>
    </InfiniteScroll>
  );
};
