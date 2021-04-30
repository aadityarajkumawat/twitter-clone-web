import React, { useContext, useEffect } from "react";
import { placeholderImg } from "../../constants/urls";
import { HomeContextI } from "../../context/HomeContext";
import { useMeQuery } from "../../generated/graphql";
import {
  CreateTweet,
  FeedHeader,
  IncImage,
  PageName,
  ProfileImageInc,
} from "../../pages/home.styles";
import { ComposeTweet } from "../compose-tweet/ComposeTweet";
import { TopLoader } from "../top-loader/TopLoader";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
  const context = useContext(HomeContextI);

  const { state, HomeActionFn } = context;
  const { setFeedProgress, setFile } = HomeActionFn;

  const [{ data: user, fetching: loadingUser }] = useMeQuery();

  useEffect(() => {
    if (state.feedProgress === 100) {
      setFeedProgress(0);
      setFile(null);
    }
    // eslint-disable-next-line
  }, [state.feedProgress]);

  return (
    <FeedHeader>
      <TopLoader feedProgress={state.feedProgress} />
      <PageName>Home</PageName>
      <CreateTweet>
        <ProfileImageInc>
          <IncImage
            src={!loadingUser && user ? user.me.user.img : placeholderImg}
          />
        </ProfileImageInc>
        <ComposeTweet tweetInput={state.tweetInput} files={state.files} />
      </CreateTweet>
    </FeedHeader>
  );
};
