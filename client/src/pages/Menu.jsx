import React, { useEffect, useState } from "react";
import MealsByCategory from "./MealsByCategory";

const Menu = () => {
  const [data, setData] = useState(null);
  const [getMeals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getMealbyCategory = async (category) => {
    setLoading(true);
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const res = await data.json();

    setMeals(res.meals);
    if (res) {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-bold text-xl my-2">Explore Our Menu</p>
      <div className="flex flex-wrap">
        {getMeals ?? getMeals ? (
          loading ? (
            <span>Loading... </span>
          ) : (
            <>
              <MealsByCategory {...getMeals} />

              <div className=" font-semibold  text-center mx-7">
                <button
                  onClick={() => setMeals(null)}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Go Back to Category
                </button>
              </div>
            </>
          )
        ) : (
          data &&
          data.map((items, index) => (
            <div
              onClick={() => getMealbyCategory(items.strCategory)}
              key={index}
              className="border-2 border-dotted border-gray-800 rounded-full p-2 my-2 mx-3 hover:cursor-pointer object-fit flex flex-col items-center justify-center"
            >
              <img
                src={items.strCategoryThumb}
                alt="img"
                className="w-[200px] rounded-full"
              />
              <h2 className="text-xl text-gray-900 font-serif">
                {items.strCategory}
              </h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
