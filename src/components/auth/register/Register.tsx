import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TwitterIcon from "../../../assets/twitter-icon.svg";
import { useMeQuery, useRegisterMutation } from "../../../generated/graphql";
import { useForm } from "../../../hooks/useForm";
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
    const [{ data, fetching }, refe] = useMeQuery();

    useEffect(() => {
        if (!fetching && data && data.me.user.id) {
            history.push("/home");
        } // eslint-disable-next-line
    }, [JSON.stringify(data)]);

    const registerAndMoveOn = async (e: React.FormEvent<HTMLFormElement>) => {
        await handleSubmit(e);
        refe({ requestPolicy: "network-only" });

        if (!fetching && data && data.me.user.id) {
            history.push("/home");
        }
    };

    const { email, password, username, phone, name } = user;

    return (
        <LoginContainer>
            <LoginFormContainer>
                <FormHeader>
                    <Icon src={TwitterIcon}></Icon>
                    <Name>Register</Name>
                </FormHeader>
                <Form onSubmit={registerAndMoveOn}>
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
