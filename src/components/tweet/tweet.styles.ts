import styled from "styled-components";
import { flexCenter, StyledDiv } from "../../constants/styles";

export const TweetContainer = styled(StyledDiv)`
  width: 90%;
  padding: 7px 25px 14px 0;
`;

export const TweetUsername = styled(StyledDiv)`
  margin-bottom: 4px;
  font-size: 14px;
  ${flexCenter}
  justify-content: flex-start;
  color: white;
  font-family: "Oxygen";
`;

export const TweetContent = styled(StyledDiv)`
  margin-bottom: 8px;
  color: white;
`;

export const TweetActionBar = styled(StyledDiv)`
  display: flex;
  align-items: center;
  width: 100%;

  span {
    width: 40px;
    margin-right: calc(25% - 40px);
  }
`;

export const FadedUsername = styled(StyledDiv)`
  color: #ffffff40;
  margin-left: 10px;
  font-family: "Oxygen";
`;

export const UserProfileImg = styled(StyledDiv)`
  width: 10%;
  height: inherit;
  box-sizing: content-box;
  padding: 0 13px;
  ${flexCenter}
  overflow-y: hidden;

  div {
    position: absolute;
    top: 7px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      object-fit: cover;
    }
  }
`;

export const TweetWrapper = styled(StyledDiv)`
  width: 100%;
  ${flexCenter}
  border-bottom: 1px solid #eeeeee20;
  position: relative;
`;

export const CommentSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const LikeSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const TweetImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0;

  img {
    border-radius: 10px;
  }
`;
