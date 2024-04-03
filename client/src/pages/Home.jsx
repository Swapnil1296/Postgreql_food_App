import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const res = await data.json();

      if (res) {
        setData(res.categories);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="  grid grid-cols-4 gap-2 mx-3">
        {data &&
          data.map((items) => (
            <Link
              to={"/place-order"}
              key={items.idCategory}
              className="border-2 rounded-md border-gray-600 hover:cursor-pointer"
            >
              <div className="flex justify-center items-center object-cover my-2 ">
                <img src={items.strCategoryThumb} alt="food image" />
              </div>
              <div className="mx-2 font-bold text-xl bg-slate-400 rounded-md flex  justify-center items-center ">
                <h2 className="text-red-700  ">{items.strCategory}</h2>
              </div>

              <p className="font-semibold mx-2 my-1 line-clamp-2">
                <span className="font-bold mx-2">Description:</span>
                {items.strCategoryDescription}
              </p>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
