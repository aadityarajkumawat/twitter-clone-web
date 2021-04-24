import React from "react";
import { OperationContext, UseQueryResponse } from "urql";
import {
  GetTweetsByUserQuery,
  GetUserByUsernameQuery,
  MeQuery,
  ProfileItems,
  ProfileStuffAndUserTweetsQuery,
} from "../generated/graphql";

export type FileEvent = React.ChangeEvent<HTMLInputElement> | null;

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
  rel_acc: number;
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
  profile: ProfileStuffAndUserTweetsQuery | undefined;
  dispatch: React.Dispatch<ProfileAction>;
};

export type ProfileState = {
  more: Array<TweetType>;
  offset: number;
  scrollProps: InfiniteScrolling;
};

export type ProfileAction =
  | { type: "more"; moreTweets: Array<TweetType> }
  | { type: "offset"; updatedOffset: number }
  | { type: "scroll"; updatedScroll: InfiniteScrolling };

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
