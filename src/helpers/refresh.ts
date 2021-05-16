import { CreateTweetMutation } from "../generated/graphql";

export const refresh = (createTweetData: CreateTweetMutation | undefined) => {
    if (createTweetData?.createPost.uploaded?.includes("uploaded")) {
        return true;
    } else {
        return false;
    }
};
