import React, { Fragment } from "react";
import { useFollowAUserMutation } from "../../generated/graphql";
import { FollowBtn } from "../../pages/Profile/profile.styles";

interface FollowProps {
  isLoggedUser: boolean;
  id: number;
  refe: (o: any) => void;
}

export const Follow: React.FC<FollowProps> = ({ isLoggedUser, id, refe }) => {
  const [
    { data: followUser, fetching: followingState },
    follow,
  ] = useFollowAUserMutation();
  return (
    <Fragment>
      {!isLoggedUser && (
        <FollowBtn
          onClick={async () => {
            await follow({ thatUser: id });
            refe({ requestPolicy: "network-only" });
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
