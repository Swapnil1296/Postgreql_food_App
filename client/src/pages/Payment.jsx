import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlert } from "../utils/SessionExpired";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { currentUser, cartItem } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || cartItem.length <= 0) {
      SweetAlert("error", "you have no items to pay", 300).then(() =>
        navigate("/menu")
      );
    }
  }, [cartItem]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    // Implement payment logic based on selected payment method
    console.log(`Payment method selected: ${paymentMethod}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Credit/Debit Card
        </label>
        <label className="block">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          PayPal
        </label>
      </div>
      {paymentMethod === "card" && (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Credit/Debit Card Details</h3>
          <div className="mb-2">
            <label className="block mb-1">Card Number:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Expiration Date:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">CVV:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
      )}
      {paymentMethod === "paypal" && (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">PayPal Details</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Pay with PayPal
          </button>
        </div>
      )}
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Submit Payment
      </button>
    </div>
  );
};

export default Payment;
