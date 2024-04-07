import React, { useEffect, useState } from "react";
import Modal from "../Modal"; // Ensure to import the Modal component

export default function SourceFilter({
  energySources,
  setSelectedFilters,
  selectedFilters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedSources, setTempSelectedSources] = useState(
    selectedFilters.sources
  );

  const handleCheckboxChange = (source) => {
    setTempSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleCloseModal = () => {
    // Update the selectedFilters with the temporary selections upon closing the modal
    setSelectedFilters((prev) => ({
      ...prev,
      sources: tempSelectedSources,
    }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSelectedFilters((prev) => ({
      ...prev,
      sources: tempSelectedSources,
    }));
    console.log(selectedFilters);
  }, [tempSelectedSources]);

  return (
    <div className="md:border-y-2 md:border-sky-50 md:border-r-2 md:w-full sm:p-2 md:px-8 text-emrald-800 sm:col-span-3 place-self-center">
      <div className="font-bold hidden md:block">Energy Source</div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="sm:block md:hidden bg-slate-700 text-white p-2 px-4 rounded"
      >
        Energy Source
      </button>

      {/* The Modal component for multi-selection */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="font-bold text-lg text-slate-800">Select Sources</div>
        {energySources.map((source) => (
          <label
            key={source}
            className="block text-slate-800 font-bold border-2 border-slate-400 p-2 rounded-lg text-center"
          >
            <input
              type="checkbox"
              name={source}
              checked={tempSelectedSources.includes(source)}
              onChange={() => handleCheckboxChange(source)}
              className="mr-2"
            />
            {source}
          </label>
        ))}
      </Modal>

      {/* Checkbox list (visible on larger screens) */}
      <div className="hidden md:block">
        {energySources.map((source) => (
          <div key={source} className="flex items-center">
            <input
              type="checkbox"
              id={`checkbox-${source}`}
              name={source}
              checked={tempSelectedSources.includes(source)}
              onChange={() => handleCheckboxChange(source)}
              className="text-sky-500"
            />
            <label htmlFor={`checkbox-${source}`} className="ml-2">
              {source}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
