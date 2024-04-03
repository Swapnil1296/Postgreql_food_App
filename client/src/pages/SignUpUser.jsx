import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(emailRegex, "invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  phone: Yup.string()
    .matches(new RegExp("[0-9]{7}"))
    .min(10, "enter a valid phone number")
    .max(10, "Enter a valid phone number")
    .required("Phone number is required"),
  profile: Yup.string().required("Profile name is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
const SignUpUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      phone: "",
      profile: "",
      //   address: {
      //     addressLine1: "",
      //     addressLine2: "",
      //     city: "",
      //     state: "",
      //     zip: "",
      //   },
      address: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        dispatch(signInStart());
        const res = await fetch("http://localhost:8080/api/user/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_name: values.username,
            user_email: values.email,
            user_phone: values.phone,
            user_profile: values.profile,
            // user_address: "",
            password: values.password,
          }),
        });
        const data = await res.json();
        if (data) {
          dispatch(signInSuccess(data));
          navigate("/log-in");
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.message));
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center border border-dotted border-blue-500">
      <form
        className="flex flex-col justify-center items-center my-9 border-2 border-gray-700 rounded-md  w-1/2 space-y-2 p-3 sm:w-full md:w-2/4"
        onSubmit={formik.handleSubmit}
      >
        <p className="font-bold text-2xl text-orange-400 underline">
          Welcome to Our Fomato !!
        </p>
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
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
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your name"
            value={formik.values.username}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-700">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
          <label htmlFor="phone">Enter Your Phone Number</label>
          <input
            type="string"
            id="phone"
            placeholder="Enter Your Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-700">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
          <label htmlFor="profile">Enter a Suitabel Profile Name</label>
          <input
            type="text"
            id="profile"
            placeholder="Enter Your Profile Name"
            value={formik.values.profile}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.profile && formik.errors.profile ? (
            <div className="text-red-700">{formik.errors.profile}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
          <label htmlFor="address">Enter Your Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Your address"
            value={formik.values.address}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-700">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
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
        <div className="flex flex-col gap-4 w-2/3 sm:w-full">
          {/* <label htmlFor="confirm_password">Enter Your Password</label> */}
          <input
            type="password"
            id="confirmpassword"
            placeholder="Enter Your Password Again"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            className="border-2 border-gray-500 rounded-r-lg p-1 w-full hover:border-blue-400 outline-none focus:border-blue-500"
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <div className="text-red-700">{formik.errors.confirmpassword}</div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            {loading ? <span>Loading...</span> : <span>Sign Up</span>}
          </button>
        </div>
        <div>
          <p>
            Already have an account?
            <span
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => navigate("/log-in")}
            >
              Sing in
            </span>{" "}
            here
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpUser;
