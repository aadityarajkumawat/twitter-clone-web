import React from "react";
import { useGetFollowInfoQuery } from "../../generated/graphql";
import { Follows } from "../../pages/Profile/profile.styles";
import { Follow } from "../follow/Follow";

interface FollowInfoProps {
  id: number;
  isLoggedUser: boolean;
}

export const FollowInfo: React.FC<FollowInfoProps> = ({ id, isLoggedUser }) => {
  const [{ data, fetching }, refe] = useGetFollowInfoQuery({
    variables: { id },
  });
  return (
    <Follows>
      <span>
        {!fetching && data ? data.getProfileStuff.profile.following : 0}
        <span className="faded"> Following</span>
      </span>
      <span>
        {!fetching && data ? data.getProfileStuff.profile.followers : 0}
        <span className="faded"> Followers</span>
      </span>
      <Follow isLoggedUser={isLoggedUser} id={id} refe={refe} />
    </Follows>
  );
};
