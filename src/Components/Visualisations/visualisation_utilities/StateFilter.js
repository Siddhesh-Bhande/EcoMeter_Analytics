import React, { useEffect, useState } from "react";
import Modal from "../../Modal"; // Ensure to import the Modal component

export default function StateFilter({
  statesList,
  setSelectedFilters,
  selectedFilters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedStates, setTempSelectedStates] = useState(
    selectedFilters.states
  );

  const handleCheckboxChange = (state) => {
    setTempSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleCloseModal = () => {
    // Update the selectedFilters with the temporary selections upon closing the modal
    setSelectedFilters((prev) => ({
      ...prev,
      states: tempSelectedStates,
    }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    // This will synchronize tempSelectedStates with selectedFilters.states
    // every time the selectedFilters.states changes outside this component.
    setTempSelectedStates(selectedFilters.states);
  }, [selectedFilters.states]);

  useEffect(() => {
    // Immediately update the selectedFilters with tempSelectedStates upon change
    setSelectedFilters((prev) => ({
      ...prev,
      states: tempSelectedStates,
    }));
  }, [tempSelectedStates]);

  return (
    <div className="md:border-y-2 md:border-r-2 md:px-8 md:w-full md:p-4 text-slate-80 sm:col-span-2 place-self-center">
      <div className="font-bold hidden md:block">States</div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 transition duration-300 md:mt-4 block md:hidden sm:inline bg-slate-700 text-white p-2 px-4 rounded"
      >
        Select States
      </button>

      {/* The Modal component for multi-selection */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="font-bold text-lg text-slate-800">Select States</div>
        {statesList.map((state) => (
          <label
            key={state}
            className="block text-slate-800 font-bold border-2 border-slate-400 p-2 rounded-lg text-center"
          >
            <input
              type="checkbox"
              name={state}
              checked={tempSelectedStates.includes(state)}
              onChange={() => handleCheckboxChange(state)}
              className="mr-2"
            />
            {state}
          </label>
        ))}
      </Modal>

      {/* Checkbox list (visible on larger screens) */}
      <div className="hidden md:block">
        {statesList.map((state) => (
          <div key={state} className="flex items-center">
            <input
              type="checkbox"
              id={`checkbox-${state}`}
              name={state}
              checked={tempSelectedStates.includes(state)}
              onChange={() => handleCheckboxChange(state)}
              className="mr-2"
            />
            <label htmlFor={`checkbox-${state}`} className="ml-2">
              {state}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
