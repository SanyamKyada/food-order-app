import { useState } from "react";

export function useInput(defaultValue, validateFn) {
  const [didEdit, setDidEdit] = useState(false);
  const [enterdValue, setEnteredValue] = useState(defaultValue);

  const isValid = validateFn(enterdValue);

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = (event) => {
    setDidEdit(true);
  };

  return {
    value: enterdValue,
    handleInputBlur,
    handleInputChange,
    hasError: didEdit && !isValid,
  };
}
