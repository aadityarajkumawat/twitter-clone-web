import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FollowInfoState } from "../../constants/interfaces";
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

  const [followInfo, setFollowInfo] = useState<FollowInfoState>({
    followers: 0,
    following: 0,
    isFollowed: false,
  });
  const followingLoading = useState<boolean>(false);

  useEffect(() => {
    if (!fetching && data) {
      const { followers, following, isFollowed } = data.getProfileStuff.profile;
      setFollowInfo(() => ({
        followers,
        following,
        isFollowed,
      }));
      followingLoading[1](false);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  return (
    <Follows>
      <Flex>
        <Box w="100px">
          {followInfo.following}
          <span className="faded"> Following</span>
        </Box>
        <Box w="100px">
          {followInfo.followers}
          <span className="faded"> Followers</span>
        </Box>
      </Flex>
      <Follow
        isLoggedUser={isLoggedUser}
        id={id}
        refe={refe}
        following={followInfo.isFollowed}
        followingLoading={followingLoading}
      />
    </Follows>
  );
};
