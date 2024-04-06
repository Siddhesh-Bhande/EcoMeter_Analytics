import { useState } from "react";

export default function Register({ setnewuser }) {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Function to update state for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!userData.fullname) newErrors.fullname = "Full Name is required";
    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!userData.username) newErrors.username = "Username is required";
    if (!userData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid:", userData);
      // Construct the API URL with user data
      const apiUrl = `http://127.0.0.1:8000/users/?username=${encodeURIComponent(
        userData.username
      )}&email=${encodeURIComponent(
        userData.email
      )}&password=${encodeURIComponent(
        userData.password
      )}&fullname=${encodeURIComponent(userData.fullname)}`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST", // Change this to 'GET' if your API does not support 'POST'
        });
        const data = await response.json();
        if (response.ok) {
          console.log("User registered successfully:", data);
          // Reset form or navigate user to another page
          // For example, resetting the form:
          setUserData({
            fullname: "",
            email: "",
            username: "",
            password: "",
          });
          // Optionally, navigate to the login page or show a success message
          setnewuser(false);
        } else {
          console.error("Registration error:", data);
          // Handle API errors (e.g., display error message to the user)
        }
      } catch (error) {
        console.error("Network error:", error);
        // Handle network errors
      }
    } else {
      console.log("Form is invalid:", errors);
    }
  };

  function showloginscreen() {
    setnewuser(false);
  }
  return (
    <form
      className="container-xs space-y-2 grid-2 col-2"
      onSubmit={handleSubmit}
    >
      <div className="p-8 border-b border-gray-900/10 pb-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlfor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullname"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                value={userData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlfor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlfor="username"
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
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlfor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="Password"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-6 place-center">
            <button className="mb-2 mt-2 w-full p-1 text-lg hover:shadow-md rounded-lg mt-2 bg-sky-400 transition hover:bg-sky-100 hover:border-2 hover:border-sky-400 hover:text-sky-400 text-white">
              Sign Up
            </button>
            <button
              onClick={showloginscreen}
              className="mb-2 w-full p-1 text-lg rounded-lg mt-2 transition hover:bg-sky-100 border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
            >
              Already have a account? Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
