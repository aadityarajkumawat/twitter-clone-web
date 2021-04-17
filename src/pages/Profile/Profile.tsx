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
  GetOneTweet,
  GetPaginatedUserTweetsDocument,
  GetPaginatedUserTweetsQuery,
  GetPaginatedUserTweetsQueryVariables,
  useFollowAUserMutation,
  useGetPaginatedUserTweetsQuery,
  useGetProfileStuffQuery,
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
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { Spinner } from "@chakra-ui/spinner";
import { cli } from "../..";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";

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
    variables: { id: e_id ? e_id : user && !fetchingUser ? user!.me!.id : 20 },
  });

  const [{ data: followUser }, follow] = useFollowAUserMutation();

  const [
    { data: userTweets, fetching: fetchingUserTweets },
    refetchTweets,
  ] = useGetTweetsByUserFQuery({
    variables: { id: e_id ? e_id : user && !fetchingUser ? user!.me!.id : 20 },
  });

  const editProfile = useStore((state) => state.editProfile);
  const toggleEditProfile = useStore((state) => state.toggleEditProfile);

  useEffect(() => {
    refetchTweets({ requestPolicy: "network-only" });
  }, [editProfile]);

  const [more, setMore] = useState<
    ({
      __typename?: "GetOneTweet" | undefined;
    } & Pick<
      GetOneTweet,
      | "username"
      | "name"
      | "tweet_id"
      | "tweet_content"
      | "profile_img"
      | "img"
      | "comments"
    >)[]
  >([]);
  const [pag, setPag] = useState<{ offset: number }>({
    offset: 0,
  });

  // const [{ data }] = useGetPaginatedUserTweetsQuery({
  //   variables: {
  //     ...pag,
  //     id: e_id ? e_id : user && !fetchingUser ? user!.me!.id : 20,
  //   },
  // });

  const [scrollProps, setScrollProps] = useState<InfiniteScrolling>({
    dataLength: 1,
    hasMore: true,
  });

  const { dataLength, hasMore } = scrollProps;

  const getMore = async (
    // feed: GetTweetsByUserQuery | undefined,
    // pag: PaginationParams,
    // realTime: Array<TweetType>,
    // dataLength: number,
    // { setMore, setPag, setScrollProps }: PaginationFunctions,
    postLimit = 3
  ) => {
    if (userTweets && userTweets.getTweetsByUserF) {
      if (pag.offset === userTweets.getTweetsByUserF.num) {
        setScrollProps((prev) => ({ ...prev, hasMore: false }));
        return;
      }

      const phew = await cli
        .query<
          GetPaginatedUserTweetsQuery,
          GetPaginatedUserTweetsQueryVariables
        >(GetPaginatedUserTweetsDocument, {
          limit: postLimit,
          offset: 5 + dataLength - postLimit,
          id: user ? (user.me ? user.me.id : -1) : -1,
        })
        .toPromise();

      if (phew && phew.data && phew.data.getPaginatedUserTweets) {
        const s = phew.data.getPaginatedUserTweets.tweets;
        if (s) {
          setMore((prev) => [...prev, ...s]);
        }

        setPag({
          offset: 5 + dataLength - postLimit + s.length,
        });

        setScrollProps((prev) => ({
          ...prev,
          dataLength: prev.dataLength + s.length,
        }));
      }
    }
  };

  useEffect(() => {
    console.log(followUser);
  }, [followUser?.followAUser.followed]);

  return (
    <Fragment>
      <ProfileContainer>
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
            {(e_id === user?.me?.id || e_id === undefined) && (
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
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={hasMore}
            next={() => getMore()}
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
        </S.HomeMain>
        <S.RightMenu>
          <RightMenu />
        </S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
