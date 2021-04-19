import React, { Fragment, useReducer } from "react";
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
  useMeQuery,
  useProfileStuffAndUserTweetsQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import { ProfileProperties, ProfileState } from "../../constants/interfaces";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { getMoreUserPosts } from "../../helpers/getMore";
import { profileReducer } from "../../reducers/profileReducer";
import { Box, Flex } from "@chakra-ui/layout";
import { getTweetProps } from "../../helpers";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const initialState: ProfileState = {
    more: [],
    offset: 0,
    scrollProps: { dataLength: 3, hasMore: true },
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const context = useReducer(profileReducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const id = !fetchingUser && user ? user.me.user.id : -1;

  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useProfileStuffAndUserTweetsQuery({ variables: { id } });

  const [{ data: followUser }, follow] = useFollowAUserMutation();

  const paginationProps = { profile: profileObj, state, dispatch };

  const getProfileValByKey = (key: ProfileProperties, fallback: string) => {
    if (!fetchingProfile && profileObj) {
      const profile = profileObj.profileStuffAndUserTweets.profile;
      const val = profile[key];

      return val.toString();
    }
    return fallback;
  };

  return (
    <Fragment>
      <ProfileContainer>
        <Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <S.LeftMenu>
          <LeftMenu />
        </S.LeftMenu>
        <S.HomeMain>
          <ProfileNav>
            <Back>
              <BackSVG />
            </Back>
            <ProfileInfo>
              <Flex flexDir="column">
                <b>{getProfileValByKey("name", "")}</b>
                <span>
                  {getProfileValByKey("num", "0")}
                  {" Tweets"}
                </span>
              </Flex>
            </ProfileInfo>
          </ProfileNav>
          <CoverImageContainer>
            <ImgContainer>
              <img src={getProfileValByKey("cover_img", "")} />
            </ImgContainer>
            <ProfileImgContainer>
              <img src={getProfileValByKey("profile_img", "")} />
            </ProfileImgContainer>
            <EditProfileBtn title="Edit Profile" onClick={onOpen}>
              <span title="Edit Profile"></span>
              <span className="mm" title="Edit Profile"></span>
              <span title="Edit Profile"></span>
            </EditProfileBtn>
          </CoverImageContainer>
          {!fetchingProfile && profileObj ? (
            <MoreInfo>
              <b>{getProfileValByKey("name", "")}</b>
              <p className="username">@{getProfileValByKey("username", "")}</p>
              <p className="bio">{getProfileValByKey("bio", "")}</p>
              <p className="link">
                <a href={getProfileValByKey("link", "")}>
                  {getProfileValByKey("link", "")}
                </a>
              </p>
              <Follows>
                <span>
                  {getProfileValByKey("following", "0")}
                  <span className="faded"> Following</span>
                </span>
                <span>
                  {getProfileValByKey("followers", "0")}
                  <span className="faded"> Followers</span>
                </span>
                {/* {e_id !== user?.me?.user.id && e_id !== undefined && (
                  <FollowBtn
                    onClick={async () => await follow({ thatUser: e_id })}
                  >
                    {followUser && followUser.followAUser.followed
                      ? "Unfollow"
                      : "Follow"}
                  </FollowBtn>
                )} */}
              </Follows>
            </MoreInfo>
          ) : (
            <LoadingSpinner />
          )}

          <div
            style={{
              borderBottom: "1px solid #eeeeee20",
              width: "100%",
              height: "0px",
            }}
          ></div>

          {!fetchingProfile && profileObj ? (
            <Fragment>
              <Fragment>
                {profileObj.profileStuffAndUserTweets.tweets.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>

              <InfiniteScroll
                dataLength={state.scrollProps.dataLength}
                hasMore={
                  profileObj.profileStuffAndUserTweets.profile.num > 5
                    ? state.scrollProps.hasMore
                    : false
                }
                next={() => getMoreUserPosts(paginationProps)}
                loader={<LoadingSpinner />}
              >
                <Fragment>
                  {state.more.map((tweet) => (
                    <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                  ))}
                </Fragment>
              </InfiniteScroll>
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}

          <Box my="30px"></Box>
        </S.HomeMain>
        <S.RightMenu>
          <RightMenu />
        </S.RightMenu>
      </ProfileContainer>
    </Fragment>
  );
};
