import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: "Query";
  hello: Scalars["String"];
  me?: Maybe<User>;
  getTweetById: GetTweetResponse;
  getTweetsByUser: GetUserTweets;
};

export type QueryGetTweetByIdArgs = {
  options: GetTweetById;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type GetTweetResponse = {
  __typename?: "GetTweetResponse";
  tweet?: Maybe<GetTweet>;
  error?: Maybe<Scalars["String"]>;
};

export type GetTweet = {
  __typename?: "GetTweet";
  tweet_id: Scalars["Float"];
  tweet_content: Scalars["String"];
  created_At: Scalars["String"];
  _type: Scalars["String"];
  rel_acc: Scalars["Float"];
  username: Scalars["String"];
  name: Scalars["String"];
  likes: Scalars["Float"];
  comments: Scalars["Float"];
  liked: Scalars["Boolean"];
};

export type GetTweetById = {
  tweet_id: Scalars["Float"];
};

export type GetUserTweets = {
  __typename?: "GetUserTweets";
  tweets: Array<GetTweet>;
  error: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: UserResponse;
  login: UserResponse;
  createPost: PostCreatedResponse;
  likeTweet: LikedTweet;
  followAUser: FollowedAUser;
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

export type MutationFollowAUserArgs = {
  options: UserToFollow;
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UserRegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
  phone: Scalars["String"];
  name: Scalars["String"];
};

export type UserLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type PostCreatedResponse = {
  __typename?: "PostCreatedResponse";
  uploaded?: Maybe<Scalars["String"]>;
  error?: Maybe<Scalars["String"]>;
};

export type PostTweetInput = {
  tweet_content: Scalars["String"];
  rel_acc?: Maybe<Scalars["Float"]>;
};

export type LikedTweet = {
  __typename?: "LikedTweet";
  liked?: Maybe<Scalars["String"]>;
  error?: Maybe<Scalars["String"]>;
};

export type TweetInfo = {
  tweet_id: Scalars["Float"];
};

export type FollowedAUser = {
  __typename?: "FollowedAUser";
  followed: Scalars["Boolean"];
  error: Scalars["String"];
};

export type UserToFollow = {
  thatUser: Scalars["Float"];
};

export type CreateTweetMutationVariables = Exact<{
  tweet_content: Scalars["String"];
  rel_acc?: Maybe<Scalars["Float"]>;
}>;

export type CreateTweetMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "PostCreatedResponse" } & Pick<
    PostCreatedResponse,
    "uploaded" | "error"
  >;
};

export type FollowAUserMutationVariables = Exact<{
  thatUser: Scalars["Float"];
}>;

export type FollowAUserMutation = { __typename?: "Mutation" } & {
  followAUser: { __typename?: "FollowedAUser" } & Pick<
    FollowedAUser,
    "followed" | "error"
  >;
};

export type LikeTweetMutationVariables = Exact<{
  tweet_id: Scalars["Float"];
}>;

export type LikeTweetMutation = { __typename?: "Mutation" } & {
  likeTweet: { __typename?: "LikedTweet" } & Pick<
    LikedTweet,
    "liked" | "error"
  >;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "createdAt" | "username" | "email" | "phone"
      >
    >;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  phone: Scalars["String"];
  name: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "createdAt" | "username" | "email" | "phone" | "name"
      >
    >;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type GetTweetsByUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetTweetsByUserQuery = { __typename?: "Query" } & {
  getTweetsByUser: { __typename?: "GetUserTweets" } & Pick<
    GetUserTweets,
    "error"
  > & {
      tweets: Array<
        { __typename?: "GetTweet" } & Pick<
          GetTweet,
          | "tweet_id"
          | "tweet_content"
          | "created_At"
          | "_type"
          | "rel_acc"
          | "username"
          | "name"
          | "likes"
          | "comments"
          | "liked"
        >
      >;
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "email" | "createdAt" | "updatedAt" | "username" | "phone"
    >
  >;
};

export const CreateTweetDocument = gql`
  mutation CreateTweet($tweet_content: String!, $rel_acc: Float) {
    createPost(options: { tweet_content: $tweet_content, rel_acc: $rel_acc }) {
      uploaded
      error
    }
  }
`;

export function useCreateTweetMutation() {
  return Urql.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(
    CreateTweetDocument
  );
}
export const FollowAUserDocument = gql`
  mutation FollowAUser($thatUser: Float!) {
    followAUser(options: { thatUser: $thatUser }) {
      followed
      error
    }
  }
`;

export function useFollowAUserMutation() {
  return Urql.useMutation<FollowAUserMutation, FollowAUserMutationVariables>(
    FollowAUserDocument
  );
}
export const LikeTweetDocument = gql`
  mutation LikeTweet($tweet_id: Float!) {
    likeTweet(options: { tweet_id: $tweet_id }) {
      liked
      error
    }
  }
`;

export function useLikeTweetMutation() {
  return Urql.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(
    LikeTweetDocument
  );
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
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
}
export const RegisterDocument = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
    $name: String!
  ) {
    register(
      options: {
        username: $username
        email: $email
        password: $password
        phone: $phone
        name: $name
      }
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
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const GetTweetsByUserDocument = gql`
  query GetTweetsByUser {
    getTweetsByUser {
      tweets {
        tweet_id
        tweet_content
        created_At
        _type
        rel_acc
        username
        name
        likes
        comments
        liked
      }
      error
    }
  }
`;

export function useGetTweetsByUserQuery(
  options: Omit<Urql.UseQueryArgs<GetTweetsByUserQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetTweetsByUserQuery>({
    query: GetTweetsByUserDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      createdAt
      updatedAt
      username
      phone
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
