import React, { Fragment, useState } from "react";
import { useEditProfileMutation } from "../../generated/graphql";
import { useStore } from "../../zustand/store";
import {
  BackDrop,
  CloseEditProfile,
  EditProfileContainer,
  EditProfileForm,
  EditProfileHeading,
  Input,
  InputI,
  LabelI,
  SubmitBtn,
  SubmitContainer,
} from "./editprofile.styles";

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

  const [, save] = useEditProfileMutation();
  const submit = () => {
    save({ bio: formBio, link: linkBio });
  };

  return (
    <Fragment>
      <EditProfileContainer>
        <EditProfileHeading>
          <span>Edit Profile</span>
          <CloseEditProfile onClick={() => toggle(false)}></CloseEditProfile>
        </EditProfileHeading>
        <EditProfileForm>
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
