import React from "react";

const MealsByCategory = (props) => {
  const mealArray = Object.values(props);

  return (
    <>
      <div className="grid grid-cols-3 space-x-5  ">
        {mealArray &&
          mealArray.map((items) => (
            <div
              className="border-2 border-gray-800 border-dotted m-2 text-center rounded-md flex flex-col"
              key={items.idMeal}
            >
              <img src={items.strMealThumb} alt="img" className="" />
              <span className="mx-4 lg:font-semibold md:font-semibold font-serif p-2 ">
                {items.strMeal}
              </span>
              <span className=" font-semibold font-serif p-3">
                <span className="text-blue-800">Price</span>: Rs.
                {Math.ceil(Math.random() * 100 + 1)}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default MealsByCategory;
