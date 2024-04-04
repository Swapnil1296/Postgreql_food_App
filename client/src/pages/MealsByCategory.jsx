import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MealsByCategory = (props) => {
  const mealArray = Object.values(props);
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const handleCartItem = (items) => {
  //     setLoading(true);
  //     const newCartItem = {
  //       meal_thumb: items.strMealThumb,
  //       meal_name: items.strMeal,
  //       meal_price: `${Math.ceil(Math.random() * 100 + 1)}`,
  //     };
  //     addItemToCart(newCartItem);
  //   };

  const addItemToCart = async (items) => {
    try {
      const res = await fetch("http://localhost:8080/api/cart/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_thumb: items.strMealThumb,
          meal_name: items.strMeal,
          meal_price: `${Math.ceil(Math.random() * 100 + 1)}`,
        }),
      });
      const data = await res.json();
      if (data.status === 1) {
        Swal.fire({
          title: "The Item is added to the cart",
          confirmButtonText: "Click here to view the cart",
          icon: "success",
        }).then(() => {
          navigate("/cart");
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-3 space-x-5  ">
        {mealArray &&
          mealArray.map((items) => (
            <div
              className="border-2 border-gray-800 border-dotted m-2 text-center rounded-md flex flex-col"
              key={items.idMeal}
            >
              <img
                src={items.strMealThumb}
                alt="img"
                className="object-contain rounded-md"
              />
              <span className="mx-4 lg:font-semibold md:font-semibold font-serif p-2 ">
                {items.strMeal}
              </span>
              <span className=" font-semibold font-serif p-3">
                <span className="text-blue-800">Price</span>: Rs.
                {Math.ceil(Math.random() * 100 + 1)}
              </span>

              <button
                onClick={() => addItemToCart(items)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default MealsByCategory;
