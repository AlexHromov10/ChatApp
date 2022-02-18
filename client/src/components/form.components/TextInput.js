import React, { useEffect } from "react";
import { useInput } from "../../hooks/register.validation";

export function TextInput(props) {
  const input = useInput("", props.validators);

  useEffect(() => {
    //console.log(textInput.inputValid);
    if (input.inputValid) {
      props.setValue(true);
      //console.log(textInput.value);
    } else {
      props.setValue(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.inputValid /* , textInput.value*/]);

  return (
    <>
      <div className="form-group--label-error">
        <label>{props.label}</label>

        {input.isDirty && input.isEmpty && <span>{input.errorMessage.isEmpty}</span>}
        {input.isDirty && !input.isEmpty && input.minLengthError && <span>{input.errorMessage.minLength}</span>}
        {input.isDirty && !input.isEmpty && input.emailError && <span>{input.errorMessage.isEmail}</span>}
        {input.isDirty && !input.isEmpty && !input.emailError && input.isTaken && (
          <span>{input.errorMessage.isTakenError}</span>
        )}
      </div>

      <input
        placeholder={props.placeholder}
        className={
          input.isDirty && (input.isEmpty || input.minLengthError || input.emailError || input.isTaken)
            ? "error_input"
            : ""
        }
        onChange={(e) => input.onChange(e)}
        onBlur={(e) => input.onBlur(e)}
        value={input.value}
        name={props.name}
        id={props.name}
        type={props.type}
      ></input>
    </>
  );
}
