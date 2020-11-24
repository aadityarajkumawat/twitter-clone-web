import { MutationFunctionOptions, FetchResult } from "@apollo/client";
import React, { useState } from "react";

interface useFormI<T> {
  user: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FormParams {
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export function useForm<T extends FormParams>(
  fieldObject: T,
  mutationFunction: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  formType: "login" | "register"
): useFormI<T> {
  const [user, setUser] = useState<T>(fieldObject);
  const { email, password, username, phone } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "register") {
      mutationFunction({ variables: { username, email, password, phone } });
    } else {
      mutationFunction({ variables: { email, password } });
    }
  };

  return { user, handleChange, handleSubmit };
}
