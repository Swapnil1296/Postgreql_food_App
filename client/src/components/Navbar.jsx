import React, { useEffect, useState } from "react";
import { assets } from "./../assets/assets";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [tab, setTab] = useState("home");
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate(`/${tab}`);
  // }, [tab]);

  return (
    <div className="flex justify-between items-center bg-cyan-600 p-4">
      <img src={assets.logo} alt="logo icon" className="" />
      <div className="flex items-center space-x-4">
        <ul className="flex space-x-4">
          <li
            className={`font-bold text-gray-300 text-md hover:cursor-pointer hover:text-[#240A34] ${
              tab === "home" ? "underline text-[#240A34]" : ""
            }`}
            onClick={() => setTab("home")}
          >
            Home
          </li>
          <li
            className={`font-bold text-gray-300 text-md hover:cursor-pointer hover:text-[#240A34] ${
              tab === "menu" ? "underline text-[#240A34]" : ""
            }`}
            onClick={() => setTab("menu")}
          >
            Menu
          </li>
          <li
            className={`font-bold text-gray-300 text-md hover:cursor-pointer hover:text-[#240A34]  ${
              tab === "mobile app" ? "underline text-[#240A34]" : ""
            }`}
            onClick={() => setTab("mobile app")}
          >
            Mobile App
          </li>
          <li
            className={`font-bold text-gray-300 text-md hover:cursor-pointer hover:text-[#240A34]  ${
              tab === "contact us" ? "underline text-[#240A34]" : ""
            }`}
            onClick={() => setTab("contact us")}
          >
            Contact us
          </li>
        </ul>
      </div>

      {/* Search and Cart Icons */}
      <div className="flex items-center space-x-4">
        <CiSearch size={30} color="#F8BDEB" />
        <IoCartOutline size={30} color="#F8BDEB" />
        <button className="bg-[#1B4242] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-[#240A34]">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
