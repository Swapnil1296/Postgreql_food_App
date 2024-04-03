import React from "react";
import { assets } from "./../assets/assets";
import { Outlet } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <div
      className=" h-[500px] my-[30px] mx-2 rounded-md bg-cover bg-center relative  flex flex-col justify-center items-start"
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute  gap-1 max-w-[50%]  mx-3 my-10">
        <p className="font-bold text-white text-3xl my-2">
          Order your favorite food here
        </p>
        <p className="text-[76ABAE] font-serif font-semibold my-2">
          Explore a diverse menu curated from the finest local eateries, trendy
          cafes, and top-rated restaurants in town. From mouthwatering burgers
          to exotic sushi, from piping hot pizzas to healthy salads, we have
          something for every palate and preference. With our easy-to-use app,
          ordering your favorite meal is as simple as a few clicks – no more
          waiting in line or struggling with menus.
        </p>
        <button className="bg-[#1B4242] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-[#240A34]">
          view our recipe
        </button>
      </div>
    </div>
  );
};

export default Header;
