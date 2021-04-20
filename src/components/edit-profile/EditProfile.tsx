import React, { Fragment, useEffect, useReducer } from "react";
import {
  ProfileItems,
  useEditProfileMutation,
  useSaveImageMutation,
} from "../../generated/graphql";
import Axios from "axios";
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
} from "@chakra-ui/react";
import { Form } from "../auth/login/login.styles";
import styled from "styled-components";
import { useStore } from "../../zustand/store";
import { v4 as uuid } from "uuid";

interface EditProfileI {
  bio: string;
  link: string;
}

interface EditProfileProps {
  onClose: () => void;
  isOpen: boolean;
  profile: ProfileType | null;
}

type EditProfileState = {
  form: EditProfileI;
  profileProgress: number;
  coverProgress: number;
};

type EditProfileAction =
  | { type: "form"; updatedForm: EditProfileI }
  | { type: "profile"; updatedProgress: number }
  | { type: "cover"; updatedCover: number };

type ProfileType = {
  __typename?: "ProfileItems" | undefined;
} & Pick<
  ProfileItems,
  | "username"
  | "profile_img"
  | "cover_img"
  | "name"
  | "bio"
  | "link"
  | "followers"
  | "following"
  | "num"
  | "isFollowed"
>;

export const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  isOpen,
  profile,
}) => {
  const refreshToken = useStore((s) => s.refreshProfile);
  const [, save] = useEditProfileMutation();

  const submit = async () => {
    await save({ bio: state.form.bio, link: state.form.link });
    onClose();
    refreshToken(uuid());
  };

  const sBio = profile ? profile.bio : "";
  const sLink = profile ? profile.link : "";

  const initialState: EditProfileState = {
    form: { bio: sBio, link: sLink },
    profileProgress: 1,
    coverProgress: 1,
  };

  const editProfileReducer = (
    state: EditProfileState,
    action: EditProfileAction
  ): EditProfileState => {
    switch (action.type) {
      case "form":
        return { ...state, form: action.updatedForm };
      case "cover":
        return { ...state, coverProgress: action.updatedCover };
      case "profile":
        return { ...state, profileProgress: action.updatedProgress };
      default:
        return state;
    }
  };

  const context = useReducer(editProfileReducer, initialState);
  const [state, dispatch] = context;

  const setProfileProgress = (
    dispatch: React.Dispatch<EditProfileAction>,
    val: number
  ) => {
    dispatch({ type: "profile", updatedProgress: val });
  };

  const setCoverProgress = (
    dispatch: React.Dispatch<EditProfileAction>,
    val: number
  ) => {
    dispatch({ type: "cover", updatedCover: val });
  };

  const setForm = (
    dispatch: React.Dispatch<EditProfileAction>,
    val: EditProfileI
  ) => {
    dispatch({ type: "form", updatedForm: val });
  };

  const [, saveImg] = useSaveImageMutation();

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: (dispatch: React.Dispatch<EditProfileAction>, value: number) => void,
    type: string
  ) => {
    const formData = new FormData();
    if (e.target.files) formData.append("image", e.target.files[0]);
    try {
      const r = await Axios.post(
        "https://api.imgbb.com/1/upload?key=2db0d9c5d05935a5409a79e77d415b70",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (p) => {
            fn(dispatch, (p.loaded * 100) / p.total);
          },
        }
      );
      const k = await saveImg({
        url: r.data.data.display_url,
        type,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(dispatch, { ...state.form, [name]: value });
  };

  useEffect(() => {
    setForm(dispatch, { bio: sBio, link: sLink });
  }, [JSON.stringify(profile)]);

  // useEffect(() => {
  //   if (profileProgress === 100) {
  //     setProfileProgress(1);
  //   } else {
  //     setCoverProgress(1);
  //   }
  // }, [profileProgress, coverProgress]);

  return (
    <Fragment>
      <Box>
        <Modal onClose={() => null} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <Box>
                  <Text>Cover Profile</Text>
                  <WrapperBox>
                    <Image
                      src={profile ? profile.cover_img : ""}
                      borderRadius="10px"
                    />
                    <Input
                      w="350px"
                      my="0.5rem"
                      type="file"
                      onChange={async (e) =>
                        await handleFile(e, setCoverProgress, "cover")
                      }
                      borderRadius="10px"
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
                  <Text>Profile Image</Text>
                  <WrapperBox>
                    <Image
                      src={profile ? profile.profile_img : ""}
                      w={"150px"}
                      height={"150px"}
                      borderRadius="150px"
                      objectFit="cover"
                    />
                    <Input
                      w="350px"
                      my="0.5rem"
                      type="file"
                      onChange={async (e) =>
                        await handleFile(e, setProfileProgress, "profile")
                      }
                    />
                    <Box className="mid" borderRadius="150px"></Box>
                  </WrapperBox>
                </Flex>
                <Box>
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

                <Flex w="350px" justifyContent="flex-end" mt="1rem">
                  <Button ml="1rem" onClick={submit}>
                    Save
                  </Button>
                  <Button ml="1rem" onClick={onClose}>
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
