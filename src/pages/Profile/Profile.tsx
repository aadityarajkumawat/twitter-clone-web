import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Back,
  CoverImageContainer,
  EditProfileBtn,
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
  useGetPaginatedUserTweetsQuery,
  useGetProfileQuery,
  useGetTweetsByUserFQuery,
  useMeQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import {
  InfiniteScrolling,
  PaginationParams,
  TweetType,
} from "../../constants/interfaces";
import { useStore } from "../../zustand/store";
import Axios from "axios";
import { EditProfile } from "../../components/edit-profile/EditProfile";

interface ProfileProps {}
export const Profile: React.FC<ProfileProps> = () => {
  const [{ data: user, fetching: fetchingUser }, refetchUser] = useMeQuery();
  const [
    { data: profile, fetching: fetchingProfile },
    refetchProfile,
  ] = useGetProfileQuery();
  const [
    { data: userTweets, fetching: fetchingUserTweets },
    refetchTweets,
  ] = useGetTweetsByUserFQuery();

  const editProfile = useStore((state) => state.editProfile);
  const toggleEditProfile = useStore((state) => state.toggleEditProfile);

  useEffect(() => {
    refetchUser({ requestPolicy: "network-only" });
    refetchProfile({ requestPolicy: "network-only" });
    refetchTweets({ requestPolicy: "network-only" });
  }, []);

  useEffect(() => {
    refetchUser({ requestPolicy: "network-only" });
    refetchProfile({ requestPolicy: "network-only" });
    refetchTweets({ requestPolicy: "network-only" });
  }, [editProfile]);

  const [more, setMore] = useState<Array<TweetType>>([]);
  const [pag, setPag] = useState<PaginationParams>({ offset: 0, limit: -1 });

  const [{ data }] = useGetPaginatedUserTweetsQuery({
    variables: pag,
  });

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 1,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;

  const getMore = () => {
    if (userTweets?.getTweetsByUserF) {
      if (pag.offset === userTweets.getTweetsByUserF.num) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }
      setPag({
        limit: 1,
        offset: 7 + scrollProps.dataLength,
      });
      if (data && data.getPaginatedUserTweets) {
        if (data.getPaginatedUserTweets.tweets.length === 1) {
          // @ts-ignore
          setMore((prev) => [...prev, data.getPaginatedUserTweets.tweets[0]]);
        }
      }
      setScrollProps((prev) => ({
        ...prev,
        dataLength: prev.dataLength + 1,
      }));
    }
  };

  return (
    <Fragment>
      <ProfileContainer>
        {editProfile && (
          <EditProfile
            bio={
              profile && !fetchingProfile
                ? profile.getUserProfile.profile.bio
                : ""
            }
            link={
              profile && !fetchingProfile
                ? profile.getUserProfile.profile.link
                : "#"
            }
          />
        )}
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
            <EditProfileBtn
              title="Edit Profile"
              onClick={() =>
                editProfile ? toggleEditProfile(false) : toggleEditProfile(true)
              }
            >
              <span title="Edit Profile"></span>
              <span className="mm" title="Edit Profile"></span>
              <span title="Edit Profile"></span>
            </EditProfileBtn>
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
