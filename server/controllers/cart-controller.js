const {
  AddNewMeal,
  getCartByUserId,
  updateitemQuantity,
  addCustomerAddress,
  getCustomerAddress,
  updateCustomerAddress,
} = require("../models/cart.item.model");
const errorHandler = require("../utils/error");

module.exports = {
  AddToCart: async (req, res, next) => {
    try {
      if (!req.user) {
        return next(
          errorHandler(402, "You must log in firt to add item to cart")
        );
      }
      const { meal_name, meal_price, meal_thumb } = req.body;
      const mealDetails = {
        meal_name,
        meal_price,
        meal_thumb,
        meal_thumb,
        user_id: req.user.userId,
      };
      const newMeal = await AddNewMeal(mealDetails);
      if (newMeal) {
        res.status(200).json({
          status: 1,
          message: "Item added to cart successfully",
          data: newMeal,
        });
      }
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  },
  getCartItem: async (req, res, next) => {
    try {
      const { userId } = req.params;

      if (userId !== req.user.userId) {
        next(errorHandler(402, "Your not authorized to access this"));
      }
      const getItems = await getCartByUserId(userId);
      if (getItems) {
        res.status(200).json({
          status: 1,
          message: "Items fetched successfully",
          data: getItems,
        });
      }
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  },
  updateQuantity: async (req, res, next) => {
    const { userId, itemId } = req.params;
    if (userId !== req.user.userId) {
      next(errorHandler(402, "Your not authorized to update this"));
    }
    const mealToUpdate = {
      quantity: req.body.quantity,
      itemId: itemId,
      userId: userId,
    };
    const updateItems = await updateitemQuantity(mealToUpdate);
    console.log(updateItems);
    if (updateItems) {
      res.status(200).json({
        status: 1,
        message: "Items updated successfully",
        data: updateItems,
      });
    }
  },
  addCustomerAddress: async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user.userId) {
      next(errorHandler(402, "Your not authorized to update this"));
    }
    const addressDetails = {
      userId: userId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      street_one: req.body.streetLineOne,
      street_two: req.body.streetLineTwo,
      city: req.body.city,
      state: req.body.state,

      zipcode: req.body.zipcode,
    };
    const addAddress = await addCustomerAddress(addressDetails);

    if (addAddress) {
      res.status(200).json({
        status: 1,
        message: "Address added successfully",
        data: addAddress,
      });
    }
  },
  getCustomerAddress: async (req, res, next) => {
    try {
      if (!req.user || !req.user.userId) {
        return next(errorHandler(401, "User ID is missing"));
      }
      if (req.params.userId !== req.user.userId) {
        next(errorHandler(403, "your not authorized to access"));
      }
      const getAddress = await getCustomerAddress(req.params.userId);
      if (getAddress && getAddress !== "no address found") {
        return res.status(200).json({
          status: 1,
          message: "Address fetched successfully",
          data: getAddress,
        });
      } else if (getAddress === "no address found") {
        return res.status(200).json({
          status: 0,
          message: "No address found for the provided user ID",
        });
      } else {
        return next(errorHandler(404, "Address not found"));
      }
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  },
  updateCustomerAddress: async function (req, res, next) {
    try {
      const { userId } = req.params;
      if (!req.user || !req.user.userId) {
        return next(errorHandler(401, "User ID is missing"));
      }
      if (userId !== req.user.userId) {
        return next(errorHandler(404, "your not authorized"));
      }

      const addressDetails = {
        userId: userId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        street_one: req.body.street_one,
        street_two: req.body.street_two,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
      };

      const update = await updateCustomerAddress(addressDetails);

      if (update && update.length > 0) {
        return res.status(200).json({
          status: 1,
          message: "Address updated successfully",
          data: update,
        });
      } else {
        return next(errorHandler(500, "Failed to update address"));
      }
    } catch (error) {
      console.log("update address", error);
      return next(errorHandler(500, error.message));
    }
  },
};
