import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  /* background-color: #eee; */
  position: relative;
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
  }
`;

export const Follows = styled.div`
  display: flex;
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
