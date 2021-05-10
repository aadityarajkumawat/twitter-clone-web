import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getProfileImage?: Maybe<Scalars['String']>;
  getCoverImage?: Maybe<Scalars['String']>;
  me: MeResponse;
  getProfileStuff: ProfileStuff;
  getUserByUsername: NUserResponse;
  getTweetById: GetTweetResponse;
  getTweetsByUser: GetFeedTweets;
  getPaginatedPosts: GetPaginatedFeedTweets;
  triggerUserTweetsSubscriptions: Scalars['Boolean'];
  getTweetsByUserF: GetUserTweets;
  getPaginatedUserTweets: GetPaginatedUserTweets;
  getUserProfile: GetProfile;
  profileStuffAndUserTweets: ProfileStuffAndUserTweets;
  getComments: GetCommentsResponse;
  getSearchResults: DisplayProfiles;
};


export type QueryGetProfileImageArgs = {
  id: Scalars['Float'];
};


export type QueryGetCoverImageArgs = {
  id: Scalars['Float'];
};


export type QueryGetProfileStuffArgs = {
  id: Scalars['Float'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetTweetByIdArgs = {
  options: GetTweetById;
};


export type QueryGetPaginatedPostsArgs = {
  options: PaginatingParams;
};


export type QueryTriggerUserTweetsSubscriptionsArgs = {
  id: Scalars['Float'];
};


export type QueryGetTweetsByUserFArgs = {
  id: Scalars['Float'];
};


export type QueryGetPaginatedUserTweetsArgs = {
  options: PaginatingUserParams;
};


export type QueryProfileStuffAndUserTweetsArgs = {
  id: Scalars['Float'];
};


export type QueryGetCommentsArgs = {
  args: GetCommentsInput;
};


export type QueryGetSearchResultsArgs = {
  options: Searched;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  user: MeUser;
  error: Scalars['String'];
};

export type MeUser = {
  __typename?: 'MeUser';
  id: Scalars['Float'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  img: Scalars['String'];
};

export type ProfileStuff = {
  __typename?: 'ProfileStuff';
  profile: ProfileItems;
  error: Scalars['String'];
};

export type ProfileItems = {
  __typename?: 'ProfileItems';
  profile_img: Scalars['String'];
  cover_img: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  bio: Scalars['String'];
  link: Scalars['String'];
  followers: Scalars['Float'];
  following: Scalars['Float'];
  num: Scalars['Float'];
  isFollowed: Scalars['Boolean'];
};

export type NUserResponse = {
  __typename?: 'NUserResponse';
  user: NUser;
  error: Scalars['String'];
};

export type NUser = {
  __typename?: 'NUser';
  id: Scalars['Float'];
  username: Scalars['String'];
  name: Scalars['String'];
  img: Scalars['String'];
};

export type GetTweetResponse = {
  __typename?: 'GetTweetResponse';
  tweet?: Maybe<GetOneTweet>;
  error?: Maybe<Scalars['String']>;
};

export type GetOneTweet = {
  __typename?: 'GetOneTweet';
  tweet_id: Scalars['Float'];
  tweet_content: Scalars['String'];
  created_At: Scalars['String'];
  _type: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  likes: Scalars['Float'];
  comments: Scalars['Float'];
  liked: Scalars['Boolean'];
  profile_img: Scalars['String'];
  img: Scalars['String'];
};

export type GetTweetById = {
  tweet_id: Scalars['Float'];
};

export type GetFeedTweets = {
  __typename?: 'GetFeedTweets';
  tweets?: Maybe<Array<GetOneTweet>>;
  error?: Maybe<Scalars['String']>;
  num?: Maybe<Scalars['Float']>;
};

export type GetPaginatedFeedTweets = {
  __typename?: 'GetPaginatedFeedTweets';
  tweets: Array<GetOneTweet>;
  error: Scalars['String'];
};

export type PaginatingParams = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
};

export type GetUserTweets = {
  __typename?: 'GetUserTweets';
  tweets: Array<GetOneTweet>;
  error: Scalars['String'];
  num: Scalars['Float'];
};

export type GetPaginatedUserTweets = {
  __typename?: 'GetPaginatedUserTweets';
  tweets: Array<GetOneTweet>;
  error: Scalars['String'];
};

export type PaginatingUserParams = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
  id: Scalars['Float'];
};

export type GetProfile = {
  __typename?: 'GetProfile';
  profile: Profile;
  error: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  followers: Scalars['Float'];
  following: Scalars['Float'];
  bio: Scalars['String'];
  link: Scalars['String'];
  num: Scalars['Float'];
};

export type ProfileStuffAndUserTweets = {
  __typename?: 'ProfileStuffAndUserTweets';
  profile: ProfileItems;
  tweets: Array<GetOneTweet>;
  error: Scalars['String'];
};

export type GetCommentsResponse = {
  __typename?: 'GetCommentsResponse';
  comments: Array<CommentRespose>;
  error?: Maybe<Scalars['String']>;
};

export type CommentRespose = {
  __typename?: 'CommentRespose';
  comment_id: Scalars['Float'];
  profileImg: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  commentMsg: Scalars['String'];
  comments: Scalars['Float'];
  likes: Scalars['Float'];
  img: Scalars['String'];
  liked: Scalars['Boolean'];
};

export type GetCommentsInput = {
  fetchFrom: Scalars['String'];
  postId: Scalars['Float'];
};

export type DisplayProfiles = {
  __typename?: 'DisplayProfiles';
  profiles: Array<DisplayProfile>;
  error?: Maybe<Scalars['String']>;
};

export type DisplayProfile = {
  __typename?: 'DisplayProfile';
  name: Scalars['String'];
  username: Scalars['String'];
  id: Scalars['Float'];
  img: Scalars['String'];
};

export type Searched = {
  search: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  followAUser: FollowedAUser;
  saveImage: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  createPost: PostCreatedResponse;
  likeTweet: LikedTweet;
  editProfile: Scalars['Boolean'];
  postComment: CommentPostedReponse;
};


export type MutationFollowAUserArgs = {
  options: UserToFollow;
};


export type MutationSaveImageArgs = {
  options: ImageParams;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationLoginArgs = {
  options: UserLoginInput;
};


export type MutationCreatePostArgs = {
  options: PostTweetInput;
};


export type MutationLikeTweetArgs = {
  options: TweetInfo;
};


export type MutationEditProfileArgs = {
  options: EditProfile;
};


export type MutationPostCommentArgs = {
  args: CommentInput;
};

export type FollowedAUser = {
  __typename?: 'FollowedAUser';
  followed: Scalars['Boolean'];
  error: Scalars['String'];
};

export type UserToFollow = {
  thatUser: Scalars['Float'];
};

export type ImageParams = {
  url: Scalars['String'];
  type: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  phone: Scalars['String'];
  name: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PostCreatedResponse = {
  __typename?: 'PostCreatedResponse';
  uploaded?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type PostTweetInput = {
  tweet_content: Scalars['String'];
  img?: Maybe<Scalars['String']>;
};

export type LikedTweet = {
  __typename?: 'LikedTweet';
  liked?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type TweetInfo = {
  tweet_id: Scalars['Float'];
};

export type EditProfile = {
  bio: Scalars['String'];
  link: Scalars['String'];
};

export type CommentPostedReponse = {
  __typename?: 'CommentPostedReponse';
  commented: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  commentMsg: Scalars['String'];
  comment_on_id: Scalars['Float'];
  comment_on: Scalars['String'];
  img: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  listenUserTweets: SubUserTweets;
  listenTweets: GetTweetResponse;
};


export type SubscriptionListenUserTweetsArgs = {
  id: Scalars['Float'];
};

export type SubUserTweets = {
  __typename?: 'SubUserTweets';
  tweets?: Maybe<Array<GetOneTweet>>;
  num?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
};

export type CreateTweetMutationVariables = Exact<{
  tweet_content: Scalars['String'];
  img?: Maybe<Scalars['String']>;
}>;


export type CreateTweetMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostCreatedResponse' }
    & Pick<PostCreatedResponse, 'uploaded' | 'error'>
  ) }
);

export type EditProfileMutationVariables = Exact<{
  bio: Scalars['String'];
  link: Scalars['String'];
}>;


export type EditProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editProfile'>
);

export type FollowAUserMutationVariables = Exact<{
  thatUser: Scalars['Float'];
}>;


export type FollowAUserMutation = (
  { __typename?: 'Mutation' }
  & { followAUser: (
    { __typename?: 'FollowedAUser' }
    & Pick<FollowedAUser, 'followed' | 'error'>
  ) }
);

export type LikeTweetMutationVariables = Exact<{
  tweet_id: Scalars['Float'];
}>;


export type LikeTweetMutation = (
  { __typename?: 'Mutation' }
  & { likeTweet: (
    { __typename?: 'LikedTweet' }
    & Pick<LikedTweet, 'liked' | 'error'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'username' | 'email' | 'phone'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type PostCommentMutationVariables = Exact<{
  commentMsg: Scalars['String'];
  comment_on_id: Scalars['Float'];
  comment_on: Scalars['String'];
  img: Scalars['String'];
}>;


export type PostCommentMutation = (
  { __typename?: 'Mutation' }
  & { postComment: (
    { __typename?: 'CommentPostedReponse' }
    & Pick<CommentPostedReponse, 'commented' | 'error'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'username' | 'email' | 'phone' | 'name'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type SaveImageMutationVariables = Exact<{
  url: Scalars['String'];
  type: Scalars['String'];
}>;


export type SaveImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveImage'>
);

export type TriggerUserTweetQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type TriggerUserTweetQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'triggerUserTweetsSubscriptions'>
);

export type GetCommentsQueryVariables = Exact<{
  fetchFrom: Scalars['String'];
  postId: Scalars['Float'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: (
    { __typename?: 'GetCommentsResponse' }
    & Pick<GetCommentsResponse, 'error'>
    & { comments: Array<(
      { __typename?: 'CommentRespose' }
      & Pick<CommentRespose, 'comment_id' | 'commentMsg' | 'profileImg' | 'name' | 'username' | 'comments' | 'likes' | 'img' | 'liked'>
    )> }
  ) }
);

export type GetFollowInfoQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetFollowInfoQuery = (
  { __typename?: 'Query' }
  & { getProfileStuff: (
    { __typename?: 'ProfileStuff' }
    & Pick<ProfileStuff, 'error'>
    & { profile: (
      { __typename?: 'ProfileItems' }
      & Pick<ProfileItems, 'followers' | 'following' | 'isFollowed'>
    ) }
  ) }
);

export type GetPaginatedPostsQueryVariables = Exact<{
  offset: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type GetPaginatedPostsQuery = (
  { __typename?: 'Query' }
  & { getPaginatedPosts: (
    { __typename?: 'GetPaginatedFeedTweets' }
    & Pick<GetPaginatedFeedTweets, 'error'>
    & { tweets: Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img'>
    )> }
  ) }
);

export type GetPaginatedUserTweetsQueryVariables = Exact<{
  offset: Scalars['Float'];
  limit: Scalars['Float'];
  id: Scalars['Float'];
}>;


export type GetPaginatedUserTweetsQuery = (
  { __typename?: 'Query' }
  & { getPaginatedUserTweets: (
    { __typename?: 'GetPaginatedUserTweets' }
    & Pick<GetPaginatedUserTweets, 'error'>
    & { tweets: Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img'>
    )> }
  ) }
);

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { getUserProfile: (
    { __typename?: 'GetProfile' }
    & Pick<GetProfile, 'error'>
    & { profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'followers' | 'following' | 'bio' | 'link' | 'num'>
    ) }
  ) }
);

export type GetProfileImageQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProfileImageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getProfileImage'>
);

export type GetProfileStuffQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProfileStuffQuery = (
  { __typename?: 'Query' }
  & { getProfileStuff: (
    { __typename?: 'ProfileStuff' }
    & Pick<ProfileStuff, 'error'>
    & { profile: (
      { __typename?: 'ProfileItems' }
      & Pick<ProfileItems, 'profile_img' | 'cover_img' | 'name' | 'username' | 'bio' | 'link' | 'followers' | 'following' | 'num' | 'isFollowed'>
    ) }
  ) }
);

export type ProfileStuffAndUserTweetsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ProfileStuffAndUserTweetsQuery = (
  { __typename?: 'Query' }
  & { profileStuffAndUserTweets: (
    { __typename?: 'ProfileStuffAndUserTweets' }
    & Pick<ProfileStuffAndUserTweets, 'error'>
    & { profile: (
      { __typename?: 'ProfileItems' }
      & Pick<ProfileItems, 'username' | 'profile_img' | 'cover_img' | 'name' | 'bio' | 'link' | 'followers' | 'following' | 'num' | 'isFollowed'>
    ), tweets: Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_content' | 'tweet_id' | 'created_At' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img' | '_type'>
    )> }
  ) }
);

