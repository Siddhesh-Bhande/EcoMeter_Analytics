export default function Posters({ isUserLogged, setshowlogin }) {
  function showEnergyData() {
    if (isUserLogged) {
      console.log("Can show data");
    } else {
      setshowlogin(true);
    }
  }

  return (
    <div className="sm:grid-cols-1 ">
      <div className="font-bold p-4 md:px-32 col-span-1 box shadow-sm border-2 text-center border-emerald-800 rounded-md shadow-gray-200">
        <div className="text-4xl text-emerald-500">Renewable Energy Trends</div>
        <div className="font-serif my-4 text-justify">
          Ecometer allows you to access and monitor your office and industry
          energy consumption, anytime from anywhere which makes energy saving
          easier. ECOMETER focuses on sustainability through IoT technology and
          expert insights.
        </div>
        <button
          onClick={showEnergyData}
          className="text-emerald-50 bg-emerald-600 px-8 py-2 rounded-md text-2xl transition hover:translate-x-2 hover:-translate-x-2"
        >
          See Analytics
        </button>
      </div>
    </div>
  );
}
