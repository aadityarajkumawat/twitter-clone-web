import React, { Fragment, useEffect } from "react";
import {
  Back,
  CoverImageContainer,
  Follows,
  ImgContainer,
  MoreInfo,
  ProfileContainer,
  ProfileImgContainer,
  ProfileInfo,
  ProfileNav,
} from "./profile.styles";
import * as S from "../../pages/home.styles";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import { BackSVG } from "../../assets/BackSVG";
import { me } from "../../constants/urls";
import {
  useGetProfileQuery,
  useGetTweetsByUserFQuery,
  useMeQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPaginatedPosts } from "../../hooks/useGetPaginatedPosts";

interface ProfileProps {}
export const Profile: React.FC<ProfileProps> = () => {
  const [{ data: user, fetching: fetchingUser }, refetchUser] = useMeQuery();
  const [
    { data: profile, fetching: fetchingProfile },
    refetchProfile,
  ] = useGetProfileQuery();
  const [
    { data: userTweets, fetching: fetchingUserTweets },
  ] = useGetTweetsByUserFQuery();

  useEffect(() => {
    refetchUser({ requestPolicy: "network-only" });
    refetchProfile({ requestPolicy: "network-only" });
  }, []);

  const { more, dataLength, hasMore, getMore } = useGetPaginatedPosts(
    userTweets
  );

  return (
    <Fragment>
      <ProfileContainer>
        <S.LeftMenu>
          <LeftMenu />
        </S.LeftMenu>
        <S.HomeMain>
          <ProfileNav>
            <Back>
              <BackSVG />
            </Back>
            <ProfileInfo>
              <b>{user && !fetchingUser ? user!.me!.name : ""}</b>
              <span>
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.num
                  : 0}{" "}
                Tweets
              </span>
            </ProfileInfo>
          </ProfileNav>
          <CoverImageContainer>
            <ImgContainer>
              <img src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
            </ImgContainer>
            <ProfileImgContainer>
              <img src={me} />
            </ProfileImgContainer>
          </CoverImageContainer>
          <MoreInfo>
            <b>{user && !fetchingUser ? user!.me!.name : ""}</b>
            <p className="username">
              @{user && !fetchingUser ? user!.me!.username : ""}
            </p>
            <p className="bio">
              {profile && !fetchingProfile
                ? profile.getUserProfile.profile.bio
                : ""}
            </p>
            <p className="link">
              <a
                href={
                  profile && !fetchingProfile
                    ? profile.getUserProfile.profile.link
                    : "#"
                }
              >
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.link
                  : ""}
              </a>
            </p>
            <Follows>
              <span>
                {profile && !fetchingProfile
                  ? profile!.getUserProfile.profile.following
                  : ""}
                <span className="faded"> Following</span>
              </span>
              <span>
                {profile && !fetchingProfile
                  ? profile.getUserProfile.profile.followers
                  : ""}
                <span className="faded"> Followers</span>
              </span>
            </Follows>
          </MoreInfo>

          <Fragment>
            {userTweets && !fetchingUserTweets ? (
              userTweets.getTweetsByUserF.tweets.map((tweet) => (
                <Tweet
                  tweet_id={tweet.tweet_id}
                  tweet_content={tweet.tweet_content}
                  name={tweet.name}
                  comments={tweet.comments}
                  username={tweet.username}
                  key={tweet.tweet_id}
                />
              ))
            ) : (
              <h4>Loading...</h4>
            )}
          </Fragment>
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={hasMore}
            next={getMore}
            loader={
              userTweets ? (
                userTweets.getTweetsByUserF.num >= 5 && <h4>loading...</h4>
              ) : (
                <div></div>
              )
            }
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
        </S.HomeMain>
        <S.RightMenu></S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
