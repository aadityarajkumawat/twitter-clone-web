import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BookmarkImage } from "../../assets/BookmarkImage";
import { ExploreImage } from "../../assets/ExploreImage";
import { HomeIcon } from "../../assets/HomeIcon";
import { ListsImage } from "../../assets/ListsImage";
import { MessagesImage } from "../../assets/MessagesImage";
import { MoreImage } from "../../assets/MoreImage";
import { Notifications } from "../../assets/Notifications";
import { ProfileImage } from "../../assets/ProfileImage";
import TwitterIcon from "../../assets/twitter-icon.svg";
import { useMeQuery } from "../../generated/graphql";
import * as S from "../../pages/home.styles";

interface LeftMenuProps {}

export const LeftMenu: React.FC<LeftMenuProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const identifier = !fetching && data ? data.me.user.username : "";

  return (
    <S.LeftMenu>
      <Box className="left-wrapper">
        <Flex className="in-left" flexDir="column" alignItems="center">
          <S.Head>
            <Image src={TwitterIcon} alt="twitter99" />
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
              <Link to={`/${identifier}`}>
                <ProfileImage />
                <span>Profile</span>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <MoreImage />
              <span>Settings</span>
            </S.ListItem>
          </S.MenuOptions>
        </Flex>
      </Box>
    </S.LeftMenu>
  );
};
