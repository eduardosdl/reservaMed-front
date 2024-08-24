import { useState } from 'react';

interface inputError {
  field: string;
  message: string;
}

export default function useErrors() {
  const [errors, setErrors] = useState<inputError[]>([]);

  function setError({ field, message }:inputError) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(field: string) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  }

  function getErrorMessageByFieldName(fieldName:string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
}