import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { MoreInfo } from "../../pages/Profile/profile.styles";
import { FollowInfo } from "../follow-info/FollowInfo";

interface MoreInfoHighProps {
    name: string;
    username: string;
    link: string;
    bio: string;
    id: number;
    isLoggedUser: boolean;
}

export const MoreInfoHigh: React.FC<MoreInfoHighProps> = ({
    name,
    username,
    link,
    bio,
    id,
    isLoggedUser,
}) => {
    return (
        <MoreInfo>
            <Text fontWeight="600">{name}</Text>
            <Text color="#a5a5a5">@{username}</Text>
            <Text>{bio}</Text>
            <Text className="link">
                <Link href={link} target="blank">
                    {link}
                </Link>
            </Text>
            <FollowInfo id={id} isLoggedUser={isLoggedUser} />
        </MoreInfo>
    );
};
