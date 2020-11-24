import React from "react";
import {
  Form,
  FormHeader,
  ForNewUser,
  Icon,
  InputField,
  LoginButton,
  LoginContainer,
  LoginFormContainer,
  Name,
} from "./login.styles";
import TwitterIcon from "../../../assets/twitter-icon.svg";
import { useForm } from "../../../hooks/useForm";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
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

interface LoginProps {}

interface LoginUserI {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({}) => {
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const { user, handleChange, handleSubmit } = useForm<LoginUserI>(
    {
      email: "",
      password: "",
    },
    loginUser,
    "login"
  );

  const { email, password } = user;

  return (
    <LoginContainer>
      <LoginFormContainer>
        <FormHeader>
          <Icon src={TwitterIcon}></Icon>
          <Name>Login</Name>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            name="email"
            value={email}
            type="text"
            onChange={handleChange}
            autoComplete="off"
          />
          <InputField
            placeholder="Password"
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
          />

          <LoginButton type="submit">Login</LoginButton>
        </Form>

        <ForNewUser>
          New user? <Link to="/register">Sign Up</Link>
        </ForNewUser>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
