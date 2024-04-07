import { useContext, useState, useEffect } from "react";
import Profile from "./Header/Profile";
import Loginform from "./User/Loginform";
import Posters from "./Visualisations/Posters";
import Renewableenergy from "./Visualisations/Renewableenergy";
import Visualisations from "./Visualisations/Visualisations";
import { AuthContext } from "./User/AuthContext";
import Poster from "./Header/Poster";

export default function Energyexplorer() {
  const [showLoginForm, setshowlogin] = useState(false);
  const [isUserLogged, setUserLoggedIn] = useState(false);

  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    // Check if the token is set
    if (userToken) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [userToken]);

  return (
    <>
      <div className="h-20 headerdiv ">
        <Profile
          setshowlogin={setshowlogin}
          isUserLogged={isUserLogged}
          setUserLoggedIn={setUserLoggedIn}
        ></Profile>
      </div>
      {showLoginForm ? (
        <Loginform
          setshowlogin={setshowlogin}
          setUserLoggedIn={setUserLoggedIn}
          isUserLogged={isUserLogged}
        ></Loginform>
      ) : (
        console.log("Login not required")
      )}
      {!isUserLogged && <Poster></Poster>}
      {!isUserLogged && (
        <Posters
          isUserLogged={isUserLogged}
          setshowlogin={setshowlogin}
        ></Posters>
      )}

      {isUserLogged && <Visualisations></Visualisations>}
    </>
  );
}
