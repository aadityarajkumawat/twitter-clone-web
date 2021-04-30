import { cli } from "..";
import { PAGINATE_HOME, PAGINATE_USER_PROFILE } from "../constants/consts";
import {
  HomeContextType,
  HomeState,
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
  postLimit = PAGINATE_HOME
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
          offset: 15 + dataLength + realTime.length,
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
        15 + dataLength + realTime.length + paginatedTweets.length;

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
  id: number,
  homeState: HomeState,
  postLimit = PAGINATE_USER_PROFILE
) => {
  const { scrollProps, offset, more } = state;
  const { dataLength } = scrollProps;

  if (!profile || !profile.getTweetsByUserF) return;
  console.log(
    offset,
    "===",
    profile.getTweetsByUserF.num,
    "+",
    homeState.realTime.length
  );
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
        offset: 15 + dataLength + homeState.realTime.length,
        id,
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

    const updatedOffset =
      15 + dataLength + paginatedTweets.length + homeState.realTime.length;

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
