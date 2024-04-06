import React, { useState } from "react";
import Modal from "../../Modal"; // Ensure to import the Modal component

export default function StateFilter({ statesList, setSelectedFilters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState([]);

  const handleCheckboxChange = (state) => {
    setSelectedStates((prevSelectedStates) => {
      if (prevSelectedStates.includes(state)) {
        // Remove the state from the selected states
        return prevSelectedStates.filter(
          (selectedState) => selectedState !== state
        );
      } else {
        // Add the state to the selected states
        return [...prevSelectedStates, state];
      }
    });
  };

  const handleApplyFilter = () => {
    // Set the selected states to the parent component's state
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      states: selectedStates,
    }));
    setIsModalOpen(false); // Close the modal after applying the filter
  };

  return (
    <div className="md:border-y-2 md:border-r-2 md:px-8 md:w-full md:p-4 text-slate-50 sm:col-span-2 place-self-center">
      <div className="font-bold  hidden md:block">States</div>
      {statesList.map((state) => (
        <div className="hidden md:block" key={state}>
          <input
            type="checkbox"
            id={`checkbox-${state}`}
            name={state}
            checked={selectedStates.includes(state)}
            onChange={() => handleCheckboxChange(state)}
            className="mr-2"
          />
          <label htmlFor={`checkbox-${state}`} className="ml-2">
            {state}
          </label>
        </div>
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 transition duration-300 md:mt-4 block md:hidden sm:inline md:hidden bg-slate-700 text-white p-2 px-4 rounded"
      >
        Select States
      </button>

      {/* The Modal component for multi-selection */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-bold text-lg text-slate-800 col-span-2">
            Select States
          </div>
          {statesList.map((state) => (
            <label
              key={state}
              className="col-span-1 text-slate-800 font-bold border-2 border-slate-400 p-2 rounded-lg "
            >
              <input
                type="checkbox"
                name={state}
                checked={selectedStates.includes(state)}
                onChange={() => handleCheckboxChange(state)}
                className="mr-2"
              />
              {state}
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}
