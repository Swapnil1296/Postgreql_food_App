import React from "react";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col  justify-center items-center mt-6 gap-5 p-2 ">
      <div className="bg-slate-500 w-1/2 p-2">
        <div className="text-center m-5 border-b">
          <span className="font-semibold text-lg font-serif">
            Address & Customer Details
          </span>
        </div>
        <div>
          <div className="text-left m-5 ">
            <span className="font-semibold text-lg">Customer Details</span>
          </div>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required={false}
                />
              </div>
              <div>
                <label
                  for="last_name"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required={false}
                />
              </div>

              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0000000000"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required={false}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                for="streetLineOne"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetLineOne"
                className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={false}
              />
            </div>
            <div class="mb-6">
              <label
                for="streetLineTwo"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                Street Address Line 2
              </label>
              <input
                type="text"
                id="streetLineTwo"
                className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={false}
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="city"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-blue-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={false}
                />
              </div>
              <div>
                <label
                  for="state"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  State/Province
                </label>
                <input
                  type="state"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={false}
                />
              </div>

              <div>
                <label
                  for="zipcode"
                  className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
                >
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  className="bg-gray-50 border border-gray-300 text-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="000000"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required={false}
                />
              </div>
            </div>

            <button
              type="submit"
              className="border border-gray-700 text-white bg-blue-700 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 font-medium dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="bg-slate-500 w-1/2 p-2">
        <div className="text-center m-5 border-b">
          <span className="font-semibold text-lg font-serif">Meals Detail</span>
        </div>
        <div>
          <button
            type="submit"
            className="border border-gray-700 text-white bg-blue-700 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 font-medium dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Confirm your order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
