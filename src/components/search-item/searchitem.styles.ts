import styled from "styled-components";

export const SearchItemContainer = styled.div`
    width: 100%;
    padding: 0px 0;
    border-bottom: 1px solid #ffffff30;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

    &:hover {
        background-color: #989898;
    }
`;

export const ImageContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    img {
        height: 45px;
        width: 45px;
        border-radius: 100%;
        object-fit: cover;
    }
`;

export const UserD = styled.div`
    width: calc(100% - 50px);
    height: 50px;
    padding: 5px 10px;
    cursor: pointer;
    overflow-y: hidden;

    h4 {
        font-family: "Oxygen";
    }

    p {
        font-size: 15px;
        font-family: "Oxygen";
    }
`;
