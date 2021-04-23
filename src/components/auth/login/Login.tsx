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
} from "./login.styles";
import TwitterIcon from "../../../assets/twitter-icon.svg";
import { useForm } from "../../../hooks/useForm";
import { Link, useHistory } from "react-router-dom";
import { useLoginMutation, useMeQuery } from "../../../generated/graphql";

interface LoginUserI {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const history = useHistory();
  const [, loginUser] = useLoginMutation();
  const [{ data, fetching }] = useMeQuery();
  const { user, handleChange, handleSubmit } = useForm<LoginUserI>(
    {
      email: "",
      password: "",
    },
    loginUser
  );

  useEffect(() => {
    if (!fetching && data && data.me.user.id) {
      history.push("/");
    } // eslint-disable-next-line
  }, [JSON.stringify(data)]);

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
            // autoComplete="off"
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
