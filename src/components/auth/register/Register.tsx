import React, { useEffect } from "react";
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
} from "../login/login.styles";
import TwitterIcon from "../../../assets/twitter-icon.svg";
import { useForm } from "../../../hooks/useForm";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
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

interface RegisterProps {}

interface RegisterUserI {
  email: string;
  password: string;
  username: string;
  phone: string;
}

const Register: React.FC<RegisterProps> = ({}) => {
  const [registerUser, obj] = useMutation(REGISTER_MUTATION);
  const { user, handleChange, handleSubmit } = useForm<RegisterUserI>(
    {
      email: "",
      password: "",
      username: "",
      phone: "",
    },
    registerUser,
    "register"
  );

  useEffect(() => {
    console.log(obj);
  }, [obj.data]);

  const { email, password, username, phone } = user;

  return (
    <LoginContainer>
      <LoginFormContainer>
        <FormHeader>
          <Icon src={TwitterIcon}></Icon>
          <Name>Register</Name>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <InputField
            placeholder="Username"
            name="username"
            value={username}
            type="text"
            onChange={handleChange}
            autoComplete="off"
          />
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
          <InputField
            placeholder="Phone"
            name="phone"
            value={phone}
            type="text"
            onChange={handleChange}
            autoComplete="off"
          />

          <LoginButton type="submit">Register</LoginButton>
        </Form>

        <ForNewUser>
          Already a user? <Link to="/login">Login</Link>
        </ForNewUser>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Register;
