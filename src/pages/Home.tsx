import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Tweet from "../components/tweet/Tweet";
import { me } from "../constants/urls";
import {
  useCreateTweetMutation,
  useGetTweetsByUserQuery,
  useListenTweetsSubscription,
  useGetPaginatedPostsQuery,
} from "../generated/graphql";
import * as S from "./home.styles";
import { tweetAlreadyExist } from "../helpers/tweetAlreadyExist";

interface HomeProps {}

interface TweetItem {
  comments: number;
  created_At: string;
  liked: boolean;
  likes: number;
  name: string;
  rel_acc: number;
  tweet_content: string;
  tweet_id: number;
  username: string;
  _type: string;
}

interface PaginationParams {
  offset: number;
  limit: number;
}

const Home: React.FC<HomeProps> = () => {
  const [, postTweet] = useCreateTweetMutation();
  const [tweetInput, setTweetInput] = useState<string>("");
  // First fetched tweets
  const [
    { data: tweets, fetching: fetchingTweets },
  ] = useGetTweetsByUserQuery();
  // Realtime added tweets state
  const [realTimeAdded, setRealTimeAdded] = useState<Array<TweetItem>>([]);
  // More loaded tweets state
  const [morePosts, setMorePosts] = useState<Array<TweetItem>>([]);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    limit: -1,
    offset: 0,
  });
  const [k, setK] = useState<number>(0);
  // Fetching realtime tweets
  const [{ data: realtimePosts }] = useListenTweetsSubscription();
  // Fetching more tweets
  const [
    { data: loadedPosts, fetching: fetchingMorePosts },
  ] = useGetPaginatedPostsQuery({ variables: paginationParams });

  const bot = useRef<HTMLDivElement | null>(null);
  console.log(bot.current);

  const loadMorePosts = (l: number) => {
    let currentNumberOfPosts =
      realTimeAdded.length +
      (tweets ? tweets!.getTweetsByUser.tweets.length : 0) +
      l;

    console.log(currentNumberOfPosts);
    setPaginationParams((prev) => ({
      ...prev,
      limit: 2,
      offset: currentNumberOfPosts,
    }));
  };

  useEffect(() => {
    let options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    let oo = new IntersectionObserver((enteries) => {
      if (enteries[0].isIntersecting) {
        loadMorePosts(morePosts.length);
      }
    }, options);

    if (bot.current) {
      // @ts-ignore
      oo.observe(bot.current);
    }
  }, [bot.current, morePosts.length]);

  useEffect(() => {
    if (realtimePosts?.listenTweets.tweet?.tweet_id) {
      const newTweet = realtimePosts.listenTweets.tweet;
      const idOfThisTweet = newTweet.tweet_id;
      let found = tweetAlreadyExist(
        tweets!.getTweetsByUser.tweets,
        realTimeAdded,
        morePosts,
        idOfThisTweet
      );
      if (!found) {
        setRealTimeAdded((prev) => [newTweet, ...prev]);
      }
    }
    //eslint-disable-next-line
  }, [realtimePosts?.listenTweets.tweet?.tweet_id]);

  useEffect(() => {
    if (loadedPosts) {
      let moreP = loadedPosts.getPaginatedPosts.tweets;
      moreP = moreP.slice(moreP.length - 2, moreP.length);
      setK((prev) => prev + 2);
      setMorePosts((prev) => [...prev, ...moreP]);
    }
    //eslint-disable-next-line
  }, [JSON.stringify(loadedPosts?.getPaginatedPosts.tweets)]);

  return (
    <S.BaseComponent>
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
          {realTimeAdded.length > 0 && (
            <Fragment>
              {realTimeAdded.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          )}
          {!fetchingTweets ? (
            <Fragment>
              {tweets!.getTweetsByUser.tweets.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>Loading...</Fragment>
          )}
          {!fetchingMorePosts ? (
            <Fragment>
              {morePosts.map((tweet) => (
                <Tweet
                  name={tweet.name}
                  tweet_content={tweet.tweet_content}
                  key={tweet.tweet_id}
                  username={tweet.username}
                  comments={tweet.comments}
                  tweet_id={tweet.tweet_id}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>Fetching more posts...</Fragment>
          )}
          {!fetchingTweets && <S.Plac ref={bot}></S.Plac>}
        </S.Tweets>
      </S.HomeMain>
    </S.BaseComponent>
  );
};

export default Home;
