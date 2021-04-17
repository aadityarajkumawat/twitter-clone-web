import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet from "../components/tweet/Tweet";
import {
  FileEvent,
  InfiniteScrolling,
  PaginationParams,
  TweetType,
} from "../constants/interfaces";
import {
  GetTweetsByUserQuery,
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useMeQuery,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import * as S from "./home.styles";
import Axios from "axios";
import { RightMenu } from "../components/right-menu/RightMenu";
import { getTweetProps } from "../utils/reshapeTweetType";
import { ImageURI, placeholderImg } from "../constants/urls";
import { getMore } from "../utils/getMore";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";
import { ComposeTweet } from "../components/compose-tweet/ComposeTweet";
import { TopLoader } from "../components/top-loader/TopLoader";
import { Box } from "@chakra-ui/layout";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");

  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [{ data: realTimePost }] = useListenTweetsSubscription();

  const [{ data: user, fetching: loadingUser }] = useMeQuery();

  const [more, setMore] = useState<Array<TweetType>>([]);
  const [pag, setPag] = useState<PaginationParams>({ offset: 0 });
  const [realTime, setRealTime] = useState<Array<TweetType>>([]);
  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 3,
    hasMore: true,
  });

  const paginationFunctions = { setMore, setPag, setScrollProps };

  const [feedProgress, setFeedProgress] = useState<number>(1);
  const [files, setFiles] = useState<FileEvent>(null);

  const { dataLength, hasMore } = scrollProps;

  useEffect(() => {
    if (realTimePost && feed) {
      if (
        !tweetAlreadyExist(
          more,
          feed?.getTweetsByUser.tweets,
          realTime,
          realTimePost.listenTweets.tweet!.tweet_id
        ) &&
        realTimePost.listenTweets.tweet
      ) {
        const post = realTimePost.listenTweets.tweet;
        setRealTime((prev) => [post, ...prev]);
      }
    }
  }, [realTimePost?.listenTweets.tweet?.tweet_id]);

  const handleFileAndUpload = async (
    fn: (value: React.SetStateAction<number>) => void,
    e: FileEvent
  ) => {
    if (e && e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        const r = await Axios.post(ImageURI, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (p) => {
            fn((p.loaded * 100) / p.total);
          },
        });
        await postTweet({
          tweet_content: tweetInput,
          img: r.data.data.display_url,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      await postTweet({ tweet_content: tweetInput, img: "" });
    }
    setTweetInput("");
  };

  useEffect(() => {
    if (feedProgress === 100) {
      setFeedProgress(1);
      setFiles(null);
    }
  }, [feedProgress]);

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e);
  };

  const ifHasMore = (hasMore: boolean, feed: GetTweetsByUserQuery): boolean => {
    if (feed.getTweetsByUser.num > 7) return hasMore;
    return false;
  };

  console.log(user);

  return (
    <S.BaseComponent className="main">
      <S.LeftMenu>
        <LeftMenu />
      </S.LeftMenu>
      <S.HomeMain>
        <S.FeedHeader>
          <TopLoader feedProgress={feedProgress} />
          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage
                src={!loadingUser && user ? user.me?.user?.img : placeholderImg}
              />
            </S.ProfileImageInc>
            <ComposeTweet
              getFile={getFile}
              handleFileAndUpload={handleFileAndUpload}
              setTweetInput={setTweetInput}
              setFeedProgress={setFeedProgress}
              tweetInput={tweetInput}
              files={files}
            />
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && feed && (
            <Box>
              {[...realTime, ...feed.getTweetsByUser.tweets].map((tweet) => (
                <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
              ))}
            </Box>
          )}

          {!fetchingFeed && feed?.getTweetsByUser && (
            <InfiniteScroll
              dataLength={dataLength}
              hasMore={ifHasMore(hasMore, feed)}
              next={() =>
                getMore(feed, pag, realTime, dataLength, paginationFunctions)
              }
              loader={<LoadingSpinner />}
            >
              {more.map((tweet) => (
                <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
              ))}
            </InfiniteScroll>
          )}

          <div style={{ height: "50px" }}></div>
        </S.Tweets>
      </S.HomeMain>
      <S.RightMenu>
        <RightMenu />
      </S.RightMenu>
    </S.BaseComponent>
  );
};

export default Home;
