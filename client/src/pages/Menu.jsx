import React, { useEffect, useState } from "react";
import MealsByCategory from "./MealsByCategory";
import { Spinner } from "flowbite-react";

const Menu = () => {
  const [data, setData] = useState(null);
  const [getMeals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const res = await data.json();

      if (res) {
        setData(res.categories);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const getMealbyCategory = async (category) => {
    setFLoading(true);
    try {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const res = await data.json();

      setMeals(res.meals);
    } catch (error) {
      console.log(error);
      setFLoading(false);
    } finally {
      setFLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-b-2 border-gray-500 w-full text-center my-4">
        <p className="font-bold text-xl my-2">Explore Our Delicacies</p>
      </div>

      <div className="flex flex-wrap justify-center items-center  border-b-2 border-gray-500 w-full text-center py-3">
        {loading ? (
          <div className="font-semibold border-2 font-sans bg-slate-400 rounded-full p-3">
            <span>Loading...</span>
          </div>
        ) : (
          data &&
          data.map((items, index) => (
            <div className="flex flex-col items-center justify-center  ">
              <div
                onClick={() => getMealbyCategory(items.strCategory)}
                key={index}
                className="border-2 border-dotted border-gray-800 rounded-full p-2 my-5 mx-3 hover:cursor-pointer object-fit"
              >
                <img
                  src={items.strCategoryThumb}
                  alt="img"
                  className="w-[100px] rounded-full"
                />
              </div>
              <h2 className="text-sm text-gray-900 font-serif">
                {items.strCategory}
              </h2>
            </div>
          ))
        )}
      </div>
      <div className="my-5 text-center">
        {getMeals ? (
          <span className="font-bold font-serif text-xl ">
            Food Currently Available Near You
          </span>
        ) : (
          ""
        )}

        {floading ? (
          <div className="font-semibold border-2 font-sans bg-slate-400 rounded-full p-3">
            <span>Loading...</span>
          </div>
        ) : (
          <MealsByCategory getMeals={getMeals} floading={loading} />
        )}
      </div>
    </div>
  );
};

export default Menu;
