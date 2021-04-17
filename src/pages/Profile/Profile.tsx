import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Back,
  CoverImageContainer,
  EditProfileBtn,
  FollowBtn,
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
import {
  useFollowAUserMutation,
  useGetProfileStuffQuery,
  useGetTweetsByUserFQuery,
  useMeQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import { InfiniteScrolling, TweetType } from "../../constants/interfaces";
import { useStore } from "../../zustand/store";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { getMoreUserPosts } from "../../utils/getMore";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const e_id = useStore((s) => s.curr);

  useEffect(() => {
    setMore([]);
    setPag({ offset: 0 });
    setScrollProps({ dataLength: 1, hasMore: true });
  }, [e_id]);

  const [
    { data: profile, fetching: fetchingProfile },
  ] = useGetProfileStuffQuery({
    variables: {
      id: 1,
    },
  });

  const [{ data: followUser }, follow] = useFollowAUserMutation();

  const [
    { data: userTweets, fetching: fetchingUserTweets },
    refetchTweets,
  ] = useGetTweetsByUserFQuery({
    variables: { id: 1 },
  });

  const editProfile = useStore((state) => state.editProfile);
  const toggleEditProfile = useStore((state) => state.toggleEditProfile);

  useEffect(() => {
    refetchTweets({ requestPolicy: "network-only" });
  }, [editProfile]);

  const [more, setMore] = useState<TweetType[]>([]);
  const [pag, setPag] = useState<{ offset: number }>({
    offset: 0,
  });

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 1,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;
  const paginationFunctions = { setMore, setPag, setScrollProps };

  useEffect(() => {
    console.log(followUser);
  }, [followUser?.followAUser.followed]);

  return (
    <Fragment>
      {/* <ProfileContainer>
        {editProfile && (
          <EditProfile
            bio={
              profile && !fetchingProfile
                ? profile.getProfileStuff.profile.bio
                : ""
            }
            link={
              profile && !fetchingProfile
                ? profile.getProfileStuff.profile.link
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
              <b>
                {profile && !fetchingProfile
                  ? profile.getProfileStuff.profile.name
                  : ""}
              </b>
              <span>
                {profile && !fetchingProfile
                  ? profile.getProfileStuff.profile.num
                  : 0}{" "}
                Tweets
              </span>
            </ProfileInfo>
          </ProfileNav>
          <CoverImageContainer>
            <ImgContainer>
              <img
                src={
                  profile && !fetchingProfile
                    ? profile.getProfileStuff.profile.cover_img
                    : ""
                }
              />
            </ImgContainer>
            <ProfileImgContainer>
              <img
                src={
                  !fetchingProfile && profile
                    ? profile.getProfileStuff.profile.profile_img
                    : ""
                }
              />
            </ProfileImgContainer>
            {(e_id === user?.me?.user.id || e_id === undefined) && (
              <EditProfileBtn
                title="Edit Profile"
                onClick={(e) =>
                  editProfile
                    ? toggleEditProfile(false)
                    : toggleEditProfile(true)
                }
              >
                <span title="Edit Profile"></span>
                <span className="mm" title="Edit Profile"></span>
                <span title="Edit Profile"></span>
              </EditProfileBtn>
            )}
          </CoverImageContainer>
          <MoreInfo>
            <b>
              {profile && !fetchingProfile
                ? profile.getProfileStuff.profile.name
                : ""}
            </b>
            <p className="username">
              @
              {profile && !fetchingProfile
                ? profile.getProfileStuff.profile.username
                : ""}
            </p>
            <p className="bio">
              {profile && !fetchingProfile
                ? profile.getProfileStuff.profile.bio
                : ""}
            </p>
            <p className="link">
              <a
                href={
                  profile && !fetchingProfile
                    ? profile.getProfileStuff.profile.link
                    : "#"
                }
              >
                {profile && !fetchingProfile
                  ? profile.getProfileStuff.profile.link
                  : ""}
              </a>
            </p>
            <Follows>
              <span>
                {profile && !fetchingProfile
                  ? profile!.getProfileStuff.profile.following
                  : ""}
                <span className="faded"> Following</span>
              </span>
              <span>
                {profile && !fetchingProfile
                  ? profile.getProfileStuff.profile.followers
                  : ""}
                <span className="faded"> Followers</span>
              </span>
              {e_id !== user?.me?.id && e_id !== undefined && (
                <FollowBtn
                  onClick={async () => await follow({ thatUser: e_id })}
                >
                  {followUser && followUser.followAUser.followed
                    ? "Unfollow"
                    : "Follow"}
                </FollowBtn>
              )}
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
                  img={tweet.profile_img}
                  captain={tweet.img}
                />
              ))
            ) : (
              <h4>Loading...</h4>
            )}
          </Fragment>
          {!fetchingUserTweets && userTweets && (
            <InfiniteScroll
              dataLength={dataLength}
              hasMore={userTweets.getTweetsByUserF.num > 5 ? hasMore : false}
              next={() =>
                getMoreUserPosts(
                  userTweets,
                  pag,
                  dataLength,
                  user,
                  paginationFunctions
                )
              }
              loader={<LoadingSpinner />}
            >
              <Fragment>
                {more.map((tweet) => (
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
          )}
        </S.HomeMain>
        <S.RightMenu>
          <RightMenu />
        </S.RightMenu>
      </ProfileContainer> */}
    </Fragment>
  );
};
