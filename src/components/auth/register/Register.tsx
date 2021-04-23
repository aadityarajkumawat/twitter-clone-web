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
import { Link, useHistory } from "react-router-dom";
import { useMeQuery, useRegisterMutation } from "../../../generated/graphql";

interface RegisterUserI {
  email: string;
  password: string;
  username: string;
  phone: string;
  name: string;
}

const Register: React.FC<{}> = () => {
  const history = useHistory();
  const [, registerUser] = useRegisterMutation();
  const { user, handleChange, handleSubmit } = useForm<RegisterUserI>(
    {
      email: "",
      password: "",
      username: "",
      phone: "",
      name: "",
    },
    registerUser
  );
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && data && data.me.user.id) {
      history.push("/");
    } // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  const { email, password, username, phone, name } = user;

  return (
    <LoginContainer>
      <LoginFormContainer>
        <FormHeader>
          <Icon src={TwitterIcon}></Icon>
          <Name>Register</Name>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <InputField
            placeholder="Name"
            name="name"
            value={name}
            type="text"
            onChange={handleChange}
            autoComplete="off"
          />
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
