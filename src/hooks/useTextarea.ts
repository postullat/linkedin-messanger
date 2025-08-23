import { useState, type ChangeEvent } from "react";

export const useTextarea = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return { value, onChange, reset, setValue };
};
