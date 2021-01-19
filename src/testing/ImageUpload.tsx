import React, { Fragment } from "react";
import { useUploadImageMutation } from "../generated/graphql";

interface ImageUploadProps {}
export const ImageUpload: React.FC<ImageUploadProps> = () => {
  const k = useUploadImageMutation();
  console.log(k);
  return (
    <Fragment>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files);
          // @ts-ignore
          k[1]({ picture: e.target.files[0] });
        }}
      />
    </Fragment>
  );
};
