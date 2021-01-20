import { useState } from "react";
import {
  GetTweetsByUserFQuery,
  GetTweetsByUserQuery,
  useGetPaginatedPostsQuery,
} from "../generated/graphql";

interface PaginationParams {
  limit: number;
  offset: number;
}

interface InfiniteScrolling {
  hasMore: boolean;
  dataLength: number;
}

interface TweetType {
  comments: number;
  created_At: string;
  liked: boolean;
  likes: number;
  name: string;
  rel_acc: number;
  tweet_content: string;
  tweet_id: number;
  username: string;
  _type: string;
}

interface UsePaginatedPosts {
  more: Array<TweetType>;
  dataLength: number;
  hasMore: boolean;
  getMore: () => void;
}

export const useGetPaginatedPosts = (
  feed: any,
  realTime?: Array<TweetType>
): UsePaginatedPosts => {
  const [more, setMore] = useState<Array<TweetType>>([]);
  const [pag, setPag] = useState<PaginationParams>({ offset: 0, limit: -1 });

  const [{ data }] = useGetPaginatedPostsQuery({
    variables: pag,
  });

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 1,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;

  const getMore = () => {
    console.log(feed);
    if (feed?.getTweetsByUser || feed?.getTweetsByUserF) {
      let n = 0;

      if (feed.getTweetsByUser) {
        n = feed.getTweetsByUser.num;
      } else if (feed.getTweetsByUserF) {
        n = feed.getTweetsByUserF.num;
      }

      if (pag.offset === n + (realTime ? realTime.length : 0)) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }
      setPag({
        limit: 1,
        offset: 7 + scrollProps.dataLength + (realTime ? realTime.length : 0),
      });
      if (data) {
        if (data.getPaginatedPosts.tweets.length === 1) {
          // @ts-ignore
          setMore((prev) => [...prev, data.getPaginatedPosts.tweets[0]]);
        }
      }
      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + 1,
      }));
    }
  };

  return { more, dataLength, hasMore, getMore };
};
