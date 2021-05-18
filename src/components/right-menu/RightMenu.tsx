import React, { useState } from "react";
import { useGetSearchResultsQuery } from "../../generated/graphql";
import * as S from "../../pages/home.styles";
import { useStore } from "../../zustand/store";

interface RightMenuProps {}
export const RightMenu: React.FC<RightMenuProps> = () => {
    const showSearchResults = useStore((state) => state.showSearchResults);
    const toggle = useStore((state) => state.toggleShowSearchResults);

    const [search, setSearch] = useState<string>("");
    const [{ data: results }] = useGetSearchResultsQuery({
        variables: { search },
    });

    return (
        <S.RightMenu>
            {/* <Flex>
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
                                    style={{
                                        textAlign:
                                            search.length === 0
                                                ? "center"
                                                : "unset",
                                    }}
                                >
                                    <span>Search Users</span>
                                </div>
                            ) : (
                                <Fragment>
                                    {results?.getSearchResults.profiles.map(
                                        (profile) => (
                                            <SearchItem
                                                name={profile.name}
                                                username={profile.username}
                                                key={uuidv4()}
                                                user_img={profile.img}
                                            />
                                        )
                                    )}
                                </Fragment>
                            )}
                        </SearchList>
                    )}
                </RightMenuContainer>
            </Flex> */}
        </S.RightMenu>
    );
};
