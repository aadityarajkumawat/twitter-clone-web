import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import Tweet, { TweetProps } from "../components/tweet/Tweet";
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
  GetPaginatedPostsDocument,
  GetPaginatedPostsQuery,
  GetPaginatedPostsQueryVariables,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import * as S from "./home.styles";
import Axios from "axios";
import { RightMenu } from "../components/right-menu/RightMenu";
import { AttachImage } from "../assets/AttachImage";
import { cli } from "../index";
import { getTweetProps } from "../utils/reshapeTweetType";
import { ImageURI } from "../constants/urls";
import { Flex, Spinner } from "@chakra-ui/react";

interface HomeProps {}
type FileEvent = React.ChangeEvent<HTMLInputElement> | null;

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");

  const [realTime, setRealTime] = useState<Array<TweetType>>([]);

  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [{ data: realTimePost }] = useListenTweetsSubscription();

  const [{ data: user }] = useMeQuery();

  const [
    { data: profileImage, fetching: fetchingProfileImage },
  ] = useGetProfileImageQuery({
    variables: { id: user && user.me ? user.me?.id : -1 },
  });

  const [more, setMore] = useState<Array<TweetType>>([]);
  const [pag, setPag] = useState<PaginationParams>({ offset: 0 });
  const [feedProgress, setFeedProgress] = useState<number>(1);
  const [files, setFiles] = useState<FileEvent>(null);

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 3,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;

  const getMore = async (postLimit = 3) => {
    if (feed && feed.getTweetsByUser) {
      if (pag.offset === feed.getTweetsByUser.num + realTime.length) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }

      const phew = await cli
        .query<GetPaginatedPostsQuery, GetPaginatedPostsQueryVariables>(
          GetPaginatedPostsDocument,
          {
            limit: postLimit,
            offset: 7 + dataLength + realTime.length - postLimit,
          }
        )
        .toPromise();

      if (phew && phew.data && phew.data.getPaginatedPosts) {
        const s = phew.data.getPaginatedPosts.tweets;
        if (s) {
          setMore((prev) => [...prev, ...s]);
        }

        setPag({
          offset: 7 + dataLength + realTime.length - postLimit + s.length,
        });

        setScrollProps((prev) => ({
          ...prev,
          dataLength: prev.dataLength + s.length,
        }));
      }
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
                  onChange={(e) => setTweetInput(e.target.value)}
                  value={tweetInput}
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
                    handleFileAndUpload(setFeedProgress, files);
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
                <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
              ))}
            </Fragment>
          )}
          {!fetchingFeed && feed?.getTweetsByUser && (
            <InfiniteScroll
              dataLength={dataLength}
              hasMore={feed.getTweetsByUser.num > 7 ? hasMore : false}
              next={getMore}
              loader={
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  mt="50px"
                  overflowY="hidden"
                >
                  <Spinner />
                </Flex>
              }
            >
              <Fragment>
                {more.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>
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
