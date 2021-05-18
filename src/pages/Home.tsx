import React from "react";
import { FeedTweets } from "../components/feed-tweets/FeedTweets";
import { HomeHeader } from "../components/home-header/HomeHeader";
import { PostComment } from "../components/post-comment/PostComment";
import { BaseComponent, HomeMain } from "./home.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <BaseComponent className="main">
            <HomeMain>
                <PostComment />
                <HomeHeader />
                <FeedTweets />
            </HomeMain>
        </BaseComponent>
    );
};

export default Home;
