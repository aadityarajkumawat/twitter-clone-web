import React, { Fragment, useEffect, useReducer } from "react";
import {
  useEditProfileMutation,
  useSaveImageMutation,
} from "../../generated/graphql";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Flex,
  Image,
  Text,
  Progress,
} from "@chakra-ui/react";
import { Form } from "../auth/login/login.styles";
import styled from "styled-components";
import { useStore } from "../../zustand/store";
import { v4 as uuid } from "uuid";
import { EditProfileState, EditProfileProps } from "../../constants/interfaces";
import { editProfileReducer } from "../../reducers/editProfileReducer";
import { setForm } from "../../actions/editProfileActions";
import { uploadImagesAndSave } from "../../helpers/handleProfileImages";

export const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  isOpen,
  profile,
}) => {
  const sBio = profile ? profile.bio : "";
  const sLink = profile ? profile.link : "";

  const initialState: EditProfileState = {
    form: { bio: sBio, link: sLink },
    images: { profile_img: null, cover_img: null },
    savingProgress: 0,
  };

  const context = useReducer(editProfileReducer, initialState);
  const [state, dispatch] = context;

  const refreshToken = useStore((s) => s.refreshProfile);
  const [, save] = useEditProfileMutation();

  const submit = async () => {
    await uploadImagesAndSave(context, saveImg, save);
    refreshToken(uuid());
    dispatch({ type: "saving", updatedProgress: 0 });
    onClose();
  };

  const [, saveImg] = useSaveImageMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(dispatch, { ...state.form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    dispatch({
      type: "image",
      updatedImages: {
        ...state.images,
        [name]: e.target.files,
      },
    });
  };

  const modalStyles: React.CSSProperties = {
    backgroundColor: "#2e2e2e",
    color: "#eee",
  };

  useEffect(() => {
    setForm(dispatch, { bio: sBio, link: sLink });
  }, [JSON.stringify(profile)]);

  return (
    <Fragment>
      <Box>
        <Modal onClose={() => null} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent style={modalStyles}>
            {state.savingProgress > 0 && (
              <Progress
                value={state.savingProgress}
                size="xs"
                colorScheme="blackAlpha"
              />
            )}
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <Box>
                  <Text mb="5px">Cover Profile</Text>
                  <WrapperBox>
                    <Image
                      src={profile ? profile.cover_img : ""}
                      borderRadius="10px"
                    />
                    <Input
                      w="400px"
                      my="0.5rem"
                      type="file"
                      name="cover_img"
                      onChange={handleFileChange}
                    />
                    <Box className="mid" borderRadius="10px"></Box>
                  </WrapperBox>
                </Box>
                <Flex
                  mt="20px"
                  w="100%"
                  flexDir="column"
                  alignItems="flex-start"
                >
                  <Text mb="5px">Profile Image</Text>
                  <WrapperBox>
                    <Image
                      src={profile ? profile.profile_img : ""}
                      w={"150px"}
                      height={"150px"}
                      borderRadius="150px"
                      objectFit="cover"
                    />
                    <Input
                      w="400px"
                      my="0.5rem"
                      type="file"
                      name="profile_img"
                      onChange={handleFileChange}
                    />
                    <Box className="mid" borderRadius="150px"></Box>
                  </WrapperBox>
                </Flex>
                <Box>
                  <Text>Bio</Text>
                  <Input
                    w="400px"
                    my="0.5rem"
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    onChange={handleChange}
                    value={state.form.bio}
                  />
                </Box>
                <Box>
                  <Text>Link</Text>
                  <Input
                    w="400px"
                    my="0.5rem"
                    type="text"
                    name="link"
                    placeholder="Link"
                    onChange={handleChange}
                    value={state.form.link}
                  />
                </Box>

                <Flex w="400px" justifyContent="flex-end" mt="1rem">
                  <Button ml="1rem" onClick={submit} variant="dark">
                    Save
                  </Button>
                  <Button ml="1rem" onClick={onClose} variant="dark">
                    Cancel
                  </Button>
                </Flex>
              </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Fragment>
  );
};

const WrapperBox = styled.div`
  position: relative;
  .mid {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  }
  input {
    top: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  input:hover + .mid {
    opacity: 0.5;
  }
`;
