export default function Register({ setnewuser }) {
  function showloginscreen() {
    setnewuser(false);
  }
  return (
    <form className="container-xs space-y-2 grid-2 col-2">
      <div className="p-8 border-b border-gray-900/10 pb-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              for="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullname"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              for="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              for="Password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="Password"
                name="Password"
                id="Password"
                autocomplete="Password"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
