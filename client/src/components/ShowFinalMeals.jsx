import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../utils/SessionExpired";
import { useNavigate } from "react-router-dom";

const ShowFinalMeals = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState();
  const [loading, setLoaing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memoizedDispatch = useMemo(() => dispatch, []);
  const memoizedNavigate = useMemo(() => navigate, []);
  useEffect(() => {
    const getCartQuantinity = async () => {
      try {
        setLoaing(true);
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
          setCartItems(res.data);
        }
        if (res.statusCode === 401) {
          SweetAlert(
            "error",
            "Your Session is expired, Please Login to continue"
          ).then(() => {
            memoizedDispatch(signoutSuccess());
            memoizedNavigate("/log-in");
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoaing(false);
      }
    };

    getCartQuantinity();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 gap-3 m-2 p-2 items-center justify-center">
      {loading ? (
        <div className="font-semibold border-2 font-sans bg-slate-400 rounded-full p-3">
          <span>Loading...</span>
        </div>
      ) : (
        cartItems?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex   border-2 border-dashed border-gray-400 rounded-lg p-4 space-x-2"
            >
              <div className=" w-[300px] sm:w-[200px] object-contain ">
                <img
                  src={item.meal_thumb}
                  alt="food image"
                  className="rounded-md"
                />
              </div>
              <div className="">
                <div className="capitalize text-amber-600 text-[25px]">
                  {item.meal_name}
                </div>
                <div className="flex gap-2">
                  <div>
                    <span className="font-semibold">Rs:-</span>{" "}
                    <span className="font-semibold text-orange-800">
                      {item.meal_price}/Rs Only
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Quantity:-</span>
                    <span className="font-semibold text-blue-700">
                      {item.quantity} Meal
                    </span>
                  </div>
                </div>

                <span className="font-serif text-emerald-900">
                  Recipe is loaded with pillowy gnocchi and melty cheese. Sneak
                  in some extra veggies for a nutritious and delicious
                  kid-approved weeknight meal.
                </span>
                <div className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white">
                  <button>Doen't Like It! Remove</button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ShowFinalMeals;
