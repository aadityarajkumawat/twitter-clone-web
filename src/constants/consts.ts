import { EditProfileContext } from "./interfaces";
import { handleChange } from "../helpers";
import { handleFileChange } from "../helpers/handleFileChange";

export const modalStyles: React.CSSProperties = {
  backgroundColor: "#2e2e2e",
  color: "#eee",
};

export const fileInput = (context: EditProfileContext) => ({
  w: "400px",
  my: "0.5rem",
  type: "file",
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFileChange(e, context),
});

export const textInput = (context: EditProfileContext) => ({
  w: "400px",
  my: "0.5rem",
  type: "text",
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e, context),
});

export const PAGINATE_USER_PROFILE = 10;
export const PAGINATE_HOME = 15;
