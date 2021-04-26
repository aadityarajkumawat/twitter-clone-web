import React from "react";
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
import { useMeQuery } from "../../generated/graphql";
import { Box, Flex, Image } from "@chakra-ui/react";

interface LeftMenuProps {}
export const LeftMenu: React.FC<LeftMenuProps> = () => {
  const [{ data, fetching }] = useMeQuery();
  const identifier = !fetching && data ? data.me.user.username : "";

  return (
    <S.LeftMenu>
      <Box className="left-wrapper" px="10px">
        <Flex flexDir="column" alignItems="center">
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
