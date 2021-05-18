import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 596px;
    /* height: 100vh; */
    background-color: #222 !important;
    display: flex;
    justify-content: center;
    /* margin-left: 15px; */
`;

export const CenterItems = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;

    &:hover {
        background-color: #696969;
    }
`;

export const ProfileNav = styled.div`
    width: 100%;
    height: 50px;
    background-color: #222;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee20;
`;

export const Back = styled(CenterItems)`
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 20px;

    &:hover {
        background-color: #222;
    }

    div {
        svg {
            width: 25px;
        }
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;

    b {
        font-size: 14px;
    }

    span {
        font-size: 12px;
        font-family: "Oxygen";
    }
`;

export const CoverImageContainer = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

export const ImgContainer = styled.div`
    width: 100%;
    height: 250px;
    background-color: #000;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
        object-fit: hidden;
    }
`;

export const ProfileImgContainer = styled.div`
    width: 120px;
    height: 120px;
    position: absolute;
    bottom: 0;
    left: 20px;
    border-radius: 100%;
    border: 4px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
        display: block;
        width: auto;
        height: 100%;
        object-fit: cover;
    }
`;

export const MoreInfo = styled.div`
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
    color: #fff;
    font-family: "Oxygen";
    padding-bottom: 25px;

    b {
        font-weight: 700;
        font-size: 19px;
        margin-bottom: 0px;
    }

    p {
        margin-top: 0;
        overflow-y: hidden;
    }

    .username {
        font-size: 14px;
        color: #ccc;
        font-family: "Oxygen";
    }

    .bio {
        font-size: 15px;
        margin-top: 6px;
    }

    .link {
        font-size: 15px;

        a {
            color: #0066ff;
            text-decoration: none;
        }
    }
`;

export const Follows = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 35px;
    width: 100%;
    span {
        font-family: "Oxygen";
        margin-right: 10px;
        font-size: 14px;

        .faded {
            color: #ccc;
            font-size: 14px;
        }
    }
`;

export const FollowBtn = styled.button`
    width: 120px;
    height: 30px;
    background-color: #0066ff;
    border: none;
    border-radius: 10px;
    position: absolute;
    right: 5px;
    color: white;
    font-weight: 700;
`;

export const EditProfileBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #eeeeee20;
    border: none;
    margin: 10px 10px 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        width: 19px;
        height: 2px;
        background-color: #ffffff70;
    }

    .mm {
        margin: 3px 0 3px 0;
    }
`;
