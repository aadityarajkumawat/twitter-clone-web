import { Box, Button, Image } from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router";
import {
    ProfileProperties,
    ProfileRouteParams,
} from "../../constants/interfaces";
import { AppContextI } from "../../context/AppContext";
import { HomeContextI } from "../../context/HomeContext";
import {
    useGetProfileStuffQuery,
    useGetUserByUsernameQuery,
    useMeQuery,
} from "../../generated/graphql";
import { decideAndReturnCorrectId } from "../../helpers";
import {
    CoverImageContainer,
    ImgContainer,
    ProfileImgContainer,
} from "../../pages/Profile/profile.styles";
import { MoreInfoHigh } from "../more-info/MoreInfoHigh";
import { ProfileNav } from "../profile-nav/ProfileNav";
import { LoadingSpinner } from "../spinner/LoadingSpinner";

interface UserProfileProps {
    onOpen: () => void;
    refreshToken: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    onOpen,
    refreshToken,
}) => {
    const { username } = useParams<ProfileRouteParams>();
    const [{ data: user, fetching: fetchingUser }] = useMeQuery();
    const [{ data: nUser, fetching: fetchingNUser }] =
        useGetUserByUsernameQuery({
            variables: { username },
        });

    const { id, isLoggedUser } = decideAndReturnCorrectId(
        { fetchingUser, user },
        { fetchingNUser, nUser },
        username
    );

    const appContext = useContext(AppContextI);
    const { setUserProfile, loggedUserProfile } = appContext;

    const homeContext = useContext(HomeContextI);
    const {
        HomeActionFn: { setNumberOfUserTweets },
    } = homeContext;

    const [{ data: profile, fetching: fetchingProfile }, repres] =
        useGetProfileStuffQuery({ variables: { id } });

    const getProfileValByKey = (key: ProfileProperties) => {
        if (!fetchingProfile && profile) {
            const obj = profile.getProfileStuff.profile;
            const val = obj[key];
            return val.toString();
        }
        return "";
    };

    useEffect(() => {
        if (profile && profile.getProfileStuff.profile) {
            if (isLoggedUser) {
                const { bio, cover_img, link, name, profile_img, username } =
                    profile.getProfileStuff.profile;
                setUserProfile({
                    bio,
                    cover_img,
                    link,
                    name,
                    profile_img,
                    username,
                });
            }
            setNumberOfUserTweets(profile.getProfileStuff.profile.num);
        }

        // eslint-disable-next-line
    }, [JSON.stringify(profile)]);

    useEffect(() => {
        repres({ requestPolicy: "network-only" });
        // eslint-disable-next-line
    }, [refreshToken]);

    return (
        <Box w="100%">
            <ProfileNav id={id} />
            <CoverImageContainer>
                <ImgContainer>
                    <Image
                        src={
                            loggedUserProfile && isLoggedUser
                                ? loggedUserProfile.cover_img
                                : getProfileValByKey("cover_img")
                        }
                        alt="user-cover"
                    />
                </ImgContainer>
                <ProfileImgContainer>
                    <Image
                        src={
                            loggedUserProfile && isLoggedUser
                                ? loggedUserProfile.profile_img
                                : getProfileValByKey("profile_img")
                        }
                        alt="user"
                    />
                </ProfileImgContainer>
                {isLoggedUser && (
                    <Button variant="edit-profile" onClick={onOpen}>
                        Edit Profile
                    </Button>
                )}
            </CoverImageContainer>

            {!isLoggedUser ? (
                <Box>
                    {!fetchingProfile && profile ? (
                        <MoreInfoHigh
                            bio={getProfileValByKey("bio")}
                            link={getProfileValByKey("link")}
                            name={getProfileValByKey("name")}
                            username={getProfileValByKey("username")}
                            id={id}
                            isLoggedUser={isLoggedUser}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}
                </Box>
            ) : (
                <Box>
                    {loggedUserProfile ? (
                        <MoreInfoHigh
                            {...loggedUserProfile}
                            id={id}
                            isLoggedUser={isLoggedUser}
                        />
                    ) : (
                        <Fragment>
                            {!fetchingProfile && profile ? (
                                <MoreInfoHigh
                                    bio={getProfileValByKey("bio")}
                                    link={getProfileValByKey("link")}
                                    name={getProfileValByKey("name")}
                                    username={getProfileValByKey("username")}
                                    id={id}
                                    isLoggedUser={isLoggedUser}
                                />
                            ) : (
                                <LoadingSpinner />
                            )}
                        </Fragment>
                    )}
                </Box>
            )}
            <Box w="100%" h="3px" bg="#424242" mb="8px"></Box>
        </Box>
    );
};
