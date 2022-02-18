import { useEffect, useState } from "react";
import configData from "../config.json";

// Валидация полей при регистрации (или не только при ней...)
// В useInput поступает изначальное значение поля и обьекты валидации (например: {isEmpty:true})

const useValidation = (value, isDirty, validations) => {
  const [inputValid, setInputValid] = useState(false);

  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [isTaken, setIsTaken] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    isEmpty: "",
    minLength: "",
    isEmail: "",
    selError: "",
    isTakenError: "",
  });

  useEffect(() => {
    if (isEmpty || minLengthError || emailError || selectError || isTaken) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, emailError, selectError, isTaken]);

  const fetchIsTaken = async (url, fieldToCheck, value) => {
    if (fieldToCheck.length <= 0) {
      return;
    }
    const data = { [fieldToCheck]: value };
    //if (data !== "") {
    const response = await fetch(configData.SERVER_URL + url /* "/auth/checkemail" */, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
    //}
  };

  useEffect(() => {
    const emailRegex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i;

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
              isEmpty: "Данное поле не должно быть пустым",
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
              isEmail: "Некорректный e-mail",
            }));
          } else {
            setEmailError(false);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              isEmail: "",
            }));
          }
          break;

        case "selectDefaultError":
          if (value === "NONE") {
            setSelectError(true);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              selError: "Некорректная дата",
            }));
          } else {
            setSelectError(false);
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              selError: "",
            }));
          }
          break;

        case "isTaken":
          if (
            !emailError &&
            !minLengthError &&
            validations[validation].fieldToCheck /*&&
            validations[validation].value*/
          ) {
            (async () => {
              try {
                const jsonData = await fetchIsTaken(
                  validations[validation].url,
                  validations[validation].fieldToCheck,
                  value
                );
                if (jsonData["success"]) {
                  //console.log("OK");
                  if (isTaken) {
                    setIsTaken(false);
                    setErrorMessage((errorMessage) => ({
                      ...errorMessage,
                      isTakenError: "",
                    }));
                  }
                } else {
                  if (!isTaken) {
                    setIsTaken(true);
                    setErrorMessage((errorMessage) => ({
                      ...errorMessage,
                      isTakenError: jsonData["message"],
                    }));
                  }
                }
              } catch (error) {
                console.log(error);
              }
            })();
          }
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isDirty]);

  useEffect(() => {}, []);

  return {
    inputValid,
    isEmpty,
    emailError,
    minLengthError,
    selectError,
    isTaken,
    errorMessage,
  };
};

const useInput = (initValue, validations) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);

  const valid = useValidation(value, isDirty, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  const onClickSelector = (e) => {
    setDirty(true);
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    onClickSelector,
    ...valid,
  };
};

export { useInput };
