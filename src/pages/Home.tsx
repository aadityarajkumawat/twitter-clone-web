import React from "react";
import { FeedTweets } from "../components/feed-tweets/FeedTweets";
import { HomeHeader } from "../components/home-header/HomeHeader";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { PostComment } from "../components/post-comment/PostComment";
import { RightMenu } from "../components/right-menu/RightMenu";
import { BaseComponent, HomeMain } from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <BaseComponent className="main">
            <LeftMenu />
            <HomeMain>
                <PostComment />
                <HomeHeader />
                <FeedTweets />
            </HomeMain>
            <RightMenu />
        </BaseComponent>
    );
};

export default Home;
