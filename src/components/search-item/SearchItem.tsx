import React, { Fragment } from "react";
import {
  ImageContainer,
  SearchItemContainer,
  UserD,
} from "./searchitem.styles";

interface SearchItemProps {
  name: string;
  username: string;
}
export const SearchItem: React.FC<SearchItemProps> = ({ name, username }) => {
  return (
    <Fragment>
      <SearchItemContainer>
        <ImageContainer></ImageContainer>
        <UserD>
          <h4>{name}</h4>
          <p>@{username}</p>
        </UserD>
      </SearchItemContainer>
    </Fragment>
  );
};
