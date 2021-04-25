import { cli } from "..";
import {
  HomeContextType,
  PaginationPropsProfile,
} from "../constants/interfaces";
import {
  GetPaginatedPostsDocument,
  GetPaginatedPostsQuery,
  GetPaginatedPostsQueryVariables,
  GetPaginatedUserTweetsDocument,
  GetPaginatedUserTweetsQuery,
  GetPaginatedUserTweetsQueryVariables,
  GetTweetsByUserQuery,
} from "../generated/graphql";

export const getMore = async (
  feed: GetTweetsByUserQuery | undefined,
  context: HomeContextType,
  postLimit = 3
) => {
  const { state, dispatch } = context;
  const { scrollProps, realTime, pag, more } = state;
  const { dataLength } = scrollProps;
  if (feed && feed.getTweetsByUser) {
    if (pag.offset === feed.getTweetsByUser.num + realTime.length) {
      dispatch({
        type: "scroll",
        updatedScroll: { ...scrollProps, hasMore: false },
      });
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
      const paginatedTweets = phew.data.getPaginatedPosts.tweets;
      if (paginatedTweets) {
        dispatch({
          type: "more",
          moreTweets: [...more, ...paginatedTweets],
        });
      }

      const updatedOffset =
        7 + dataLength + realTime.length - postLimit + paginatedTweets.length;

      dispatch({ type: "pag", updatedPag: { offset: updatedOffset } });

      dispatch({
        type: "scroll",
        updatedScroll: {
          ...scrollProps,
          dataLength: dataLength + paginatedTweets.length,
        },
      });
    }
  }
};

export const getMoreUserPosts = async (
  { profile, state, dispatch }: PaginationPropsProfile,
  postLimit = 3
) => {
  const { scrollProps, offset, more } = state;
  const { dataLength } = scrollProps;
  if (!profile || !profile.getTweetsByUserF) return;
  if (offset === profile.getTweetsByUserF.num) {
    dispatch({
      type: "scroll",
      updatedScroll: { ...scrollProps, hasMore: false },
    });
    return;
  }

  const phew = await cli
    .query<GetPaginatedUserTweetsQuery, GetPaginatedUserTweetsQueryVariables>(
      GetPaginatedUserTweetsDocument,
      {
        limit: postLimit,
        offset: 5 + dataLength - postLimit,
        id: 1,
      }
    )
    .toPromise();

  if (phew && phew.data && phew.data.getPaginatedUserTweets) {
    const paginatedTweets = phew.data.getPaginatedUserTweets.tweets;
    if (paginatedTweets) {
      dispatch({
        type: "more",
        moreTweets: [...more, ...paginatedTweets],
      });
    }

    const updatedOffset = 5 + dataLength - postLimit + paginatedTweets.length;

    dispatch({ type: "offset", updatedOffset });

    dispatch({
      type: "scroll",
      updatedScroll: {
        ...scrollProps,
        dataLength: dataLength + paginatedTweets.length,
      },
    });
  }
};
