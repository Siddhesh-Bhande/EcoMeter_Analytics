export default function Posters({ isUserLogged, setshowlogin }) {
  function showEnergyData() {
    if (isUserLogged) {
      console.log("Can show data");
    } else {
      setshowlogin(true);
    }
  }
  function showEnvironmentData() {
    if (isUserLogged) {
      console.log("Can show data");
    } else {
      setshowlogin(true);
    }
  }
  function showWeatherData() {
    if (isUserLogged) {
      console.log("Can show data");
    } else {
      setshowlogin(true);
    }
  }
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 m-16 gap-8">
      <div className="bg-sky-100 font-bold p-4 col-span-1 box shadow-sm rounded-lg shadow-gray-200 hover:bg-sky-200 transition hover:-translate-y-1  grid place-items-center hover:border-2 hover:border-sky-800">
        <div className="text-center">Renewable Energy Trends</div>
        <div className="font-normal my-4 text-justify">
          Check out data analysis and trends on generation and consumption of
          Renewable Energy
        </div>
        <button
          onClick={showEnergyData}
          className="text-sky-50 bg-sky-800 p-2 place-self-center rounded-lg"
        >
          See Analytics
        </button>
      </div>
      <div className="bg-sky-100 font-bold p-4 col-span-1 xs:col-span-3 box shadow-sm rounded-lg shadow-gray-200 hover:bg-sky-200 transition hover:-translate-y-1  grid place-items-center hover:border-2 hover:border-sky-800">
        <div className="text-center">Renewable Energy Trends</div>
        <div className="font-normal my-4 text-justify">
          Check out data analysis and trends on generation and consumption of
          Renewable Energy
        </div>
        <button
          onClick={showEnvironmentData}
          className="text-sky-50 bg-sky-800 p-2 place-self-center  rounded-lg"
        >
          See Analytics
        </button>
      </div>
      <div className="bg-sky-100 font-bold p-4 col-span-1 xs:col-span-3 box shadow-sm rounded-lg shadow-gray-200 hover:bg-sky-200 transition hover:-translate-y-1  grid place-items-center hover:border-2 hover:border-sky-800">
        <div className="text-center">Renewable Energy Trends</div>
        <div className="font-normal my-4 text-justify">
          Check out data analysis and trends on generation and consumption of
          Renewable Energy
        </div>
        <button
          onClick={showWeatherData}
          className="text-sky-50 bg-sky-800 p-2 place-self-center  rounded-lg"
        >
          See Analytics
        </button>
      </div>
    </div>
  );
}
