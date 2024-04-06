export default function ({
  setShowRETrends,
  setShowENVTrends,
  setShowWeatherTrends,
}) {
  function clickHandler(e) {
    console.log(e.target.innerText);
    if (e.target.innerText == "Renewable Energy Trends") {
      setShowRETrends(true);
      setShowENVTrends(false);
      setShowWeatherTrends(false);
    } else if (e.target.innerText == "Environmental Trends") {
      setShowRETrends(false);
      setShowENVTrends(true);
      setShowWeatherTrends(false);
    } else {
      setShowRETrends(false);
      setShowENVTrends(false);
      setShowWeatherTrends(true);
    }
  }

  return (
    <div className="grid grid-cols-3 sm:gap-2 gap-2 md:gap-4 md:w-2/4 md:m-auto m-6 place-self-center">
      <button
        onClick={(e) => clickHandler(e)}
        className="font-bold text-gray-500 bg-gray-50 md:p-4 py-2 md:rounded-full sm:rounded-1/2 hover:bg-gray-200 transition hover:-translate-x-1 hover:translate-x-1 hover:shadow-md md:col-span-1 col-span-3"
      >
        Renewable Energy Trends
      </button>
      <button
        onClick={(e) => clickHandler(e)}
        className="font-bold text-gray-500 bg-gray-50 md:p-4 py-2 md:rounded-full sm:rounded-1/2 hover:bg-gray-200 transition hover:-translate-x-1 hover:translate-x-1 hover:shadow-md md:col-span-1 col-span-3"
      >
        Environmental Trends
      </button>
      <button
        onClick={(e) => clickHandler(e)}
        className="font-bold text-gray-500 bg-gray-50 md:p-4 py-2 md:rounded-full sm:rounded-1/2 hover:bg-gray-200 transition hover:-translate-x-1 hover:translate-x-1 hover:shadow-md md:col-span-1 col-span-3"
      >
        Weather Trends
      </button>
    </div>
  );
}
