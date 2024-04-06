import { useState, useEffect } from "react";
import DatePickerModal from "./DatePickerModal";
import StateFilter from "./visualisation_utilities/StateFilter";
import SourceFilter from "./SourceFilter";
import RE_Charts from "./energy_charts/RE_Charts";

export default function Renewableenergy() {
  const [dateRange, setdateRange] = useState({ minDate: "", maxDate: "" });
  const [energy_data, setenergydata] = useState(null);
  const [statesList, setstateslist] = useState([]);
  const [energySources, setenergySources] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    states: [],
    sources: [],
  });

  const getMinMaxDates = (data) => {
    const dates = data.map((item) => new Date(item.recorded_time));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    console.log(minDate, maxDate);
    const format = (date) => date.toISOString().split("T")[0];

    setdateRange({ minDate: format(minDate), max: format(maxDate) });
  };

  useEffect(() => {
    if (
      selectedFilters.sources.length == 0 &&
      selectedFilters.states.length == 0
    ) {
      fetch("http://127.0.0.1:8000/get-energy-data")
        .then((res) => res.json())
        .then((data) => {
          getMinMaxDates(data);
          setenergydata(data);
          console.log(data);
          setstateslist(Array.from(new Set(data.map((item) => item.state))));
          setenergySources(
            Array.from(new Set(data.map((item) => item.energy_source)))
          );
        });
    } else {
      // Construct the query parameters based on filters
      const queryParams = new URLSearchParams();
      selectedFilters.states.forEach((state) =>
        queryParams.append("states", state)
      );
      selectedFilters.sources.forEach((source) =>
        queryParams.append("sources", source)
      );

      fetch(`http://127.0.0.1:8000/get-energy-data?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          getMinMaxDates(data);
          setenergydata(data);
          if (!queryParams.toString()) {
            // Update states and sources lists only if no filters are applied
            setstateslist(Array.from(new Set(data.map((item) => item.state))));
            setenergySources(
              Array.from(new Set(data.map((item) => item.energy_source)))
            );
          }
        });
    }
  }, [selectedFilters]);

  const fetchFilteredData = () => {
    // Construct the query parameters based on filters
    const queryParams = new URLSearchParams();
    selectedFilters.states.forEach((state) =>
      queryParams.append("states", state)
    );
    selectedFilters.sources.forEach((source) =>
      queryParams.append("sources", source)
    );

    fetch(`http://127.0.0.1:8000/get-energy-data?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        getMinMaxDates(data);
        setenergydata(data);
        if (!queryParams.toString()) {
          // Update states and sources lists only if no filters are applied
          setstateslist(Array.from(new Set(data.map((item) => item.state))));
          setenergySources(
            Array.from(new Set(data.map((item) => item.energy_source)))
          );
        }
      });
  };

  return (
    <div className="chartdiv grid grid-cols-10 md:m-16 gap-4 sm:m-6">
      <div className="md:col-span-2 sm:col-span-10 xs:col-span-10 md:mr-4 md:block sm:grid sm:grid-cols-8 sm:gap-3 md:overflow-x-hidden sm:overflow-x-scroll">
        <div className="datepicker md:block md:border-t-2 md:border-r-2 text-center md:w-full p-4 sm:col-span-1 place-self-center">
          {dateRange.maxDate != "" && dateRange.minDate != "" && (
            <DatePickerModal
              min={dateRange.minDate}
              max={dateRange.maxDate}
            ></DatePickerModal>
          )}
        </div>
        <SourceFilter
          energySources={energySources}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        ></SourceFilter>
        <StateFilter
          statesList={statesList}
          setSelectedFilters={setSelectedFilters}
        ></StateFilter>
        <div className="md:border-r-2 md:w-full p-4 text-slate-50 md:border-y-2 md:px-16 sm:col-span-2 place-self-center">
          <button
            onClick={() => fetchFilteredData()}
            className="text-center bg-sky-400 rounded-md p-2 hover:bg-sky-600 transition"
          >
            Save Filter
          </button>
        </div>
      </div>
      {energy_data && <RE_Charts energy_data={energy_data}></RE_Charts>}
    </div>
  );
}
