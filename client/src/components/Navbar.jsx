import React, { useEffect, useState } from "react";
import { assets } from "./../assets/assets";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const Navbar = () => {
  const [tab, setTab] = useState("home");
  const { currentUser } = useSelector((state) => state.user);

  const [cartCount, setCartCount] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", value: "home" },
    { label: "Menu", value: "menu" },
    { label: "Mobile App", value: "mobile app" },
    { label: "Contact us", value: "contact us" },
  ];

  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;

    // Find the menu item that matches the pathname
    const matchingMenuItem = menuItems.find((item) =>
      pathname === "/" ? true : `/${item.value}` === pathname
    );
    // If a matching menu item is found, set the tab
    if (matchingMenuItem) {
      setTab(matchingMenuItem.value);
    } else {
      // Otherwise, set the tab to an empty string to disable the active class
      setTab("");
    }
  }, [location.pathname]);

  const handleSignOut = () => {
    dispatch(signoutSuccess());
  };
  useEffect(() => {
    const getCartQuantinity = async () => {
      try {
        const getData = await fetch(
          `http://localhost:8080/api/cart/get-cart/${currentUser.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const res = await getData.json();
        if (res.status === 1) {
          setCartCount(res.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCartQuantinity();
  }, [location.pathname]);

  return (
    <div className="flex justify-between items-center bg-cyan-600 p-4">
      <img src={assets.logo} alt="logo icon" className="" />

      <div className="flex items-center space-x-4">
        <ul className="flex space-x-4">
          {menuItems.map((item) => (
            <li
              key={item.value}
              className={`font-bold text-gray-300 text-md hover:cursor-pointer hover:text-[#240A34] ${
                tab === item.value ? "underline text-[#240A34]" : ""
              }`}
              onClick={() =>
                navigate(item.value === "home" ? "/" : `/${item.value}`)
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <CiSearch size={30} color="#F8BDEB" />
        <div
          className="relative hover:cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          {/* Cart icon with badge */}
          <IoCartOutline size={30} color="#F8BDEB" />
          {cartCount > 0 && (
            <span className="bg-gray-600 text-blue-300  rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
              {cartCount}
            </span>
          )}
        </div>

        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="inline-block w-auto text-center  px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-2xl hover:shadow-neutral-400 hover:-tranneutral-y-px"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/log-in")}
            className="inline-block w-auto text-center  px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
