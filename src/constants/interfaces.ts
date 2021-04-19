import {
  GetTweetsByUserFQuery,
  GetTweetsByUserQuery,
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
