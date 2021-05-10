import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { FeedTweets } from "../components/feed-tweets/FeedTweets";
import { HomeHeader } from "../components/home-header/HomeHeader";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { PostComment } from "../components/post-comment/PostComment";
import { RightMenu } from "../components/right-menu/RightMenu";
import { BaseComponent, HomeMain } from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const disclosure = useDisclosure();
  return (
    <BaseComponent className="main">
      <LeftMenu />
      <HomeMain>
        <PostComment disclosure={disclosure} />
        <HomeHeader />
        <FeedTweets disclosure={disclosure} />
      </HomeMain>
      <RightMenu />
    </BaseComponent>
  );
};

export default Home;
