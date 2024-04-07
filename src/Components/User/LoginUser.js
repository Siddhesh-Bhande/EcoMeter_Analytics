import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function LoginUser({
  setnewuser,
  setshowlogin,
  setUserLoggedIn,
}) {
  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset login error

    try {
      // Make a POST request to the token endpoint
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response (e.g., wrong credentials)
        console.error("Error data:", data);

        let errorMessage = "Failed to login";
        // Parse error details and construct a more informative message if possible
        if (data.detail) {
          errorMessage = Array.isArray(data.detail)
            ? data.detail.map((err) => err.msg).join(", ")
            : data.detail;
        }
        throw new Error(errorMessage);
      }

      console.log("Login successful:", data);

      //set access token in context
      login(data.access_token);

      //localStorage.setItem("access_token", data.access_token);
      // Redirect the user or update the UI as logged in
      setUserLoggedIn(data.access_token);
      setshowlogin(false);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error);
    }
  };

  function signuphandler() {
    setnewuser(true);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="container-xs space-y-2 grid-2 col-2"
    >
      <div className="p-8 border-b border-gray-900/10 pb-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div className="sm:col-span-4 md:col-span-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e)}
                required="required"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e)}
                required="required"
              />
            </div>
          </div>
          {loginError && (
            <div className="text-red-500 sm:col-span-6">
              {loginError.message}
            </div>
          )}
          <div className="sm:col-span-6 place-center">
            <button className="mb-2 mt-2 w-full p-1 text-xl hover:shadow-md rounded-lg mt-2 bg-emerald-400 transition hover:bg-emerald-100 hover:border-2 hover:border-emerald-400 hover:text-emerald-400 text-white">
              Login
            </button>
            <button
              onClick={signuphandler}
              className="mb-2 w-full p-1 text-lg rounded-lg mt-2 transition hover:bg-emerald-100 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white"
            >
              First time here? Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