export type GetSearchResultsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetSearchResultsQuery = (
  { __typename?: 'Query' }
  & { getSearchResults: (
    { __typename?: 'DisplayProfiles' }
    & Pick<DisplayProfiles, 'error'>
    & { profiles: Array<(
      { __typename?: 'DisplayProfile' }
      & Pick<DisplayProfile, 'id' | 'name' | 'username' | 'img'>
    )> }
  ) }
);

export type GetTweetByIdQueryVariables = Exact<{
  tweet_id: Scalars['Float'];
}>;


export type GetTweetByIdQuery = (
  { __typename?: 'Query' }
  & { getTweetById: (
    { __typename?: 'GetTweetResponse' }
    & Pick<GetTweetResponse, 'error'>
    & { tweet?: Maybe<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'img' | 'profile_img'>
    )> }
  ) }
);

export type GetTweetsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTweetsByUserQuery = (
  { __typename?: 'Query' }
  & { getTweetsByUser: (
    { __typename?: 'GetFeedTweets' }
    & Pick<GetFeedTweets, 'error' | 'num'>
    & { tweets?: Maybe<Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img'>
    )>> }
  ) }
);

export type GetTweetsByUserFQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTweetsByUserFQuery = (
  { __typename?: 'Query' }
  & { getTweetsByUserF: (
    { __typename?: 'GetUserTweets' }
    & Pick<GetUserTweets, 'error' | 'num'>
    & { tweets: Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img' | 'created_At'>
    )> }
  ) }
);

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = (
  { __typename?: 'Query' }
  & { getUserByUsername: (
    { __typename?: 'NUserResponse' }
    & { user: (
      { __typename?: 'NUser' }
      & Pick<NUser, 'id' | 'username' | 'name' | 'img'>
    ) }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MeResponse' }
    & Pick<MeResponse, 'error'>
    & { user: (
      { __typename?: 'MeUser' }
      & Pick<MeUser, 'id' | 'email' | 'createdAt' | 'updatedAt' | 'username' | 'phone' | 'name' | 'img'>
    ) }
  ) }
);

