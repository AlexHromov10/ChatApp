function generateYearsBetween(startYear = 1905) {
  let endDate = new Date().getFullYear();
  let years = [];
  for (var i = endDate; i >= startYear; i--) {
    years.push(endDate);
    endDate--;
  }
  return years;
}
const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const months = {
  1: "Январь",
  2: "Февраль",
  3: "Март",
  4: "Апрель",
  5: "Май",
  6: "Июнь",
  7: "Июль",
  8: "Август",
  9: "Сентябрь",
  10: "Октябрь",
  11: "Ноябрь",
  12: "Декабрь",
};

const daysOptions = days.map((day) => {
  return (
    <option key={day.toString()} value={day}>
      {day}
    </option>
  );
});

const monthsOptions = Object.entries(months).map(([key, value]) => {
  return (
    <option key={key.toString()} value={key}>
      {value}
    </option>
  );
});

const yearsOptions = generateYearsBetween().map((year) => {
  return (
    <option key={year.toString()} value={year}>
      {year}
    </option>
  );
});

const birth_date = (y, m, d) => {
  return `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`;
};

export { daysOptions, monthsOptions, yearsOptions, birth_date };
