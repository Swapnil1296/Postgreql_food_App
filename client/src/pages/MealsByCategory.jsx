import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { SweetAlert } from "../utils/SessionExpired";

const MealsByCategory = ({ getMeals, floading }) => {
  const [loading, setLoading] = useState(floading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = async (items) => {
    try {
      const res = await fetch("http://localhost:8080/api/cart/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          meal_thumb: items.strMealThumb,
          meal_name: items.strMeal,
          meal_price: `${Math.ceil(Math.random() * 100 + 1)}`,
        }),
      });
      const data = await res.json();

      if (data.status === 1) {
        SweetAlert("success", "Hurray !! the meal is added to cart").then(
          () => {
            navigate("/cart");
          }
        );
      }
      if (data.statusCode === 401) {
        SweetAlert(
          "error",
          "Your Session is expired, Please Login to continue"
        ).then(() => {
          dispatch(signoutSuccess());
          navigate("/log-in");
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner color="pink" />;
  }

  return (
    <>
      <div className="grid grid-cols-3 space-x-5  ">
        {getMeals &&
          getMeals.map((items) => (
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
