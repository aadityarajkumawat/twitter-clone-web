import React, { Fragment } from "react";
import * as S from "../../pages/home.styles";
import TwitterIcon from "../../assets/twitter-icon.svg";
import { Link } from "react-router-dom";

interface LeftMenuProps {}
export const LeftMenu: React.FC<LeftMenuProps> = () => {
  return (
    <Fragment>
      <S.Head>
        <img src={TwitterIcon} />
      </S.Head>
      <S.MenuOptions>
        <S.ListItem>
          <Link to="/">Home</Link>
        </S.ListItem>
        <S.ListItem>Explore</S.ListItem>
        <S.ListItem>Notifications</S.ListItem>
        <S.ListItem>Messages</S.ListItem>
        <S.ListItem>Bookmarks</S.ListItem>
        <S.ListItem>Lists</S.ListItem>
        <S.ListItem>
          <Link to="/profile">Profile</Link>
        </S.ListItem>
        <S.ListItem>Settings</S.ListItem>
      </S.MenuOptions>
    </Fragment>
  );
};
