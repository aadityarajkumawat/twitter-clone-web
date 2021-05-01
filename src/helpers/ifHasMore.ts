import { GetTweetsByUserQuery } from "../generated/graphql";

export const ifHasMore = (
  hasMore: boolean,
  feed: GetTweetsByUserQuery
): boolean => {
  if (feed.getTweetsByUser.num && feed.getTweetsByUser.num > 15) return hasMore;
  return false;
};
