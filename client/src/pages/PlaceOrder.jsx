import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../utils/SessionExpired";
import { useNavigate } from "react-router-dom";
import { setUserAddress, signoutSuccess } from "../redux/user/userSlice";
import deepEqual from "../utils/CompareValues";
import AddNewAddress from "../components/AddNewAddress";
import ShowAdderss from "../components/ShowAdderss";

const PlaceOrder = () => {
  const { currentUser, userAddress } = useSelector((state) => state.user);
  const [haveAddress, setHaveAddress] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const getCustomerAddress = async () => {
      try {
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
          dispatch(setUserAddress(data.data));
        }
        if (data.status === 0) {
          setIsEditable(true);
          setHaveAddress(false);
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

    if (currentUser) {
      getCustomerAddress();
    } else return null;
  }, []);

  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    streetLineOne: "",
    streetLineTwo: "",
    city: "",
    state: "",
    zipcode: "",
  };

  // const updateAddress = (values) => {
  //   console.log(values);
  //   //  try {
  //   //    const res = await fetch(
  //   //      `http://localhost:8080/api/cart/update-customer-address/${currentUser.user_id}`,
  //   //      {
  //   //        method: "PUT",
  //   //        headers: {
  //   //          "Content-Type": "application/json",
  //   //        },
  //   //        credentials: "include",
  //   //        body: JSON.stringify(values),
  //   //      }
  //   //    );
  //   //    const data = await res.json();
  //   //    if (data.status === 1) {
  //   //      SweetAlert("success", "Your address saved successfully");
  //   //      setSaved(true);
  //   //      setIsEditable(false);
  //   //    }
  //   //    if (data.statusCode === 401) {
  //   //      SweetAlert(
  //   //        "error",
  //   //        "Your Session is expired, Please Login to continue"
  //   //      ).then(() => {
  //   //        dispatch(signoutSuccess());
  //   //        navigate("/log-in");
  //   //      });
  //   //    }
  //   //  } catch (error) {
  //   //    console.log(error);
  //   //  }
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const isFormChanged = !deepEqual(values, initialValues);
        const isAddressChanged = !deepEqual(values, userAddress);
        if (!userAddress || isFormChanged || isAddressChanged) {
          if (userAddress) {
            await updateAddress(values);
          } else {
            await PostAddress(values);
          }
        } else {
          SweetAlert(
            "warning",
            "No changes were made to your current address"
          ).then(() => {
            setIsEditable(false);
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className="flex flex-col  justify-center items-center mt-6 gap-5 p-2 ">
      {!haveAddress ? <AddNewAddress /> : <ShowAdderss />}
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
