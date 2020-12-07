import React, { useState } from "react";

interface useFormI<T> {
  user: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function useForm<T>(fieldObject: T, mutationFunction: any): useFormI<T> {
  const [user, setUser] = useState<T>(fieldObject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutationFunction({ ...user });
  };

  return { user, handleChange, handleSubmit };
}
