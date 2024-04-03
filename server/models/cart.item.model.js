const db = require("../configuration/dbConfig");

module.exports = {
  AddNewMeal: async (mealDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Convert meal name to lowercase for case-insensitive comparison
        const mealNameLowerCase = mealDetails.meal_name.toLowerCase();

        // Check if the item is already present in the db.
        const itemExists = await db.query(
          "SELECT * FROM cart_item WHERE LOWER(meal_name) = $1",
          [mealNameLowerCase]
        );

        if (itemExists.rowCount > 0) {
          // If the item already exists, update its quantity and price
          const updatedItem = await db.query(
            "UPDATE cart_item SET quantity = quantity + 1, meal_price = meal_price + $1 WHERE LOWER(meal_name) = $2 RETURNING *",
            [mealDetails.meal_price, mealNameLowerCase]
          );

          // Return the updated item
          resolve(updatedItem.rows[0]);
        } else {
          // If the item doesn't exist, insert a new item into the cart with an initial quantity of 1
          const res = await db.query(
            "INSERT INTO cart_item (meal_name, meal_thumb, meal_price, user_id, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
              mealNameLowerCase,
              mealDetails.meal_thumb,
              mealDetails.meal_price,
              mealDetails.user_id,
              1, // Initial quantity for a new item
            ]
          );

          // Return the newly inserted item
          resolve(res.rows[0]);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};
