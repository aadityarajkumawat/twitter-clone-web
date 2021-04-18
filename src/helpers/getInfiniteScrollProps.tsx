import React from "react";
import { ifHasMore, getMore } from ".";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";
import {
  HomeAction,
  HomeState,
  PaginationProps,
} from "../constants/interfaces";
import { GetTweetsByUserQuery } from "../generated/graphql";

export const getInfiniteScrollProps = (
  feed: GetTweetsByUserQuery,
  paginationProps: PaginationProps,
  context: [HomeState, React.Dispatch<HomeAction>]
) => {
  const [state] = context;
  const infiniteScrollProps = {
    dataLength: state.scrollProps.dataLength,
    hasMore: ifHasMore(state.scrollProps.hasMore, feed),
    next: () => getMore(paginationProps),
    loader: <LoadingSpinner />,
  };

  return infiniteScrollProps;
};
