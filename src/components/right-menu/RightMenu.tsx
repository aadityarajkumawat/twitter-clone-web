import React, { Fragment, useState } from "react";
import { useGetSearchResultsQuery } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import { TransparentBackdrop } from "../edit-profile/editprofile.styles";
import { SearchItem } from "../search-item/SearchItem";
import { RightMenuContainer, Search, SearchList } from "./rightmenu.styles";
import { v4 as uuidv4 } from "uuid";

interface RightMenuProps {}
export const RightMenu: React.FC<RightMenuProps> = () => {
  const showSearchResults = useStore((state) => state.showSearchResults);
  const toggle = useStore((state) => state.toggleShowSearchResults);

  const [search, setSearch] = useState<string>("");
  const [{ data: results }] = useGetSearchResultsQuery({
    variables: { search },
  });

  return (
    <Fragment>
      {showSearchResults && (
        <TransparentBackdrop
          onClick={() => toggle(false)}
        ></TransparentBackdrop>
      )}
      <RightMenuContainer>
        <Search
          type="text"
          placeholder="Search twitter"
          onClick={() => toggle(true)}
          onChange={(e) => setSearch(e.target.value)}
        ></Search>
        {showSearchResults && (
          <SearchList>
            {search.length === 0 ? (
              <div
                style={{ textAlign: search.length === 0 ? "center" : "unset" }}
              >
                <span>Search Users</span>
              </div>
            ) : (
              <Fragment>
                {results?.getSearchResults.profiles.map((profile) => (
                  <SearchItem
                    name={profile.name}
                    username={profile.username}
                    key={uuidv4()}
                    id={profile.id}
                    user_img={profile.img}
                  />
                ))}
              </Fragment>
            )}
          </SearchList>
        )}
      </RightMenuContainer>
    </Fragment>
  );
};
