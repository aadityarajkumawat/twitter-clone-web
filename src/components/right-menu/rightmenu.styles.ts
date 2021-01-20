import styled from "styled-components";

export const RightMenuContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  flex-direction: column;
  position: relative;
`;

export const Search = styled.input`
  width: 80%;
  border: none;
  background-color: #5c5c5c;
  border-radius: 35px;
  padding: 5px 20px;
  font-size: 17px;
  color: white;
  font-family: "Oxygen";
  position: relative;
  z-index: 5;
`;

export const SearchList = styled.div`
  width: 80%;
  margin-top: 10px;
  padding: 15px 0;
  background-color: #5c5c5c;
  border-radius: 10px;
  position: absolute;
  top: 60px;
  z-index: 5;

  div {
    color: white;
    /* text-align: center; */
    span {
      margin: auto;
    }
  }
`;
