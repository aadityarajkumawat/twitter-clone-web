import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostCommentMutation } from "../../generated/graphql";
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

  const { focusedTweet } = useStore((s) => ({ ...s }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py="1rem">Compose a comment</ModalHeader>
          <ModalBody>
            <Input placeholder="comment" value={comment} onChange={onChange} />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              onClick={async () => {
                console.log({
                  commentMsg: comment,
                  comment_on: "tweet",
                  img: "",
                  comment_on_id: focusedTweet,
                });
                await postComment({
                  commentMsg: comment,
                  comment_on: "tweet",
                  img: "",
                  comment_on_id: focusedTweet,
                });
              }}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
