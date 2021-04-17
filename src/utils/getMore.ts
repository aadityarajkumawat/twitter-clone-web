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
  GetTweetsByUserQuery,
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
