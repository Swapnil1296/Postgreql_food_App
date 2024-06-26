import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateAddress from "./UpdateAddress";
import { setUserAddress } from "../redux/user/userSlice";

const ShowAddress = () => {
  const { currentUser, userAddress } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(true);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="bg-slate-500 w-1/2 p-2 ">
      {isEdit ? (
        <>
          <div className="text-center font-bold text-lg font-serif underline text-cyan-900">
            Your meal will be delivered to the following address
          </div>
          {userAddress?.map((address) => (
            <div
              key={address.id}
              className="flex flex-col p-4 gap-3 border-2 border-dashed border-gray-400 mt-2 rounded-sm"
            >
              <div className="flex gap-1">
                <span className="font-semibold font-serif text-gray-900">
                  Name:
                </span>
                <span className="font-semibold font-serif text-gray-800">
                  {address.first_name} {address.last_name}
                </span>
              </div>

              <div className="flex gap-2 font-serif text-slate-900">
                <span>Contact Number:</span>
                <span>{address.phone}</span>
              </div>
              <div className="flex gap-2 font-serif">
                <span>Address:</span>
              </div>
              <div className="flex gap-2 font-serif text-slate-900">
                <span className="font-semibold">{address.street_one}</span>,
                <span>{address.street_two}</span>
              </div>
              <div className="flex gap-2 font-serif">
                <span>{address.city}</span>,<span>{address.state}</span>,
                <span>{address.zipcode}</span>
              </div>
            </div>
          ))}
          <div className="my-3 text-center">
            <span>
              Want to change this address?{" "}
              <span
                onClick={() => setIsEdit(false)}
                className="text-cyan-300 hover:cursor-pointer"
              >
                Click here
              </span>
            </span>
          </div>
        </>
      ) : (
        <>
          <UpdateAddress
            setIsEdit={setIsEdit}
            setIsAddressUpdated={setIsAddressUpdated}
          />
        </>
      )}
    </div>
  );
};

export default ShowAddress;
