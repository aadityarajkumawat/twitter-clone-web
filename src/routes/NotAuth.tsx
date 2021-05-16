import React, { Fragment } from "react";
import styled from "styled-components";

interface NotAuthProps {}
export const NotAuth: React.FC<NotAuthProps> = () => {
    return (
        <Fragment>
            <NotAuthContainer>Sry!, you are not authenticated</NotAuthContainer>
            <button>Login</button>
        </Fragment>
    );
};

const NotAuthContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 700;
    color: white;
`;

const LoginButton = styled.button``;
