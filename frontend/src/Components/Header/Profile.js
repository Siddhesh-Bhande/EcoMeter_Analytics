import React, { useState, useContext } from "react";
import { AuthContext } from "../User/AuthContext";

export default function Profile({
  setshowlogin,
  isUserLogged,
  setUserLoggedIn,
}) {
  const { logout } = useContext(AuthContext);
  const [showLogoutButton, setShowLogoutButton] = useState(
    isUserLogged ? true : false
  );

  const handleLogout = () => {
    logout();
    setShowLogoutButton(false);
    setUserLoggedIn(false);
  };

  function profileClickHandler() {
    if (!isUserLogged) {
      setshowlogin(true);
    } else {
      setShowLogoutButton(!showLogoutButton); // Toggle the showLogoutButton state
    }
  }

  return (
    <div className="h-20 bg-emerald-500 w-full -mb-2">
      <div className="float-left grid grid-cols-9 w-24 font-serif ml-4">
        <h1 className=" text-3xl m-6 ml-8 font-bold text-white col-span-3">
          Ec
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-8 h-8 col-span-2 m-6 mt-6 ml-9"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-3xl mt-6 mb-1 ml-11 font-bold text-white  col-span-4">
          Meter
        </h1>
      </div>
      <h1 className="float-left text-xl mt-12 ml-9 font-bold text-white  col-span-4 font-serif">
        analytics
      </h1>
      <div className="float-right z-0 mt-4 mr-10">
        <div
          onClick={profileClickHandler}
          className="z-0 cursor-pointer flex flex-row hover:translate-x-1 transition relative"
        >
          {/* <span className="burgericon basis-1/2 place-content-center">
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span> */}
          <span className="profile inline-block basis-1/2 place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {showLogoutButton && (
          <button
            className="absolute right-24 top-5 bg-white px-4 p-2 font-bold text-emerald-800 border-none rounded-lg transition-transform transform-1 hover:scale-110 duration-2000"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
