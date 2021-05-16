import styled from "styled-components";
import { flexCenter } from "../../../constants/styles";

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #222;
    ${flexCenter}
`;

export const LoginFormContainer = styled.div`
    width: 600px;
    height: 600px;
    padding: 20px;
    flex-direction: column;
    ${flexCenter}
    justify-content: flex-start;
`;

export const FormHeader = styled.div`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    ${flexCenter}
`;

export const Icon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 20px;
`;

export const Name = styled.span`
    color: #fff;
    font-size: 26px;
`;

export const Form = styled.form`
    width: 100%;
    flex-direction: column;
    ${flexCenter}
`;

export const InputField = styled.input`
    width: 350px;
    height: 30px;
    background-color: #222;
    padding: 10px 0px;
    border: none;
    border-bottom: 2px solid #eeeeee50;
    color: #eee;
    font-size: 18px;
    margin-bottom: 25px;
    transition: all 0.5s ease;

    &:active {
        outline: none;
        border-bottom: 2px solid #eeeeee;
    }
    &:focus {
        outline: none;
        border-bottom: 2px solid #eeeeee;
    }
`;

export const LoginButton = styled.button`
    width: 350px;
    height: 40px;
    background-color: #eee;
    border: none;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const ForNewUser = styled.div`
    margin: 10px 0;
    color: #eee;

    a {
        color: #0066ff;
        text-decoration: none;
    }
`;
