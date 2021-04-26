import React, { Fragment } from "react";
import { useFollowAUserMutation } from "../../generated/graphql";
import { FollowBtn } from "../../pages/Profile/profile.styles";

interface FollowProps {
  isLoggedUser: boolean;
  id: number;
  refe: (o: any) => void;
  following: boolean;
}

export const Follow: React.FC<FollowProps> = ({
  isLoggedUser,
  id,
  refe,
  following,
}) => {
  const [, follow] = useFollowAUserMutation();

  return (
    <Fragment>
      {!isLoggedUser && (
        <FollowBtn
          onClick={async () => {
            await follow({ thatUser: id });
            refe({ requestPolicy: "network-only" });
          }}
        >
          {following ? "Following" : "Follow"}
        </FollowBtn>
      )}
    </Fragment>
  );
};
