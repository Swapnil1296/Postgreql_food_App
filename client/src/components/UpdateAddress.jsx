import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import deepEqual from "../utils/CompareValues";
import { SweetAlert } from "../utils/SessionExpired";

const UpdateAddress = ({ setIsEdit, setIsAddressUpdated }) => {
  const { currentUser, userAddress } = useSelector((state) => state.user);

  const UpdateUserAddress = async (values) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/cart/update-customer-address/${currentUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status === 1) {
        SweetAlert("success", "Your address saved successfully");
      }
      if (data.statusCode === 401) {
        SweetAlert(
          "error",
          "Your Session is expired, Please Login to continue"
        ).then(() => {
          dispatch(signoutSuccess());
          navigate("/log-in");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    first_name: (userAddress && userAddress[0].first_name) || "",
    last_name: (userAddress && userAddress[0].last_name) || "",
    phone: (userAddress && userAddress[0].phone) || "",
    streetLineOne: (userAddress && userAddress[0].street_one) || "",
    streetLineTwo: (userAddress && userAddress[0].street_two) || "",
    city: (userAddress && userAddress[0].city) || "",
    state: (userAddress && userAddress[0].state) || "",
    zipcode: (userAddress && userAddress[0].zipcode) || "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const isFormChanged = !deepEqual(values, initialValues);

        if (isFormChanged) {
          UpdateUserAddress(values).then(() => {
            setIsEdit(true), setIsAddressUpdated(true);
          });
        } else {
          SweetAlert(
            "warning",
            "No changes were made to your current address"
          ).then(() => {
            setIsEdit(true);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="">
      <div className="text-center m-5 border-b">
        <span className="font-semibold text-lg font-serif">
          Address & Customer Details
        </span>
      </div>
      <div>
        <div className="text-left m-5 ">
          <span className="font-semibold text-lg">Customer Details</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required={false}
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required={false}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0000000000"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required={false}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="streetLineOne"
              className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetLineOne"
              value={formik.values.streetLineOne}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={false}
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="streetLineTwo"
              className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
            >
              Street Address Line 2
            </label>
            <input
              type="text"
              id="streetLineTwo"
              value={formik.values.streetLineTwo}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={false}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={false}
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                State/Province
              </label>
              <input
                type="text"
                id="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={false}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="block mb-2 text-sm font-medium text-blue-300 dark:text-white"
              >
                Zip/Postal Code
              </label>
              <input
                type="text"
                id="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-blue-700 font-semibold font-serif text-md capitalize rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="000000"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required={false}
                autoComplete="off"
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
  );
};

export default UpdateAddress;
