import { useOutsideClick } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import React, { Fragment, useRef, useState } from "react";
import { useGetSearchResultsQuery } from "../../generated/graphql";
import * as S from "../../pages/home.styles";
import { SearchItem } from "../search-item/SearchItem";
import { LoadingSpinner } from "../spinner/LoadingSpinner";

interface RightMenuProps {}
export const RightMenu: React.FC<RightMenuProps> = () => {
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const listRef = useRef<HTMLDivElement | null>(null);

    const [{ data: results, fetching }] = useGetSearchResultsQuery({
        variables: { search },
    });

    useOutsideClick({ ref: listRef, handler: () => setIsOpen(false) });

    return (
        <S.RightMenu>
            <Flex pt="0.5rem" alignItems="center" flexDir="column">
                <Input
                    w="80%"
                    h="40px"
                    borderRadius="40px"
                    placeholder="Search Twitter"
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {isOpen && (
                    <Flex
                        w="80%"
                        justifyContent="center"
                        alignItems="center"
                        bg="#686868"
                        rounded="base"
                        mt="10px"
                        py="10px"
                        ref={listRef}
                    >
                        {search.length === 0 ? (
                            <Text p="40px" fontWeight="600">
                                This is twitter world!
                            </Text>
                        ) : (
                            <Flex w="100%">
                                {!fetching && results ? (
                                    <Fragment>
                                        {results.getSearchResults.profiles.map(
                                            (profile) => (
                                                <SearchItem
                                                    name={profile.name}
                                                    user_img={profile.img}
                                                    username={profile.username}
                                                    key={profile.id}
                                                />
                                            )
                                        )}
                                    </Fragment>
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </Flex>
                        )}
                    </Flex>
                )}
            </Flex>
        </S.RightMenu>
    );
};
