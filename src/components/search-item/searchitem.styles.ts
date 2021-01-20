import styled from "styled-components";

export const SearchItemContainer = styled.div`
  width: 100%;
  padding: 0px 0;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
`;

export const UserD = styled.div`
  width: calc(100% - 50px);
  height: 50px;
  padding: 5px 10px;

  h4 {
    font-family: "Oxygen";
  }

  p {
    font-size: 15px;
    font-family: "Oxygen";
  }
`;
