import styled from "styled-components";
import { flexCenter } from "../constants/styles";

export const BaseComponent = styled.div`
  width: 100vw;
  background-color: #222;
  display: flex;
  justify-content: center;
`;

export const Head = styled.div`
  color: white;
  display: inline-block;
  width: 300px;
  padding: 10px;
  text-align: left;
`;

export const LeftMenu = styled.div`
  width: 32.5%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  text-align: end;
`;

export const MenuOptions = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 300px;
  margin-left: auto;
  text-align: left;
  margin-top: 30px;
`;

export const ListItem = styled.li`
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 15px;
  font-weight: 700;

  &:hover {
    background-color: #000;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export const RightMenu = styled.div`
  width: 32.5%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
`;

export const HomeMain = styled.div`
  max-width: 1300px;
  min-height: 100vh;
  background-color: #222;
  width: 35%;
  border-right: 1px solid #eeeeee20;
  border-left: 1px solid #eeeeee20;
  ${flexCenter}
  justify-content: flex-start;
  flex-direction: column;
`;

export const FeedHeader = styled.div`
  width: 100%;
  ${flexCenter}
  justify-content: flex-start;
  flex-direction: column;
`;

export const PageName = styled.div`
  width: 100%;
  color: #eee;
  font-weight: 600;
  font-size: 20px;
  padding: 20px 30px;
  border-bottom: 1px solid #eeeeee20;
`;

export const CreateTweet = styled.div`
  width: 100%;
  height: 160px;
  border-bottom: 8px solid #ffffff20;
  ${flexCenter}
  box-sizing: content-box;
`;

export const ProfileImageInc = styled.div`
  width: 90px;
  height: 100%;
  ${flexCenter}
  align-items: flex-start;
  padding-top: 10px;
`;

export const MTweet = styled.div`
  width: calc(100% - 90px);
  height: 100%;
`;

export const IncImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`;

export const TweetInput = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee20;
  height: 90px;
`;

export const TweetInputField = styled.input`
  width: 100%;
  background-color: #ffffff00;
  height: 30px;
  padding: 30px 15px;
  font-size: 18px;
  border: none;
  color: #eee;
`;

export const EditTweetOptions = styled.div`
  width: 100%;
  height: 70px;
  ${flexCenter}
  justify-content: space-between;
  padding: 0 20px;
`;

export const TweetAc = styled.div`
  width: 50px;
  height: 20px;
`;

export const TweetButton = styled.button`
  width: 90px;
  height: 40px;
  background-color: #11119c;
  color: #eee;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 40px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Tweets = styled.div`
  width: 100%;
  color: white;
`;

export const LoadMoreContainer = styled.div`
  width: 100%;
  height: 50px;
  ${flexCenter}
`;

export const LoadMoreBtn = styled.button`
  background-color: #11119c;
  color: white;
  border: none;
  padding: 5px 15px;
`;

export const Plac = styled.div`
  background-color: #11119c;
  height: 50px;
  width: 100px;
`;
