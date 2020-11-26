import React, { useState } from "react";
import { OperationContext, OperationResult } from "urql";

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
    variables?: object | undefined,
    context?: Partial<OperationContext> | undefined
  ) => Promise<OperationResult<any, object>>,
  formType: "login" | "register"
): useFormI<T> {
  const [user, setUser] = useState<T>(fieldObject);
  const { email, password, username, phone } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "register") {
      await mutationFunction({ username, email, password, phone });
    } else {
      await mutationFunction({ email, password });
    }
  };

  return { user, handleChange, handleSubmit };
}
