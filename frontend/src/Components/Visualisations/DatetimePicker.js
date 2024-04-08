import React from "react";

const DatetimePicker = ({ min, max, onChange }) => {
  return (
    <input
      type="datetime-local"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      min={min}
      max={max}
      onChange={onChange}
    />
  );
};

export default DatetimePicker;
