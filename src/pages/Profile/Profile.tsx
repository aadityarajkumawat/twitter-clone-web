import React, { Fragment, useReducer } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileContainer } from "./profile.styles";
import * as S from "../../pages/home.styles";
import { LeftMenu } from "../../components/left-menu/LeftMenu";
import {
  useMeQuery,
  useGetUserByUsernameQuery,
  useGetTweetsByUserFQuery,
} from "../../generated/graphql";
import Tweet from "../../components/tweet/Tweet";
import { ProfileRouteParams, ProfileState } from "../../constants/interfaces";
import { RightMenu } from "../../components/right-menu/RightMenu";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { profileReducer } from "../../reducers/profileReducer";
import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { EditProfile } from "../../components/edit-profile/EditProfile";
import { useParams } from "react-router";
import { UserProfile } from "../../components/user-profile/UserProfile";
import {
  decideAndReturnCorrectId,
  getTweetProps,
  getMoreUserPosts,
} from "../../helpers";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = (): JSX.Element => {
  const initialState: ProfileState = {
    more: [],
    offset: 0,
    scrollProps: { dataLength: 3, hasMore: true },
  };

  const { username } = useParams<ProfileRouteParams>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const context = useReducer(profileReducer, initialState);
  const [state, dispatch] = context;

  const [{ data: user, fetching: fetchingUser }] = useMeQuery();
  const [{ data: nUser, fetching: fetchingNUser }] = useGetUserByUsernameQuery({
    variables: { username },
  });

  const { id } = decideAndReturnCorrectId(
    { fetchingUser, user },
    { fetchingNUser, nUser },
    username
  );

  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useGetTweetsByUserFQuery({ variables: { id } });

  const paginationProps = { profile: profileObj, state, dispatch };

  return (
    <Fragment>
      <ProfileContainer>
        <EditProfile onClose={onClose} isOpen={isOpen} id={id} />
        <LeftMenu />
        <S.HomeMain>
          <UserProfile onOpen={onOpen} />
          {!fetchingProfile && profileObj ? (
            <Fragment>
              <Fragment>
                {profileObj.getTweetsByUserF.tweets.map((tweet) => (
                  <Tweet {...getTweetProps(tweet)} key={tweet.tweet_id} />
                ))}
              </Fragment>

              <InfiniteScroll
                dataLength={state.scrollProps.dataLength}
                hasMore={
                  profileObj.getTweetsByUserF.num > 5
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
        <RightMenu />
      </ProfileContainer>
    </Fragment>
  );
};
