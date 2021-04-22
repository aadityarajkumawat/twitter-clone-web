import React, { Fragment } from "react";
import { OperationContext, UseMutationResponse } from "urql";
import { FollowAUserMutation, Exact } from "../../generated/graphql";
import { FollowBtn } from "../../pages/Profile/profile.styles";

interface FollowProps {
  isLoggedUser: boolean;
  followContext: UseMutationResponse<
    FollowAUserMutation,
    Exact<{
      thatUser: number;
    }>
  >;
  id: number;
  refr: (opts?: Partial<OperationContext> | undefined) => void;
}

export const Follow: React.FC<FollowProps> = ({
  isLoggedUser,
  followContext,
  id,
  refr,
}) => {
  const [
    { data: followUser, fetching: followingState },
    follow,
  ] = followContext;
  return (
    <Fragment>
      {!isLoggedUser && (
        <FollowBtn
          onClick={async () => {
            await follow({ thatUser: id });
            refr({ requestPolicy: "network-only" });
          }}
        >
          {!followingState && followUser && followUser.followAUser.followed
            ? "Unfollow"
            : "Follow"}
        </FollowBtn>
      )}
    </Fragment>
  );
};
