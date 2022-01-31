import React, { useEffect } from "react";
import { useInput } from "../../hooks/register.validation";

export function TextInput(props) {
  const textInput = useInput("", props.validators);

  useEffect(() => {
    if (textInput.inputValid) {
      props.setValue(textInput.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput.inputValid]);

  return (
    <>
      <div className="form-group--label-error">
        <label>{props.label}</label>

        {textInput.isDirty && textInput.isEmpty && <span>{textInput.errorMessage.isEmpty}</span>}
        {textInput.isDirty && !textInput.isEmpty && textInput.minLengthError && (
          <span>{textInput.errorMessage.minLength}</span>
        )}
        {textInput.isDirty && !textInput.isEmpty && textInput.emailError && (
          <span>{textInput.errorMessage.isEmail}</span>
        )}
        {textInput.isDirty && !textInput.isEmpty && !textInput.emailError && textInput.isTaken && (
          <span>{textInput.errorMessage.isTakenError}</span>
        )}
      </div>

      <input
        placeholder={props.placeholder}
        className={
          textInput.isDirty &&
          (textInput.isEmpty || textInput.minLengthError || textInput.emailError || textInput.isTaken)
            ? "error_input"
            : ""
        }
        onChange={(e) => textInput.onChange(e)}
        onBlur={(e) => textInput.onBlur(e)}
        value={textInput.value}
        name={props.name}
        id={props.name}
        type="text"
      ></input>
    </>
  );
}
