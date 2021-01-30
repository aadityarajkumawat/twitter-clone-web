import React, { Fragment, useState } from "react";
import {
  useEditProfileMutation,
  useGetProfileImageQuery,
  useSaveImageMutation,
} from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import {
  BackDrop,
  CloseEditProfile,
  EditProfileContainer,
  EditProfileForm,
  EditProfileHeading,
  Icon,
  ImageInput,
  ImageInputWrapper,
  Input,
  InputI,
  LabelI,
  PseudoLabel,
  SubmitBtn,
  SubmitContainer,
} from "./editprofile.styles";
import Axios from "axios";

interface EditProfileI {
  bio: string;
  link: string;
}

interface EditProfileProps {
  bio: string;
  link: string;
}

export const EditProfile: React.FC<EditProfileProps> = ({ bio, link }) => {
  const toggle = useStore((state) => state.toggleEditProfile);
  const [form, setForm] = useState<EditProfileI>({ bio, link });
  const { bio: formBio, link: linkBio } = form;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const [progress, setProgress] = useState<number>(0);

  const [, save] = useEditProfileMutation();
  const submit = () => {
    save({ bio: formBio, link: linkBio });
  };

  const [, saveImg] = useSaveImageMutation();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            console.log((p.loaded * 100) / p.total);
          },
        }
      );
      await saveImg({
        url: r.data.data.display_url,
        type: "profile",
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Fragment>
      <EditProfileContainer>
        <EditProfileHeading>
          <span>Edit Profile</span>
          <CloseEditProfile onClick={() => toggle(false)}></CloseEditProfile>
        </EditProfileHeading>
        <EditProfileForm>
          <ImageInputWrapper>
            <PseudoLabel>Change Profile Image</PseudoLabel>
            <Icon></Icon>
            <ImageInput type="file" onChange={handleFile} />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <PseudoLabel>Change Cover Image</PseudoLabel>
            <Icon></Icon>
            <ImageInput type="file" onChange={handleFile} />
          </ImageInputWrapper>
          <Input>
            <LabelI>Bio</LabelI>
            <InputI
              type="text"
              onChange={handleChange}
              name="bio"
              value={formBio}
            />
          </Input>
          <Input>
            <LabelI>Link</LabelI>
            <InputI
              type="text"
              onChange={handleChange}
              name="link"
              value={linkBio}
            />
          </Input>
        </EditProfileForm>
        <SubmitContainer>
          <SubmitBtn onClick={submit}>Edit Profile</SubmitBtn>
        </SubmitContainer>
      </EditProfileContainer>
      <BackDrop onClick={() => toggle(false)}></BackDrop>
    </Fragment>
  );
};
