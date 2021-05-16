import React, { Fragment } from "react";
import { useParams } from "react-router";
import { ProfileRouteParams } from "../constants/interfaces";
import { Profile } from "./Profile/Profile";

interface ProfileWrapperProps {}

export const ProfileWrapper: React.FC<ProfileWrapperProps> = () => {
    const { username } = useParams<ProfileRouteParams>();
    const isProfile =
        username !== "home" && username !== "login" && username !== "register";
    return (
        <Fragment>{isProfile ? <Profile /> : <Fragment></Fragment>}</Fragment>
    );
};
