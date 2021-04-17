import { cli } from "..";
import {
  InfiniteScrolling,
  PaginationParams,
  TweetType,
} from "../constants/interfaces";
import {
  GetPaginatedPostsDocument,
  GetPaginatedPostsQuery,
  GetPaginatedPostsQueryVariables,
  GetPaginatedUserTweetsDocument,
  GetPaginatedUserTweetsQuery,
  GetPaginatedUserTweetsQueryVariables,
  GetTweetsByUserFQuery,
  GetTweetsByUserQuery,
  MeQuery,
} from "../generated/graphql";

type PaginationFunctions = {
  setMore: (value: React.SetStateAction<Array<TweetType>>) => void;
  setPag: (value: React.SetStateAction<PaginationParams>) => void;
  setScrollProps: (value: React.SetStateAction<InfiniteScrolling>) => void;
};

export const getMore = async (
  feed: GetTweetsByUserQuery | undefined,
  pag: PaginationParams,
  realTime: Array<TweetType>,
  dataLength: number,
  { setMore, setPag, setScrollProps }: PaginationFunctions,
  postLimit = 3
) => {
  if (feed && feed.getTweetsByUser) {
    if (pag.offset === feed.getTweetsByUser.num + realTime.length) {
      setScrollProps((prev) => ({ ...prev, hasMore: false }));
      return;
    }

    const phew = await cli
      .query<GetPaginatedPostsQuery, GetPaginatedPostsQueryVariables>(
        GetPaginatedPostsDocument,
        {
          limit: postLimit,
          offset: 7 + dataLength + realTime.length - postLimit,
        }
      )
      .toPromise();

    if (phew && phew.data && phew.data.getPaginatedPosts) {
      const s = phew.data.getPaginatedPosts.tweets;
      if (s) {
        setMore((prev) => [...prev, ...s]);
      }

      setPag({
        offset: 7 + dataLength + realTime.length - postLimit + s.length,
      });

      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + s.length,
      }));
    }
  }
};

export const getMoreUserPosts = async (
  userTweets: GetTweetsByUserFQuery,
  pag: PaginationParams,
  dataLength: number,
  user: MeQuery | undefined,
  { setMore, setPag, setScrollProps }: PaginationFunctions,
  postLimit = 3
) => {
  if (userTweets && userTweets.getTweetsByUserF) {
    if (pag.offset === userTweets.getTweetsByUserF.num) {
      setScrollProps((prev) => ({ ...prev, hasMore: false }));
      return;
    }

    if (!user || !user.me || !user.me.user) return;
    // if (!user.me) return;

    const phew = await cli
      .query<GetPaginatedUserTweetsQuery, GetPaginatedUserTweetsQueryVariables>(
        GetPaginatedUserTweetsDocument,
        {
          limit: postLimit,
          offset: 5 + dataLength - postLimit,
          id: user.me.user.id,
        }
      )
      .toPromise();

    if (phew && phew.data && phew.data.getPaginatedUserTweets) {
      const s = phew.data.getPaginatedUserTweets.tweets;
      if (s) {
        setMore((prev) => [...prev, ...s]);
      }

      setPag({
        offset: 5 + dataLength - postLimit + s.length,
      });

      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + s.length,
      }));
    }
  }
};
