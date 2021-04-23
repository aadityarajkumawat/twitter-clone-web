import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  ImageContainer,
  SearchItemContainer,
  UserD,
} from "./searchitem.styles";

interface SearchItemProps {
  name: string;
  username: string;
  user_img: string;
}
export const SearchItem: React.FC<SearchItemProps> = ({
  name,
  username,
  user_img,
}) => {
  const history = useHistory();

  return (
    <Fragment>
      <SearchItemContainer>
        <ImageContainer>
          <img src={user_img} alt="user" />
        </ImageContainer>
        <UserD
          onClick={() => {
            history.push(`/profile/${username}`);
          }}
        >
          <h4>{name}</h4>
          <p>@{username}</p>
        </UserD>
      </SearchItemContainer>
    </Fragment>
  );
};
