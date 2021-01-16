import React, { Fragment, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  ListenTweetsSubscription,
  useCreateTweetMutation,
  useGetPaginatedPostsQuery,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
} from "../generated/graphql";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";
import * as S from "./home.styles";

interface HomeProps {}

interface Pag {
  limit: number;
  offset: number;
}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [realTime, setRealTime] = useState<Array<any>>([]);

  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [
    { data: realTimePost, fetching: fetchingRealTimePost },
  ] = useListenTweetsSubscription();

  const [pag, setPag] = useState<Pag>({ offset: 0, limit: -1 });
  const [sm, setSm] = useState<number>(2);
  const [h, setH] = useState<boolean>(true);

  const [more, setMore] = useState<Array<any>>([]);

  const [{ data }] = useGetPaginatedPostsQuery({
    variables: pag,
  });

  useEffect(() => {
    if (realTimePost && feed) {
      if (
        !tweetAlreadyExist(
          more,
          feed?.getTweetsByUser.tweets,
          realTime,
          realTimePost.listenTweets.tweet!.tweet_id
        )
      )
        setRealTime((prev) => [realTimePost.listenTweets.tweet, ...prev]);
    }
  }, [realTimePost?.listenTweets.tweet?.tweet_id]);

  const getMore = () => {
    if (feed?.getTweetsByUser.num) {
      if (pag.offset === feed.getTweetsByUser.num) {
        setH(false);
        return;
      }
      console.log("kay");
      setPag({ limit: 2, offset: 7 + sm + realTime.length });
      console.log(data);
      if (data) {
        if (
          data!.getPaginatedPosts.tweets[0] &&
          data.getPaginatedPosts.tweets[1]
        ) {
          setMore((prev) => [
            ...prev,
            data!.getPaginatedPosts.tweets[0],
            data!.getPaginatedPosts.tweets[1],
          ]);
        }
      }
      setSm((prev) => prev + 2);
    }
  };

  return (
    <S.BaseComponent onScroll={() => console.log("df")}>
      <S.HomeMain>
        <S.FeedHeader>
          <S.PageName>Home</S.PageName>
          <S.CreateTweet>
            <S.ProfileImageInc>
              <S.IncImage src={me} />
            </S.ProfileImageInc>
            <S.MTweet>
              <S.TweetInput>
                <S.TweetInputField
                  placeholder="What's Happening?"
                  onBlur={(e) => setTweetInput(e.target.value)}
                />
              </S.TweetInput>
              <S.EditTweetOptions>
                <S.TweetAc></S.TweetAc>
                <S.TweetButton
                  onClick={() => postTweet({ tweet_content: tweetInput })}
                >
                  Tweet
                </S.TweetButton>
              </S.EditTweetOptions>
            </S.MTweet>
          </S.CreateTweet>
        </S.FeedHeader>

        <S.Tweets>
          {!fetchingFeed && (
            <Fragment>
              {[...realTime, ...feed!.getTweetsByUser.tweets].map((tweet) => (
                <Tweet
                  tweet_id={tweet.tweet_id}
                  tweet_content={tweet.tweet_content}
                  name={tweet.name}
                  comments={tweet.comments}
                  username={tweet.username}
                  key={tweet.tweet_id}
                />
              ))}
            </Fragment>
          )}
          <InfiniteScroll
            dataLength={sm}
            hasMore={h}
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
                  />
                ))}
            </Fragment>
          </InfiniteScroll>
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
