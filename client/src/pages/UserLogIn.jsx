import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(emailRegex, "invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const UserLogIn = () => {
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      dispatch(signInStart());
      try {
        const res = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            user_email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();

        if (data.success === false) {
          setError(data.errorMessage);
          dispatch(signInFailure(data.errorMessage));
        }
        if (data.status === 1) {
          dispatch(signInSuccess(data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.message));
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-center items-center my-9 border-2 border-gray-700 rounded-md  w-2/6 space-y-6 p-3"
        onSubmit={formik.handleSubmit}
      >
        <p className="font-bold text-2xl text-orange-400 underline">
          Need to Login before proceeding further.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="email">Enter Your Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Your Name"
            autoComplete="off"
            noValidate
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1  hover:border-blue-400 outline-none focus:border-blue-50"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-700">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="password">Enter Your Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-700">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Sign In
          </button>
        </div>
        {error && (
          <Alert
            color="failure"
            className="border-2 border-gray-500 rounded-xl"
          >
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <div>
          <p>
            Don't have a Acocoutn ?{" "}
            <span
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sing Up
            </span>
            here
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogIn;
