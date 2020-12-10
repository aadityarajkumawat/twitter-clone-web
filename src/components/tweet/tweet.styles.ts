import styled from "styled-components";
import { flexCenter, StyledDiv } from "../../constants/styles";

export const TweetContainer = styled(StyledDiv)`
  width: 80%;
  /* background-color: red; */
  padding: 14px 25px 14px 0;
`;

export const TweetUsername = styled(StyledDiv)`
  margin-bottom: 8px;
  font-size: 14px;
  ${flexCenter}
  justify-content: flex-start;
`;

export const TweetContent = styled(StyledDiv)`
  margin-bottom: 15px;
`;

export const TweetActionBar = styled(StyledDiv)`
  ${flexCenter}
  justify-content: space-between;
`;

export const FadedUsername = styled(StyledDiv)`
  color: #ffffff40;
  margin-left: 10px;
`;

export const UserProfileImg = styled(StyledDiv)`
  width: 20%;
  ${flexCenter}
  img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
`;

export const TweetWrapper = styled(StyledDiv)`
  width: 100%;
  ${flexCenter}
  border-bottom: 1px solid #eeeeee20;
`;