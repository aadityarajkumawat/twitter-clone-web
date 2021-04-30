import React, { Fragment, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import {
  ProfileAction,
  ProfileRouteParams,
  ProfileState,
} from "../../constants/interfaces";
import { HomeContextI } from "../../context/HomeContext";
import { GetTweetsByUserFQuery } from "../../generated/graphql";
import {
  getMoreUserPosts,
  getTweetProps,
  resetProfileState,
} from "../../helpers";
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
  const { state: homeState } = useContext(HomeContextI);

  useEffect(() => {
    resetProfileState(dispatch);
    // eslint-disable-next-line
  }, [username]);

  return (
    <InfiniteScroll
      dataLength={state.scrollProps.dataLength}
      hasMore={
        profileObj.getTweetsByUserF.num > 15 ? state.scrollProps.hasMore : false
      }
      next={() => getMoreUserPosts(paginationProps, id, homeState)}
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
