import { cli } from "..";
import { PaginationProps } from "../constants/interfaces";
import {
  GetPaginatedPostsDocument,
  GetPaginatedPostsQuery,
  GetPaginatedPostsQueryVariables,
} from "../generated/graphql";

export const getMore = async (
  { feed, state, dispatch }: PaginationProps,
  postLimit = 3
) => {
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

// export const getMoreUserPosts = async (
//   { feed, state }: PaginationProps,
//   { setMore, setPag, setScrollProps }: PaginationFunctions,
//   postLimit = 3
// ) => {
//   const {} = state;
//   if (userTweets && userTweets.getTweetsByUserF) {
//     if (pag.offset === userTweets.getTweetsByUserF.num) {
//       setScrollProps((prev) => ({ ...prev, hasMore: false }));
//       return;
//     }

//     if (!user || !user.me || !user.me.user) return;

//     const phew = await cli
//       .query<GetPaginatedUserTweetsQuery, GetPaginatedUserTweetsQueryVariables>(
//         GetPaginatedUserTweetsDocument,
//         {
//           limit: postLimit,
//           offset: 5 + dataLength - postLimit,
//           id: user.me.user.id,
//         }
//       )
//       .toPromise();

//     if (phew && phew.data && phew.data.getPaginatedUserTweets) {
//       const s = phew.data.getPaginatedUserTweets.tweets;
//       if (s) {
//         setMore(s);
//       }

//       setPag({
//         offset: 5 + dataLength - postLimit + s.length,
//       });

//       setScrollProps((prev) => ({
//         ...prev,
//         dataLength: prev.dataLength + s.length,
//       }));
//     }
//   }
// };
