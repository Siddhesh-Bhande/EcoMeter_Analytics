import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState, useEffect, useContext, useRef } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";

import DatePickerModal from "./DatePickerModal";
import StateFilter from "./visualisation_utilities/StateFilter";
import SourceFilter from "./SourceFilter";
import RE_Charts from "./energy_charts/RE_Charts";
import { AuthContext } from "../User/AuthContext";

export default function Renewableenergy() {
  const chartsRef = useRef();
  const [energy_data, setenergydata] = useState(null);
  const [statesList, setstateslist] = useState([]);
  const { token } = useContext(AuthContext);
  const [energySources, setenergySources] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    states: [],
    sources: [],
    dates: { startDate: null, endDate: null },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedFilters.sources.length > 0) {
      selectedFilters.sources.forEach((source) =>
        queryParams.append("sources", source)
      );
    }

    if (selectedFilters.states.length > 0) {
      selectedFilters.states.forEach((state) =>
        queryParams.append("states", state)
      );
    }

    if (selectedFilters.dates.startDate) {
      queryParams.append("startDate", selectedFilters.dates.startDate);
    }

    if (selectedFilters.dates.endDate) {
      queryParams.append("endDate", selectedFilters.dates.endDate);
    }

    const fetchURL = `http://127.0.0.1:8000/get-energy-data?${queryParams.toString()}`;
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        setenergydata(data);
        console.log(data);
        // Conditional logic for setting stateslist and energySources
        if (
          selectedFilters.sources.length === 0 &&
          selectedFilters.states.length === 0
        ) {
          setstateslist(Array.from(new Set(data.map((item) => item.state))));
          setenergySources(
            Array.from(new Set(data.map((item) => item.energy_source)))
          );
        }
      });
  }, [selectedFilters]);

  // useEffect(() => {
  //   if (
  //     selectedFilters.sources.length == 0 &&
  //     selectedFilters.states.length == 0
  //   ) {
  //     fetch("http://127.0.0.1:8000/get-energy-data")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setenergydata(data);
  //         console.log(data);
  //         setstateslist(Array.from(new Set(data.map((item) => item.state))));
  //         setenergySources(
  //           Array.from(new Set(data.map((item) => item.energy_source)))
  //         );
  //       });
  //   } else {
  //     // Construct the query parameters based on filters
  //     const queryParams = new URLSearchParams();
  //     selectedFilters.states.forEach((state) =>
  //       queryParams.append("states", state)
  //     );
  //     selectedFilters.sources.forEach((source) =>
  //       queryParams.append("sources", source)
  //     );

  //     fetch(`http://127.0.0.1:8000/get-energy-data?${queryParams.toString()}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setenergydata(data);
  //         if (!queryParams.toString()) {
  //           // Update states and sources lists only if no filters are applied
  //           setstateslist(Array.from(new Set(data.map((item) => item.state))));
  //           setenergySources(
  //             Array.from(new Set(data.map((item) => item.energy_source)))
  //           );
  //         }
  //       });
  //   }
  // }, [selectedFilters]);

  async function saveFilters(filters) {
    const response = await fetch("http://localhost:8000/update-user-filters/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ filters }), // Adjusted to match the expected structure
    });

    if (!response.ok) {
      console.error("Failed to save filters", await response.text());
    } else {
      console.log("Filters saved successfully");
    }
  }

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
        setenergydata(data);
        if (!queryParams.toString()) {
          // Update states and sources lists only if no filters are applied
          setstateslist(Array.from(new Set(data.map((item) => item.state))));
          setenergySources(
            Array.from(new Set(data.map((item) => item.energy_source)))
          );
        }
      });
    saveFilters(selectedFilters);
  };

  const downloadPDF = () => {
    html2canvas(chartsRef.current, { scale: 2, scrollY: -window.scrollY }).then(
      (canvas) => {
        const pdf = new jsPDF({
          orientation: "landscape",
        });

        // Set the title and date at the top of the PDF
        pdf.setFontSize(20);
        pdf.text("Personalized Report Generated by Ecometer Analytics", 20, 20);
        pdf.setFontSize(10);
        pdf.text(`Date: ${format(new Date(), "PPP")}`, 20, 30);

        // Calculate the ratio to fit the content in one page
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pageWidth = pdf.internal.pageSize.getWidth() - 40; // 20 units margin on each side
        const pageHeight = pdf.internal.pageSize.getHeight() - 60; // Considering margins top and bottom
        const ratio = Math.min(
          pageWidth / contentWidth,
          pageHeight / contentHeight
        );

        // Calculate scaled dimensions
        const canvasWidthOnPdf = contentWidth * ratio;
        const canvasHeightOnPdf = contentHeight * ratio;

        const imgData = canvas.toDataURL("image/png");
        // Add the canvas image to the PDF, scaled to fit the page
        pdf.addImage(
          imgData,
          "PNG",
          20,
          40,
          canvasWidthOnPdf,
          canvasHeightOnPdf
        );

        pdf.save("download.pdf");
      }
    );
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(energy_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Energy Data");
    XLSX.writeFile(wb, "energy_data.xlsx");
  };

  return (
    <div className="chartdiv grid grid-cols-10 md:m-16 gap-4 sm:m-6">
      <div className="md:col-span-2 sm:col-span-10 xs:col-span-10 md:mr-4 md:block sm:grid sm:grid-cols-8 sm:gap-3 md:overflow-x-hidden sm:overflow-x-scroll">
        <div className="datepicker md:block md:border-t-2 md:border-r-2 text-center md:w-full sm:col-span-1 place-self-center">
          {energy_data != null && (
            <DatePickerModal
              energy_data={energy_data}
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
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
          selectedFilters={selectedFilters}
        ></StateFilter>
        <div className="md:border-r-2 md:w-full p-4 text-slate-50 md:border-y-2 md:px-16 sm:col-span-2 place-self-center">
          <button
            onClick={() => fetchFilteredData()}
            className="text-center bg-sky-400 rounded-md p-2 hover:bg-sky-600 transition"
          >
            Save Filter
          </button>
          <button className="text-slate-500" onClick={downloadPDF}>
            Download PDF
          </button>
          <button className="text-slate-500" onClick={downloadExcel}>
            Download Excel
          </button>
        </div>
      </div>
      {energy_data && (
        <div
          className="md:col-span-8 grid md:grid-cols-8 sm:grid-cols-5 gap-8 sm:col-span-10"
          ref={chartsRef}
        >
          <RE_Charts energy_data={energy_data}></RE_Charts>
        </div>
      )}
    </div>
  );
}
