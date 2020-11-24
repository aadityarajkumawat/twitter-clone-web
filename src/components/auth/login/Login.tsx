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

interface LoginProps {}

interface LoginUserI {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({}) => {
  const { user, handleChange, handleSubmit } = useForm<LoginUserI>({
    email: "",
    password: "",
  });

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
            autoComplete='off'
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
          New user? <a href="">Sign Up</a>
        </ForNewUser>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
