import { useState, type ChangeEvent } from "react";

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return { value, onChange, reset, setValue };
};
