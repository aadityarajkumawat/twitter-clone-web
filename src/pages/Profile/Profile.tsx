import React, { Fragment, useEffect } from "react";
import {
  Back,
  CoverImageContainer,
  Follows,
  ImgContainer,
  MoreInfo,
  ProfileContainer,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "./profile.styles";
import * as S from "../../pages/home.styles";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { BackSVG } from "../../assets/BackSVG";
import { me } from "../../constants/urls";
import { useGetProfileQuery, useMeQuery } from "../../generated/graphql";

interface ProfileProps {}
export const Profile: React.FC<ProfileProps> = () => {
  const [{ data: user, fetching: fetchingUser }, refetchUser] = useMeQuery();
  const [
    { data: profile, fetching: fetchingProfile },
    refetchProfile,
  ] = useGetProfileQuery();

  useEffect(() => {
    refetchUser({ requestPolicy: "network-only" });
    refetchProfile({ requestPolicy: "network-only" });
  }, []);

  return (
    <Fragment>
      <ProfileContainer>
        <S.LeftMenu>
          <LeftMenu />
        </S.LeftMenu>
        <S.HomeMain>
          <ProfileNav>
            <Back>
              <BackSVG />
            </Back>
            <ProfileInfo>
              <b>{user && !fetchingUser ? user!.me!.name : ""}</b>
              <span>
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.num
                  : 0}{" "}
                Tweets
              </span>
            </ProfileInfo>
          </ProfileNav>
          <CoverImageContainer>
            <ImgContainer>
              <img src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
            </ImgContainer>
            <ProfileImgContainer>
              <img src={me} />
            </ProfileImgContainer>
          </CoverImageContainer>
          <MoreInfo>
            <b>{user && !fetchingUser ? user!.me!.name : ""}</b>
            <p className="username">
              @{user && !fetchingUser ? user!.me!.username : ""}
            </p>
            <p className="bio">
              {profile && !fetchingProfile
                ? profile.getUserProfile.profile.bio
                : ""}
            </p>
            <p className="link">
              <a
                href={
                  profile && !fetchingProfile
                    ? profile.getUserProfile.profile.link
                    : "#"
                }
              >
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.link
                  : ""}
              </a>
            </p>
            <Follows>
              <span>
                {profile && !fetchingProfile
                  ? profile!.getUserProfile.profile.following
                  : ""}
                <span className="faded"> Following</span>
              </span>
              <span>
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.followers
                  : ""}
                <span className="faded"> Followers</span>
              </span>
            </Follows>
          </MoreInfo>
        </S.HomeMain>
        <S.RightMenu></S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
