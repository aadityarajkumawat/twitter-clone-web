import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMeQuery, usePostCommentMutation } from "../../generated/graphql";
import { useStore } from "../../zustand/store";

interface PostCommentProps {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}

export const PostComment: React.FC<PostCommentProps> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;
  const [comment, setComment] = useState<string>("");

  const [, postComment] = usePostCommentMutation();
  const [{ data, fetching }] = useMeQuery();

  const { focusedTweet } = useStore((s) => ({ ...s }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="680px" maxW="unset">
          <ModalHeader p="0" borderBottom="1px solid #a6a6a680">
            <Flex h="48px">
              <ModalCloseButton />
            </Flex>
          </ModalHeader>
          <ModalBody w="100%" position="relative">
            <Box
              w="3px"
              h="100px"
              bg="#a6a6a690"
              position="absolute"
              zIndex="-1"
              left="calc(50px - 3px)"
            ></Box>
            <Flex w="100%">
              <Flex>
                <Image
                  h="50px"
                  w="50px"
                  objectFit="cover"
                  borderRadius="100%"
                  src={focusedTweet.profile_img}
                />
              </Flex>
              <Flex ml="1rem" w="100%" flexDir="column">
                <Flex>
                  <Flex>{focusedTweet.name}</Flex>
                  <Flex color="#a6a6a6" ml="0.5rem">
                    @{focusedTweet.username}
                  </Flex>
                </Flex>
                <Flex mt="0.5rem" fontSize="20px">
                  <Text>{focusedTweet.tweet_content}</Text>
                </Flex>
              </Flex>
            </Flex>
            {!fetching && data && (
              <Flex mt="25px">
                <Flex>
                  <Image
                    h="50px"
                    w="50px"
                    objectFit="cover"
                    borderRadius="100%"
                    src={data.me.user.img}
                  />
                </Flex>

                <Input
                  placeholder="Tweet a reply"
                  value={comment}
                  onChange={onChange}
                  border="none"
                  _focus={{ border: "none" }}
                  fontSize="20px"
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter mt="2rem">
            <Button
              variant="solid"
              rounded="full"
              onClick={async () => {
                await postComment({
                  commentMsg: comment,
                  comment_on: "tweet",
                  img: "",
                  comment_on_id: focusedTweet.tweet_id,
                });
                onClose();
              }}
            >
              Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
