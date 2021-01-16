import React, { Fragment, useEffect, useRef, useState } from "react";
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

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  const [realTime, setRealTime] = useState<Array<any>>([]);

  const [{ data: feed, fetching: fetchingFeed }] = useGetTweetsByUserQuery();
  const [
    { data: realTimePost, fetching: fetchingRealTimePost },
  ] = useListenTweetsSubscription();

  const [{ data }] = useGetPaginatedPostsQuery({
    variables: { limit: -1, offset: 0 },
  });

  const [count, setCount] = useState<number>(0);

  const p = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (realTimePost && feed) {
      if (
        !tweetAlreadyExist(
          [],
          feed?.getTweetsByUser.tweets,
          realTime,
          realTimePost.listenTweets.tweet!.tweet_id
        )
      )
        setRealTime((prev) => [...prev, realTimePost.listenTweets.tweet]);
    }
  }, [realTimePost?.listenTweets.tweet?.tweet_id]);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (p.current?.getBoundingClientRect) {
  //       if (
  //         p.current?.getBoundingClientRect().bottom - window.innerHeight ===
  //         0
  //       ) {
  //         console.log("haha");
  //       }
  //     }
  //   });
  // }, []);

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
          <S.Plac ref={p} onClick={() => setCount((prev) => prev + 1)}></S.Plac>
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
