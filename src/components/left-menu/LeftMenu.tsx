import React, { Fragment } from "react";
import * as S from "../../pages/home.styles";
import TwitterIcon from "../../assets/twitter-icon.svg";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../assets/HomeIcon";

interface LeftMenuProps {}
export const LeftMenu: React.FC<LeftMenuProps> = () => {
  return (
    <Fragment>
      <S.Head>
        <img src={TwitterIcon} />
      </S.Head>
      <S.MenuOptions>
        <S.ListItem>
          <Link to="/">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Explore</span>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Notifications</span>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Messages</span>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Bookmarks</span>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Lists</span>
        </S.ListItem>
        <S.ListItem>
          <a href="/profile">
            <HomeIcon />
            <span>Profile</span>
          </a>
        </S.ListItem>
        <S.ListItem>
          <HomeIcon />
          <span>Settings</span>
        </S.ListItem>
      </S.MenuOptions>
    </Fragment>
  );
};
