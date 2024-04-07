import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import DatePickerComp from "./visualisation_utilities/DatePickerComp";

const DatePickerModal = ({
  energy_data,
  setSelectedFilters,
  selectedFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setdateRange] = useState({ minDate: "", maxDate: "" });

  const getMinMaxDates = (energy_data) => {
    console.log(energy_data);
    const dates = energy_data.map((item) => new Date(item.recorded_time));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    console.log(minDate, maxDate);

    setdateRange({ minDate: minDate, max: maxDate });
  };

  useEffect(() => {
    getMinMaxDates(energy_data);
  }, [energy_data]);

  return (
    <div className="md:p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300  sm:block md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300  hidden sm:hidden md:block "
      >
        Calender Pick
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <DatetimePicker min={min} max={max} /> */}
        <DatePickerComp
          min={dateRange.minDate}
          max={dateRange.maxDate}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        ></DatePickerComp>
      </Modal>
    </div>
  );
};

export default DatePickerModal;
