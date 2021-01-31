import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../zustand/store";
import {
  ImageContainer,
  SearchItemContainer,
  UserD,
} from "./searchitem.styles";

interface SearchItemProps {
  name: string;
  username: string;
  id: number;
  user_img: string;
}
export const SearchItem: React.FC<SearchItemProps> = ({
  name,
  username,
  id,
  user_img,
}) => {
  const setCurr = useStore((s) => s.setCurr);
  const history = useHistory();
  return (
    <Fragment>
      <SearchItemContainer>
        <ImageContainer>
          <img src={user_img} />
        </ImageContainer>
        <UserD
          onClick={() => {
            setCurr(id);
            history.push("/profile");
          }}
        >
          <h4>{name}</h4>
          <p>@{username}</p>
        </UserD>
      </SearchItemContainer>
    </Fragment>
  );
};
