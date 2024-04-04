import { useState } from "react";
import Profile from "./Header/Profile";
import Loginform from "./User/Loginform";

export default function Energyexplorer() {
  const [showLoginForm, setshowlogin] = useState(false);

  return (
    <>
      <Profile setshowlogin={setshowlogin}></Profile>
      {showLoginForm ? (
        <Loginform setshowlogin={setshowlogin}></Loginform>
      ) : (
        console.log("Login not required")
      )}
    </>
  );
}
