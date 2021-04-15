import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet from "../components/tweet/Tweet";
import {
  InfiniteScrolling,
  PaginationParams,
  TweetType,
} from "../constants/interfaces";
import {
  useCreateTweetMutation,
  useGetPaginatedPostsQuery,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useMeQuery,
  useGetProfileImageQuery,
  useSaveImageMutation,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import * as S from "./home.styles";
import Axios from "axios";
import { RightMenu } from "../components/right-menu/RightMenu";
import { AttachImage } from "../assets/AttachImage";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Posting a tweet mutation
  const [, postTweet] = useCreateTweetMutation();
  // Tweet input field
  const [tweetInput, setTweetInput] = useState<string>("");

  // localstate of realtime-tweets and more-fetched tweets
  const [realTime, setRealTime] = useState<Array<TweetType>>([]);

  // Fetching user-feed
  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  // Listening to realtime tweets
  const [{ data: realTimePost }] = useListenTweetsSubscription();

  const [{ data: user }] = useMeQuery();

  const [
    { data: profileImage, fetching: fetchingProfileImage },
    // @ts-ignore
  ] = useGetProfileImageQuery({ variables: { id: user?.me?.id } });

  const [more, setMore] = useState<Array<TweetType>>([]);
  const [pag, setPag] = useState<PaginationParams>({ offset: 0, limit: -1 });
  const [feedProgress, setFeedProgress] = useState<number>(1);
  const [files, setFiles] = useState<any>(null);

  const [{ data, fetching: f }] = useGetPaginatedPostsQuery({
    variables: pag,
  });

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 1,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;

  console.log(pag, data);

  const getMore = async () => {
    if (feed && feed.getTweetsByUser) {
      if (
        pag.offset ===
        feed.getTweetsByUser.num + (realTime ? realTime.length : 0)
      ) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }

      setPag({
        limit: 1,
        offset:
          7 + scrollProps.dataLength + (realTime ? realTime.length : 0) - 1,
      });

      const s = new Promise((resolve, _) => {});

      await s;

      if (data) {
        if (data.getPaginatedPosts.tweets.length >= 1) {
          // @ts-ignore
          setMore((prev) => [...prev, data.getPaginatedPosts.tweets[0]]);
        }
      }
      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + 1,
      }));
    }
  };

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

  const handleFile = async (
    fn: (value: React.SetStateAction<number>) => void,
    e: any
  ) => {
    const formData = new FormData();
    if (e) {
      if (e.target.files) {
        formData.append("image", e.target.files[0]);

        try {
          const r = await Axios.post(
            "https://api.imgbb.com/1/upload?key=2db0d9c5d05935a5409a79e77d415b70",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (p) => {
                fn((p.loaded * 100) / p.total);
              },
            }
          );
          await postTweet({
            tweet_content: tweetInput,
            img: r.data.data.display_url,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      await postTweet({ tweet_content: tweetInput, img: "" });
    }
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

  return (
    <S.BaseComponent className="main">
      <S.LeftMenu>
        <LeftMenu />
      </S.LeftMenu>
      <S.HomeMain>
        <S.FeedHeader>
          {feedProgress !== 100 && feedProgress !== 1 && (
            <S.ProgressBar>
              <S.Progress style={{ width: `${feedProgress}%` }}></S.Progress>
            </S.ProgressBar>
          )}

          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage
                src={
                  !fetchingProfileImage && profileImage?.getProfileImage
                    ? profileImage!.getProfileImage
                    : ""
                }
              />
            </S.ProfileImageInc>
            <S.MTweet>
              <S.TweetInput>
                <S.TweetInputField
                  placeholder="What's Happening?"
                  onBlur={(e) => setTweetInput(e.target.value)}
                />
              </S.TweetInput>
              <S.EditTweetOptions>
                <S.TweetAc>
                  <S.UploadI>
                    <AttachImage />
                    <input type="file" onChange={(e) => getFile(e)} />
                  </S.UploadI>
                </S.TweetAc>
                <S.TweetButton
                  onClick={async () => {
                    handleFile(setFeedProgress, files);
                    setTweetInput(() => "");
                  }}
                >
                  Tweet
                </S.TweetButton>
              </S.EditTweetOptions>
            </S.MTweet>
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && feed && (
            <Fragment>
              {[...realTime, ...feed!.getTweetsByUser.tweets].map((tweet) => (
                <Tweet
                  tweet_id={tweet.tweet_id}
                  tweet_content={tweet.tweet_content}
                  name={tweet.name}
                  comments={tweet.comments}
                  username={tweet.username}
                  key={tweet.tweet_id}
                  img={tweet.profile_img}
                  captain={tweet.img}
                />
              ))}
            </Fragment>
          )}
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={hasMore}
            next={getMore}
            loader={<h4>loading...</h4>}
          >
            <Fragment>
              {more
                .filter((t) => t !== undefined)
                .map((tweet) => (
                  <Tweet
                    tweet_id={tweet.tweet_id}
                    tweet_content={tweet.tweet_content}
                    name={tweet.name}
                    comments={tweet.comments}
                    username={tweet.username}
                    key={tweet.tweet_id}
                    img={tweet.profile_img}
                    captain={tweet.img}
                  />
                ))}
            </Fragment>
          </InfiniteScroll>

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
