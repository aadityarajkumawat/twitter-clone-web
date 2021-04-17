import { GetTweetsByUserQuery } from "../generated/graphql";

export const ifHasMore = (
  hasMore: boolean,
  feed: GetTweetsByUserQuery
): boolean => {
  if (feed.getTweetsByUser.num > 7) return hasMore;
  return false;
};
