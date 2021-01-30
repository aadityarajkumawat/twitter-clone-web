import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 100%;
  /* height: 100vh; */
  background-color: #222;
  display: flex;
  justify-content: center;
`;

export const CenterItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileNav = styled.div`
  width: 100%;
  height: 70px;
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

  div {
    svg {
      width: 30px;
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;

  span {
    font-size: 13px;
    font-family: "Oxygen";
  }
`;

export const CoverImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 240px;
  background-color: #000;

  img {
    width: 100%;
    height: 98%;
  }
`;

export const ProfileImgContainer = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 20px;
  border-radius: 100%;
  border: 4px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 142px;
    height: 142px;
  }
`;

export const MoreInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  color: #fff;
  font-family: "Oxygen";
  padding-bottom: 25px;
  border-bottom: 1px solid #eeeeee20;

  b {
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 4px;
  }

  .username {
    font-size: 14px;
    color: #ccc;
    font-family: "Oxygen";
    margin-bottom: 5px;
  }

  .bio {
    font-size: 15px;
    margin: 8px 0;
  }

  .link {
    font-size: 15px;
    margin: 0px 0 8px 0;

    a {
      color: #0066ff;
      text-decoration: none;
    }
  }
`;

export const Follows = styled.div`
  display: flex;
  align-items: center;
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
