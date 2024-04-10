import { useFormik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../utils/SessionExpired";
import { useNavigate } from "react-router-dom";
import { setUserAddress, signoutSuccess } from "../redux/user/userSlice";
import deepEqual from "../utils/CompareValues";
import AddNewAddress from "../components/AddNewAddress";
import ShowAdderss from "../components/ShowAdderss";
import ShowFinalMeals from "../components/ShowFinalMeals";

const PlaceOrder = () => {
  const { currentUser, userAddress } = useSelector((state) => state.user);
  const [haveAddress, setHaveAddress] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memoizedDispatch = useMemo(() => dispatch, []);
  const memoizedNavigate = useMemo(() => navigate, []);

  useEffect(() => {
    const getCustomerAddress = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8080/api/cart/get-customer-address/${currentUser.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.status === 1) {
          setHaveAddress(true);
          memoizedDispatch(setUserAddress(data.data));
        }
        if (data.status === 0) {
          setIsEditable(true);
          setLoading(false);
          setHaveAddress(false);
        }
        if (data.statusCode === 401) {
          SweetAlert(
            "error",
            "Your Session is expired, Please Login to continue"
          ).then(() => {
            memoizedDispatch(signoutSuccess());
            memoizedNavigate("/log-in");
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      getCustomerAddress();
    } else return null;
  }, [currentUser, memoizedDispatch, memoizedNavigate]);

  return (
    <div className="flex flex-col  justify-center items-center mt-6 gap-5 p-2  sm:w-full">
      {loading ? (
        <div className="font-semibold border-2 font-sans bg-slate-400 rounded-full p-3">
          <span>Loading...</span>
        </div>
      ) : !haveAddress ? (
        <AddNewAddress setHaveAddress={setHaveAddress} />
      ) : (
        <ShowAdderss />
      )}
      <div className="bg-slate-500 w-1/2 p-2">
        <div className="text-center m-5 border-b">
          <span className="font-semibold text-lg font-serif">Meals Detail</span>
        </div>
        <ShowFinalMeals />
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
