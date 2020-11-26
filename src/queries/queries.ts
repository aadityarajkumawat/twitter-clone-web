export const REGISTER_MUTATION = `
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    register(
      options: {
        username: $username
        email: $email
        password: $password
        phone: $phone
      }
    ) {
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

export const LOGIN_MUTATION = `
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
