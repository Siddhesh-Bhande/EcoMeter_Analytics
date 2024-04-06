import { useState } from "react";
import Register from "./Register";
import LoginUser from "./LoginUser";

export default function Loginform({
  setshowlogin,
  setUserLoggedIn,
  isUserLogged,
}) {
  const [newUser, setnewuser] = useState(false);

  function closepopup() {
    setshowlogin(false);
  }
  return (
    <div className="absolute grid popup w-screen h-full top-0 ">
      <div className="absolute h-full opacity-90 top-0 container-md z-10 login-container w-screen bg-gray-700"></div>
      <div className="place-self-center shadow-lg rounded-lg container-xs z-20 mt-16 opacity-100 bg-sky-100 m-auto">
        <span
          onClick={closepopup}
          className="flex object-center float-right mt-2 mr-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
        <h1 className="text-md text-center border-b-2 border-grey-400 p-2">
          Log in or Sign up
        </h1>
        {newUser ? (
          <Register setnewuser={setnewuser}></Register>
        ) : (
          <LoginUser
            setnewuser={setnewuser}
            setshowlogin={setshowlogin}
            setUserLoggedIn={setUserLoggedIn}
          ></LoginUser>
        )}
      </div>
    </div>
  );
}
