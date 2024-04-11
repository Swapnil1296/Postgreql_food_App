import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlert } from "../utils/SessionExpired";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";

const Cart = () => {
  const [cartItem, setCartItem] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          setCartItem(res.data);
        }
        if (
          res.success === false &&
          res.errorMessage === "no Items added in the cart"
        ) {
          SweetAlert("warning", "Please add some items to the cart").then(
            () => {
              navigate("/menu");
            }
          );
        }
        if (res.statusCode === 401) {
          SweetAlert(
            "error",
            "Your Session is expired, Please Login to continue"
          ).then(() => {
            dispatch(signoutSuccess());
            navigate("/log-in");
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCartQuantinity();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      // newQuantity = parseInt(newQuantity);
      const updatedItems = cartItem.map((item) => {
        if (item.id === itemId) {
          const oldQuantity = parseInt(item.quantity);
          console.log(oldQuantity, newQuantity);
          return { ...item, quantity: newQuantity };
        }

        return item;
      });
      setCartItem(updatedItems);

      // Call the API to update the quantity
      const updateResponse = await fetch(
        `http://localhost:8080/api/cart/update-quantity/${itemId}/${currentUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      const updateData = await updateResponse.json();
      if (updateData.status === 1) {
        console.log("Quantity updated successfully");
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center space-y-10 p-2 bg-cyan-300">
      <div className="grid grid-cols-3  gap-3 text-center capitalize mt-1 p-3 xl:w-3/4 ">
        {cartItem &&
          cartItem.map((item) => {
            return (
              <div
                key={item.id}
                className="relative border-2 border-gray-600 border-dashed rounded-lg bg-slate-500"
              >
                <div className=" relative p-1">
                  <img
                    src={item.meal_thumb}
                    alt="image"
                    className="object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 right-0">
                    <button
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded-full mr-1"
                      onClick={() =>
                        updateQuantity(item.id, parseInt(item.quantity) + 1)
                      }
                    >
                      +
                    </button>
                    <span className="font-semibold text-gray-500">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded-full mx-1"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, parseInt(item.quantity) - 1)
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-left ml-2 p-2">
                  <p className="font-semibold text-lg text-rose-700 font-serif">
                    {item.meal_name}
                  </p>
                  <p>
                    <span className="text-blue-700 font-semibold">
                      Item Quantity:
                    </span>{" "}
                    <span className="font-serif font-semibold">
                      {item.quantity}
                    </span>
                  </p>
                  <p>
                    <span className="font-sans font-semibold">
                      Price: {item.meal_price}
                    </span>
                    Rupees
                  </p>
                  <span className="text-orange-800">
                    Get your veggies in with this delicious and quick noodle
                    stir-fry. Green onions and garlic pack a flavor punch, while
                    the brown sugar and soy tie everything together in a sweet
                    and savory sauce.
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => navigate("/place-order")}
        className="bg-[#571b8f] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-[#240A34] w-2/3"
      >
        Place your Order
      </button>
    </div>
  );
};

export default Cart;
