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
} from "../login/login.styles";
import TwitterIcon from "../../../assets/twitter-icon.svg";
import { useForm } from "../../../hooks/useForm";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../../generated/graphql";

// interface RegisterProps {}

interface RegisterUserI {
  email: string;
  password: string;
  username: string;
  phone: string;
}

const Register: React.FC<{}> = () => {
  const [, registerUser] = useRegisterMutation();
  const { user, handleChange, handleSubmit } = useForm<RegisterUserI>(
    {
      email: "",
      password: "",
      username: "",
      phone: "",
    },
    registerUser
  );

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
