import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

export default function DatePickerComp({
  min,
  max,
  setSelectedFilters,
  selectedFilters,
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(min),
      endDate: new Date(max),
      key: "selection",
    },
  ]);
  // Function to format date to 'yyyy-mm-dd'
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  function dateChangeHandler(item) {
    console.log([item.selection]);
    setState([item.selection]);
    const { startDate, endDate } = item.selection;
    setSelectedFilters((prevState) => ({
      ...prevState,
      dates: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    }));
  }

  // useEffect(() => {
  //   // Since your state is an array, you should access the first item like so
  //   const { startDate, endDate } = state[0];

  //   console.log(state);
  //   if (startDate && endDate) {
  //     console.log("into this effect");
  //     setSelectedFilters((prevState) => ({
  //       ...prevState,
  //       dates: {
  //         startDate: formatDate(startDate),
  //         endDate: formatDate(endDate),
  //       },
  //     }));
  //     console.log(selectedFilters);
  //   }
  // }, [state, setSelectedFilters]);

  return (
    <DateRangePicker
      // onChange={(item) => setState([item.selection])}
      onChange={(item) => dateChangeHandler(item)}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      minDate={min}
      maxDate={max}
      months={1}
      ranges={state}
      direction="horizontal"
    />
  );
}
