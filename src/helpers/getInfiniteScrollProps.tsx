import { getMore, ifHasMore } from ".";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";
import { HomeContextType } from "../constants/interfaces";
import { GetTweetsByUserQuery } from "../generated/graphql";

export const getInfiniteScrollProps = (
    feed: GetTweetsByUserQuery,
    context: HomeContextType
) => {
    const { state } = context;
    const infiniteScrollProps = {
        dataLength: state.scrollProps.dataLength,
        hasMore: ifHasMore(state.scrollProps.hasMore, feed),
        next: () => getMore(feed, context),
        loader: <LoadingSpinner />,
    };

    return infiniteScrollProps;
};
