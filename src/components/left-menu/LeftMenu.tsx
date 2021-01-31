import React, { Fragment } from "react";
import * as S from "../../pages/home.styles";
import TwitterIcon from "../../assets/twitter-icon.svg";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../assets/HomeIcon";
import { ExploreImage } from "../../assets/ExploreImage";
import { Notifications } from "../../assets/Notifications";
import { MessagesImage } from "../../assets/MessagesImage";
import { BookmarkImage } from "../../assets/BookmarkImage";
import { ListsImage } from "../../assets/ListsImage";
import { ProfileImage } from "../../assets/ProfileImage";
import { MoreImage } from "../../assets/MoreImage";

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
          <ExploreImage />
          <span>Explore</span>
        </S.ListItem>
        <S.ListItem>
          <Notifications />
          <span>Notifications</span>
        </S.ListItem>
        <S.ListItem>
          <MessagesImage />
          <span>Messages</span>
        </S.ListItem>
        <S.ListItem>
          <BookmarkImage />
          <span>Bookmarks</span>
        </S.ListItem>
        <S.ListItem>
          <ListsImage />
          <span>Lists</span>
        </S.ListItem>
        <S.ListItem>
          <a href="/profile">
            <ProfileImage />
            <span>Profile</span>
          </a>
        </S.ListItem>
        <S.ListItem>
          <MoreImage />
          <span>Settings</span>
        </S.ListItem>
      </S.MenuOptions>
    </Fragment>
  );
};
