import React, { Fragment } from "react";
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

interface ProfileProps {}
export const Profile: React.FC<ProfileProps> = () => {
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
              <b>Aditya</b>
              <span>34 Tweets</span>
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
            <b>Aditya</b>
            <p className="username">@Aditya89764346</p>
            <p className="bio">I have no idea what to write here</p>
            <p className="link">
              <a href="https://www.youtube.com">www.youtube.com</a>
            </p>
            <Follows>
              <span>
                29
                <span className="faded"> Following</span>
              </span>
              <span>
                5<span className="faded"> Followers</span>
              </span>
            </Follows>
          </MoreInfo>
        </S.HomeMain>
        <S.RightMenu></S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
