import { Button } from "@chakra-ui/button";
import React, { Fragment } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { UseStateReturn } from "../../constants/interfaces";
import { useFollowAUserMutation } from "../../generated/graphql";
import { useStore } from "../../zustand/store";

interface FollowProps {
    isLoggedUser: boolean;
    id: number;
    refe: (o: any) => void;
    following: boolean;
    followingLoading: UseStateReturn<boolean>;
}

export const Follow: React.FC<FollowProps> = ({
    isLoggedUser,
    id,
    refe,
    following,
    followingLoading,
}) => {
    const [, follow] = useFollowAUserMutation();
    const { setFeedRefresh } = useStore((s) => ({ ...s }));
    const [followingL, setFollowingL] = followingLoading;

    const followAndRefresh = async () => {
        setFollowingL(true);
        await follow({ thatUser: id });
        refe({ requestPolicy: "network-only" });
        setFeedRefresh(uuid());
    };

    return (
        <Fragment>
            {!isLoggedUser && (
                <FollowButtonWrapper>
                    <Button
                        variant={following ? "following" : "follow"}
                        onClick={followAndRefresh}
                        isLoading={followingL}
                    >
                        {following ? "Following" : "Follow"}
                    </Button>
                </FollowButtonWrapper>
            )}
        </Fragment>
    );
};

const FollowButtonWrapper = styled.div`
    button {
        div {
            overflow-y: hidden;
        }
    }
`;
