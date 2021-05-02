import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { setForm } from "../../actions/editProfileActions";
import { fileInput, modalStyles, textInput } from "../../constants/consts";
import { EditProfileProps, EditProfileState } from "../../constants/interfaces";
import {
  useEditProfileMutation,
  useProfileStuffAndUserTweetsQuery,
  useSaveImageMutation,
} from "../../generated/graphql";
import { uploadImagesAndSave } from "../../helpers/handleProfileImages";
import { notFetchingProfileAndHasProfile } from "../../helpers/notFetchingProfileAndHasProfile";
import { editProfileReducer } from "../../reducers/editProfileReducer";
import { Form } from "../auth/login/login.styles";
import { WrapperBox } from "./editprofile.styles";

export const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  isOpen,
  id,
  setRefreshToken,
}) => {
  const [
    { data: profileObj, fetching: fetchingProfile },
  ] = useProfileStuffAndUserTweetsQuery({ variables: { id } });

  const profile = notFetchingProfileAndHasProfile(fetchingProfile, profileObj)
    ? profileObj!.profileStuffAndUserTweets.profile
    : null;

  const initialState: EditProfileState = {
    form: { bio: "", link: "" },
    images: { profile_img: null, cover_img: null },
    savingProgress: 0,
  };

  const context = useReducer(editProfileReducer, initialState);
  const [state, dispatch] = context;

  const [, saveImg] = useSaveImageMutation();
  const [, save] = useEditProfileMutation();

  const submit = async () => {
    await uploadImagesAndSave(context, saveImg, save);
    setRefreshToken(uuid());
    dispatch({ type: "saving", updatedProgress: 0 });
    onClose();
  };

  useEffect(() => {
    if (notFetchingProfileAndHasProfile(fetchingProfile, profileObj)) {
      const profile = profileObj!.profileStuffAndUserTweets.profile;
      setForm(dispatch, { bio: profile.bio, link: profile.link });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(profileObj)]);

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
                colorScheme="blue"
              />
            )}
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <Flex
                  mt="20px"
                  w="100%"
                  flexDir="column"
                  alignItems="flex-start"
                >
                  <Text mb="5px">Cover Profile</Text>
                  <WrapperBox>
                    {profile && profile.cover_img !== "" ? (
                      <Fragment>
                        <Image
                          src={profile ? profile.cover_img : ""}
                          borderRadius="10px"
                        />
                        <Input name="cover_img" {...fileInput(context)} />
                        <Box className="mid" borderRadius="10px"></Box>
                      </Fragment>
                    ) : (
                      <Box w="400px" h="150px" bg="black" borderRadius="10px">
                        <Input name="cover_img" {...fileInput(context)} />
                        <Box className="mid" borderRadius="10px"></Box>
                      </Box>
                    )}
                  </WrapperBox>
                </Flex>
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
                    <Input name="profile_img" {...fileInput(context)} />
                    <Box className="mid" borderRadius="150px"></Box>
                  </WrapperBox>
                </Flex>
                <Box>
                  <Text>Bio</Text>
                  <Input
                    name="bio"
                    placeholder="Bio"
                    value={state.form.bio}
                    {...textInput(context)}
                  />
                </Box>
                <Box>
                  <Text>Link</Text>
                  <Input
                    name="link"
                    placeholder="Link"
                    value={state.form.link}
                    {...textInput(context)}
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
