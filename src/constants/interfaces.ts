import React from "react";
import { UseQueryResponse } from "urql";
import {
  GetTweetsByUserFQuery,
  GetTweetsByUserQuery,
  GetUserByUsernameQuery,
  MeQuery,
  ProfileItems,
} from "../generated/graphql";

export type FileEvent = React.ChangeEvent<HTMLInputElement> | null;
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type UseStateReturn<T> = [T, SetState<T>];

export interface PaginationParams {
  offset: number;
}

export interface InfiniteScrolling {
  hasMore: boolean;
  dataLength: number;
}

export interface TweetType {
  comments: number;
  created_At: string;
  liked: boolean;
  likes: number;
  name: string;
  tweet_content: string;
  tweet_id: number;
  username: string;
  _type: string;
  profile_img: string;
  img: string;
}

export interface UploadTweetImage {
  img: string | null;
  error: string | null;
}

export type HomeState = {
  more: Array<TweetType>;
  pag: { offset: number };
  realTime: Array<TweetType>;
  feedProgress: number;
  files: FileEvent;
  scrollProps: InfiniteScrolling;
  tweetInput: string;
  subscribed: boolean;
};

export type HomeAction =
  | { type: "more"; moreTweets: Array<TweetType> }
  | { type: "pag"; updatedPag: PaginationParams }
  | { type: "scroll"; updatedScroll: InfiniteScrolling }
  | { type: "rl"; updatedRL: Array<TweetType> }
  | { type: "prog"; updatedProg: number }
  | { type: "file"; updatedFile: FileEvent }
  | { type: "tweet"; updatedInp: string }
  | { type: "sub"; connection: boolean };

export type PaginationProps = {
  state: HomeState;
  feed: GetTweetsByUserQuery | undefined;
  dispatch: React.Dispatch<HomeAction>;
};

export type PaginationPropsProfile = {
  state: ProfileState;
  profile: GetTweetsByUserFQuery | undefined;
  dispatch: React.Dispatch<ProfileAction>;
};

export type ProfileState = {
  more: Array<TweetType>;
  offset: number;
  scrollProps: InfiniteScrolling;
  realTime: Array<TweetType>;
};

export type ProfileAction =
  | { type: "more"; moreTweets: Array<TweetType> }
  | { type: "offset"; updatedOffset: number }
  | { type: "scroll"; updatedScroll: InfiniteScrolling }
  | { type: "rt"; realTimePosts: Array<TweetType> };

export type ProfileProperties =
  | "username"
  | "profile_img"
  | "cover_img"
  | "name"
  | "bio"
  | "link"
  | "followers"
  | "following"
  | "num"
  | "isFollowed";

export interface EditProfileI {
  bio: string;
  link: string;
}

export interface EditProfileProps {
  onClose: () => void;
  isOpen: boolean;
  id: number;
  setRefreshToken: SetState<string>;
}

export type EditImagesI = {
  profile_img: FileList | null;
  cover_img: FileList | null;
};

export type EditProfileState = {
  form: EditProfileI;
  images: EditImagesI;
  savingProgress: number;
};

export type EditProfileAction =
  | { type: "form"; updatedForm: EditProfileI }
  | { type: "saving"; updatedProgress: number }
  | { type: "image"; updatedImages: EditImagesI };

export type ProfileType = {
  __typename?: "ProfileItems" | undefined;
} & Pick<ProfileItems, ProfileProperties>;

export type EditProfileContext = [
  EditProfileState,
  React.Dispatch<EditProfileAction>
];

export type HandleFileF = (
  context: EditProfileContext,
  saveImg: (o: any) => Promise<any>,
  save: (o: { bio: string; link: string }) => Promise<any>
) => Promise<void>;

export interface HomeActionFn {
  setFeedProgress: (n: number) => void;
  setFile: (e: FileEvent) => void;
  setTweetInput: (input: string) => void;
  pushTweetToFeed: (tweet: TweetType | null | undefined) => void;
}

export type HomeContextType = {
  state: HomeState;
  HomeActionFn: HomeActionFn;
  dispatch: React.Dispatch<HomeAction>;
};

export type MeParam = {
  fetchingUser: UseQueryResponse<MeQuery, object>[0]["fetching"];
  user: UseQueryResponse<MeQuery, object>[0]["data"];
};

export type NUserParam = {
  fetchingNUser: UseQueryResponse<
    GetUserByUsernameQuery,
    object
  >[0]["fetching"];
  nUser: UseQueryResponse<GetUserByUsernameQuery, object>[0]["data"];
};

export type DecideAndReturnCorrectId = (
  cU: MeParam,
  nU: NUserParam,
  username: string
) => { id: number; isLoggedUser: boolean };

export interface ProfileRouteParams {
  username: string;
}

export interface FollowInfoState {
  followers: number;
  following: number;
  isFollowed: boolean;
}
export interface OpenTweetRouteParams {
  username: string;
  tweet_id: string;
}

export type UserProfileType = {
  cover_img: string;
  profile_img: string;
  name: string;
  username: string;
  bio: string;
  link: string;
};

export interface AppContextState {
  loggedUserProfile: UserProfileType | undefined;
}

export interface AppContextI extends AppContextState {
  setUserProfile: (profile: UserProfileType) => void;
}

export type AppContextAction = {
  type: "user-profile";
  profile: UserProfileType;
};

export type TweetDataForComment = Omit<
  TweetType,
  "comments" | "created_At" | "liked" | "likes"
>;
