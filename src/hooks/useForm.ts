import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { useStore } from "../zustand/store";

interface useFormI<T> {
  user: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useForm<T>(
  fieldObject: T,
  mutationFunction: (o: any) => Promise<any>,
  type?: string
): useFormI<T> {
  const [user, setUser] = useState<T>(fieldObject);
  const [{ data, fetching }] = useMeQuery();

  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutationFunction({ ...user });

    if (type === "LOGIN") {
      if (data?.me && !fetching) {
        setAuthenticated(true);
      }
    }
  };

  return { user, handleChange, handleSubmit };
}
