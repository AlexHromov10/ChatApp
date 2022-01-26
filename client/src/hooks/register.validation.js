import { useEffect, useState } from "react";

// Валидация полей при регистрации (или не только при ней...)
// В useInput поступает изначальное значение поля и обьекты валидации (например: {isEmpty:true})

const useValidation = (value, validations) => {
  const [inputValid, setInputValid] = useState(false);

  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    isEmpty: "",
    minLength: "",
    isEmail: "",
  });

  useEffect(() => {
    if (isEmpty || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, emailError]);

  useEffect(() => {
    const emailRegex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          if (value) {
            setEmpty(false);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              isEmpty: "",
            }));
          } else {
            setEmpty(true);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              isEmpty: "Поле не должно быть пустым!",
            }));
          }
          break;

        case "minLength":
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              minLength: `Введите не менее ${validations[validation]} символов`,
            }));
          } else {
            setMinLengthError(false);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              minLength: "",
            }));
          }
          break;

        case "emailError":
          if (!emailRegex.test(String(value).toLowerCase().trim())) {
            setEmailError(true);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              isEmail: "Некорректный e-mail!",
            }));
          } else {
            setEmailError(false);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              isEmail: "",
            }));
          }
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    inputValid,
    isEmpty,
    emailError,
    minLengthError,
    errorMessage,
  };
};

const useInput = (initValue, validations) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);

  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

export { useInput };
