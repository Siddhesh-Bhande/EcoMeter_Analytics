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
    <div className="float-right z-0 mt-8 mr-16">
      <div
        onClick={profileClickHandler}
        className="z-0 cursor-pointer flex flex-row w-16 border-2 py-1 px-2 rounded-xl hover:bg-slate-100 bg-sky-100 relative"
      >
        <span className="burgericon basis-1/2 place-content-center">
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
        </span>
        <span className="profile inline-block basis-1/2 place-content-center">
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
      </div>
      {showLogoutButton && (
        <button
          className="absolute right-14 top-7 bg-sky-100 px-4 p-2 font-bold text-slate-800 border-none rounded-lg transition-transform transform hover:scale-110"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </div>
  );
}
