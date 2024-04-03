const { AddNewMeal } = require("../models/cart.item.model");
const errorHandler = require("../utils/error");

module.exports = {
  AddToCart: async (req, res, next) => {
    try {
      if (!req.user) {
        return next(
          errorHandler(401, "You must log in firt to add item to cart")
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
};