export type ListenTweetsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ListenTweetsSubscription = (
  { __typename?: 'Subscription' }
  & { listenTweets: (
    { __typename?: 'GetTweetResponse' }
    & Pick<GetTweetResponse, 'error'>
    & { tweet?: Maybe<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'comments' | 'likes' | 'liked' | 'profile_img' | 'img'>
    )> }
  ) }
);

export type ListenUserTweetsSubscriptionVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ListenUserTweetsSubscription = (
  { __typename?: 'Subscription' }
  & { listenUserTweets: (
    { __typename?: 'SubUserTweets' }
    & Pick<SubUserTweets, 'error'>
    & { tweets?: Maybe<Array<(
      { __typename?: 'GetOneTweet' }
      & Pick<GetOneTweet, 'tweet_id' | 'tweet_content' | 'created_At' | '_type' | 'username' | 'name' | 'likes' | 'comments' | 'liked' | 'profile_img' | 'img'>
    )>> }
  ) }
);


export const CreateTweetDocument = gql`
    mutation CreateTweet($tweet_content: String!, $img: String) {
  createPost(options: {tweet_content: $tweet_content, img: $img}) {
    uploaded
    error
  }
}
    `;

export function useCreateTweetMutation() {
  return Urql.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument);
};
export const EditProfileDocument = gql`
    mutation EditProfile($bio: String!, $link: String!) {
  editProfile(options: {bio: $bio, link: $link})
}
    `;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument);
};
export const FollowAUserDocument = gql`
    mutation FollowAUser($thatUser: Float!) {
  followAUser(options: {thatUser: $thatUser}) {
    followed
    error
  }
}
    `;

