import styled from "styled-components";
import { flexCenter, StyledDiv } from "../../constants/styles";

export const TweetContainer = styled(StyledDiv)`
  width: 80%;
  padding: 14px 25px 14px 0;
`;

export const TweetUsername = styled(StyledDiv)`
  margin-bottom: 8px;
  font-size: 14px;
  ${flexCenter}
  justify-content: flex-start;
  color: white;
  font-family: "Oxygen";
`;

export const TweetContent = styled(StyledDiv)`
  margin-bottom: 15px;
  color: white;
`;

export const TweetActionBar = styled(StyledDiv)`
  ${flexCenter}
  justify-content: space-between;
`;

export const FadedUsername = styled(StyledDiv)`
  color: #ffffff40;
  margin-left: 10px;
  font-family: "Oxygen";
`;

export const UserProfileImg = styled(StyledDiv)`
  width: 20%;
  ${flexCenter}
  img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: absolute;
    top: 15px;
    object-fit: cover;
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

  div {
    margin-left: 5px;
    color: white;
  }
`;

export const LikeSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-left: 5px;
    color: white;
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
