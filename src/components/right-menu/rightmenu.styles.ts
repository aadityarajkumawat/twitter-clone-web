import styled from "styled-components";

export const RightMenuContainer = styled.div`
    width: 350px;
    height: 100vh;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: fixed;
    z-index: 100;
`;

export const Search = styled.input`
    width: 300px;
    border: none;
    background-color: #5c5c5c;
    border-radius: 35px;
    padding: 5px 20px;
    font-size: 15px;
    color: white;
    font-family: "Oxygen";
    position: relative;
    z-index: 5;
    @media only screen and (max-width: 1070px) {
        width: 270px;
    }
`;

export const SearchList = styled.div`
    width: 300px;
    margin-top: 0px;
    padding: 15px 0;
    background-color: #5c5c5c;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    z-index: 5;
    @media only screen and (max-width: 1070px) {
        width: 270px;
    }

    div {
        color: white;
        span {
            margin: auto;
        }
    }
`;
