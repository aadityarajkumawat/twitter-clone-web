import React, { Fragment } from "react";
import { ProfileContainer } from "./profile.styles";

interface ProfileProps {}
export const Profile: React.FC<ProfileProps> = () => {
  return (
    <Fragment>
      <ProfileContainer>hi</ProfileContainer>
    </Fragment>
  );
};
