import { GetTweetsByUserQuery } from "../generated/graphql";

export const ifHasMore = (
  hasMore: boolean,
  feed: GetTweetsByUserQuery
): boolean => {
  if (feed.getTweetsByUser.num > 10) return hasMore;
  return false;
};