export function useFollowAUserMutation() {
  return Urql.useMutation<FollowAUserMutation, FollowAUserMutationVariables>(FollowAUserDocument);
};
export const LikeTweetDocument = gql`
    mutation LikeTweet($tweet_id: Float!) {
  likeTweet(options: {tweet_id: $tweet_id}) {
    liked
    error
  }
}
    `;

export function useLikeTweetMutation() {
  return Urql.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(LikeTweetDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    user {
      id
      createdAt
      username
      email
      phone
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const PostCommentDocument = gql`
    mutation PostComment($commentMsg: String!, $comment_on_id: Float!, $comment_on: String!, $img: String!) {
  postComment(
    args: {commentMsg: $commentMsg, comment_on_id: $comment_on_id, comment_on: $comment_on, img: $img}
  ) {
    commented
    error
  }
}
    `;

export function usePostCommentMutation() {
  return Urql.useMutation<PostCommentMutation, PostCommentMutationVariables>(PostCommentDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $phone: String!, $name: String!) {
  register(
    options: {username: $username, email: $email, password: $password, phone: $phone, name: $name}
  ) {
    user {
      id
      createdAt
      username
      email
      phone
      name
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SaveImageDocument = gql`
    mutation SaveImage($url: String!, $type: String!) {
  saveImage(options: {url: $url, type: $type})
}
    `;

export function useSaveImageMutation() {
  return Urql.useMutation<SaveImageMutation, SaveImageMutationVariables>(SaveImageDocument);
};
export const TriggerUserTweetDocument = gql`
    query TriggerUserTweet($id: Float!) {
  triggerUserTweetsSubscriptions(id: $id)
}
    `;

export function useTriggerUserTweetQuery(options: Omit<Urql.UseQueryArgs<TriggerUserTweetQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TriggerUserTweetQuery>({ query: TriggerUserTweetDocument, ...options });
};
export const GetCommentsDocument = gql`
    query GetComments($fetchFrom: String!, $postId: Float!) {
  getComments(args: {fetchFrom: $fetchFrom, postId: $postId}) {
    comments {
      comment_id
      commentMsg
      profileImg
      name
      username
      comments
      likes
      img
      liked
    }
    error
  }
}
    `;

export function useGetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsQuery>({ query: GetCommentsDocument, ...options });
};
export const GetFollowInfoDocument = gql`
    query GetFollowInfo($id: Float!) {
  getProfileStuff(id: $id) {
    profile {
      followers
      following
      isFollowed
    }
    error
  }
}
    `;

export function useGetFollowInfoQuery(options: Omit<Urql.UseQueryArgs<GetFollowInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFollowInfoQuery>({ query: GetFollowInfoDocument, ...options });
};
export const GetPaginatedPostsDocument = gql`
    query GetPaginatedPosts($offset: Float!, $limit: Float!) {
  getPaginatedPosts(options: {offset: $offset, limit: $limit}) {
    tweets {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      likes
      comments
      liked
      profile_img
      img
    }
    error
  }
}
    `;

export function useGetPaginatedPostsQuery(options: Omit<Urql.UseQueryArgs<GetPaginatedPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPaginatedPostsQuery>({ query: GetPaginatedPostsDocument, ...options });
};
export const GetPaginatedUserTweetsDocument = gql`
    query GetPaginatedUserTweets($offset: Float!, $limit: Float!, $id: Float!) {
  getPaginatedUserTweets(options: {offset: $offset, limit: $limit, id: $id}) {
    tweets {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      likes
      comments
      liked
      profile_img
      img
    }
    error
  }
}
    `;

export function useGetPaginatedUserTweetsQuery(options: Omit<Urql.UseQueryArgs<GetPaginatedUserTweetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPaginatedUserTweetsQuery>({ query: GetPaginatedUserTweetsDocument, ...options });
};
export const GetProfileDocument = gql`
    query GetProfile {
  getUserProfile {
    profile {
      followers
      following
      bio
      link
      num
    }
    error
  }
}
    `;

export function useGetProfileQuery(options: Omit<Urql.UseQueryArgs<GetProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileQuery>({ query: GetProfileDocument, ...options });
};
export const GetProfileImageDocument = gql`
    query GetProfileImage($id: Float!) {
  getProfileImage(id: $id)
}
    `;

export function useGetProfileImageQuery(options: Omit<Urql.UseQueryArgs<GetProfileImageQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileImageQuery>({ query: GetProfileImageDocument, ...options });
};
export const GetProfileStuffDocument = gql`
    query GetProfileStuff($id: Float!) {
  getProfileStuff(id: $id) {
    profile {
      profile_img
      cover_img
      name
      username
      bio
      link
      followers
      following
      num
      isFollowed
    }
    error
  }
}
    `;

export function useGetProfileStuffQuery(options: Omit<Urql.UseQueryArgs<GetProfileStuffQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileStuffQuery>({ query: GetProfileStuffDocument, ...options });
};
export const ProfileStuffAndUserTweetsDocument = gql`
    query ProfileStuffAndUserTweets($id: Float!) {
  profileStuffAndUserTweets(id: $id) {
    profile {
      username
      profile_img
      cover_img
      name
      bio
      link
      followers
      following
      num
      isFollowed
    }
    tweets {
      tweet_content
      tweet_id
      created_At
      username
      name
      likes
      comments
      liked
      profile_img
      img
      _type
    }
    error
  }
}
    `;

export function useProfileStuffAndUserTweetsQuery(options: Omit<Urql.UseQueryArgs<ProfileStuffAndUserTweetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileStuffAndUserTweetsQuery>({ query: ProfileStuffAndUserTweetsDocument, ...options });
};
export const GetSearchResultsDocument = gql`
    query GetSearchResults($search: String!) {
  getSearchResults(options: {search: $search}) {
    profiles {
      id
      name
      username
      img
    }
    error
  }
}
    `;

export function useGetSearchResultsQuery(options: Omit<Urql.UseQueryArgs<GetSearchResultsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSearchResultsQuery>({ query: GetSearchResultsDocument, ...options });
};
export const GetTweetByIdDocument = gql`
    query GetTweetById($tweet_id: Float!) {
  getTweetById(options: {tweet_id: $tweet_id}) {
    tweet {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      likes
      comments
      liked
      img
      profile_img
    }
    error
  }
}
    `;

export function useGetTweetByIdQuery(options: Omit<Urql.UseQueryArgs<GetTweetByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetByIdQuery>({ query: GetTweetByIdDocument, ...options });
};
export const GetTweetsByUserDocument = gql`
    query GetTweetsByUser {
  getTweetsByUser {
    tweets {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      likes
      comments
      liked
      profile_img
      img
    }
    error
    num
  }
}
    `;

export function useGetTweetsByUserQuery(options: Omit<Urql.UseQueryArgs<GetTweetsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetsByUserQuery>({ query: GetTweetsByUserDocument, ...options });
};
export const GetTweetsByUserFDocument = gql`
    query GetTweetsByUserF($id: Float!) {
  getTweetsByUserF(id: $id) {
    tweets {
      tweet_id
      tweet_content
      _type
      username
      name
      likes
      comments
      liked
      profile_img
      img
      created_At
    }
    error
    num
  }
}
    `;

export function useGetTweetsByUserFQuery(options: Omit<Urql.UseQueryArgs<GetTweetsByUserFQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetsByUserFQuery>({ query: GetTweetsByUserFDocument, ...options });
};
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
    user {
      id
      username
      name
      img
    }
  }
}
    `;

export function useGetUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByUsernameQuery>({ query: GetUserByUsernameDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      email
      createdAt
      updatedAt
      username
      phone
      name
      img
    }
    error
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ListenTweetsDocument = gql`
    subscription ListenTweets {
  listenTweets {
    tweet {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      comments
      likes
      liked
      profile_img
      img
    }
    error
  }
}
    `;

export function useListenTweetsSubscription<TData = ListenTweetsSubscription>(options: Omit<Urql.UseSubscriptionArgs<ListenTweetsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ListenTweetsSubscription, TData>) {
  return Urql.useSubscription<ListenTweetsSubscription, TData, ListenTweetsSubscriptionVariables>({ query: ListenTweetsDocument, ...options }, handler);
};
export const ListenUserTweetsDocument = gql`
    subscription ListenUserTweets($id: Float!) {
  listenUserTweets(id: $id) {
    tweets {
      tweet_id
      tweet_content
      created_At
      _type
      username
      name
      likes
      comments
      liked
      profile_img
      img
    }
    error
  }
}
    `;

export function useListenUserTweetsSubscription<TData = ListenUserTweetsSubscription>(options: Omit<Urql.UseSubscriptionArgs<ListenUserTweetsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ListenUserTweetsSubscription, TData>) {
  return Urql.useSubscription<ListenUserTweetsSubscription, TData, ListenUserTweetsSubscriptionVariables>({ query: ListenUserTweetsDocument, ...options }, handler);
};