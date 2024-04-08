const {
  AddNewMeal,
  getCartByUserId,
  updateitemQuantity,
  addCustomerAddress,
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
};
