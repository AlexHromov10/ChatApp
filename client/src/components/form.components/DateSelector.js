import React, { useEffect } from "react";
import { useInput } from "../../hooks/register.validation";
const { daysOptions, monthsOptions, yearsOptions, birth_date } = require("../../constants/selector.constants");

export function DateSelector(props) {
  const daySelect = useInput("", { isEmpty: true, selectDefaultError: true });
  const monthSelect = useInput("", { isEmpty: true, selectDefaultError: true });
  const yearSelect = useInput("", { isEmpty: true, selectDefaultError: true });

  useEffect(() => {
    if (daySelect.inputValid && monthSelect.inputValid && yearSelect.inputValid) {
      props.setDateValid(true);
      birth_date(yearSelect.value, monthSelect.value, daySelect.value);
    } else {
      props.setDateValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daySelect.inputValid, monthSelect.inputValid, yearSelect.inputValid]);

  return (
    <>
      <div className="form-group--label-error">
        <label>Дата рождения</label>
        {((yearSelect.isDirty && yearSelect.selectError) ||
          (monthSelect.isDirty && monthSelect.selectError) ||
          (daySelect.isDirty && daySelect.selectError)) && <span>Некорректная дата</span>}
      </div>

      <div className="form-group-date">
        <select
          onClick={(e) => daySelect.onClickSelector(e)}
          name="day"
          id="day"
          className={daySelect.isDirty && daySelect.selectError ? "error_input" : ""}
        >
          <option value="NONE" defaultValue={"NONE"}>
            День
          </option>
          {daysOptions}
        </select>

        <select
          onClick={(e) => monthSelect.onClickSelector(e)}
          name="month"
          id="month"
          className={monthSelect.isDirty && monthSelect.selectError ? "error_input" : ""}
        >
          <option value="NONE" defaultValue={"NONE"}>
            Месяц
          </option>
          {monthsOptions}
        </select>

        <select
          onClick={(e) => yearSelect.onClickSelector(e)}
          name="year"
          id="year"
          className={yearSelect.isDirty && yearSelect.selectError ? "error_input" : ""}
        >
          <option value="NONE" defaultValue={"NONE"}>
            Год
          </option>
          {yearsOptions}
        </select>
      </div>
    </>
  );
}
