const db = require("../configuration/dbConfig");

// check if the value is changed befor updatidng
const deepEqual = (obj1, obj2) => {
  // Get the keys of the two objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and compare the values
  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // If the value is an object, recursively call deepEqual
    if (typeof val1 === "object" && typeof val2 === "object") {
      if (!deepEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      // If the values are not equal, return false
      return false;
    }
  }

  // If all keys and values are equal, return true
  return true;
};

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
  getCartByUserId: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await db.query(
          "SELECT * FROM cart_item WHERE user_id = $1",
          [userId]
        );
        if (res.rows.length > 0) {
          resolve(res.rows);
        } else {
          reject(new Error("something went wrong while fetching cart"));
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateitemQuantity: (mealToUpdate) => {
    console.log(mealToUpdate);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await db.query(
          "UPDATE cart_item SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
          [mealToUpdate.quantity, mealToUpdate.itemId, mealToUpdate.userId]
        );
        if (res.rowCount > 0) {
          resolve(res.rows);
        } else {
          reject(new Error("something went wrong while updating quantity"));
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  addCustomerAddress: (addressDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          userId,
          first_name,
          last_name,
          street_one,
          street_two,
          city,
          zipcode,
          phone,
          state,
        } = addressDetails;

        const res = await db.query(
          "INSERT INTO customer_address (user_id, first_name, last_name, street_one, street_two, city, state, zipcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [
            userId,
            first_name,
            last_name,
            street_one,
            street_two,
            city,
            state,
            zipcode,
            phone,
          ]
        );

        if (res.rowCount > 0) {
          resolve(res.rows);
        } else {
          reject(new Error("Something went wrong while inserting address"));
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  getCustomerAddress: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await db.query(
          "SELECT * FROM customer_address WHERE user_id = $1",
          [userId]
        );

        if (res.rows.length > 0) {
          resolve(res.rows);
        }
        if (res.rows.length > 0) {
          resolve(res.rows);
        } else {
          resolve("no address found");
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCustomerAddress: (address) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!address.userId) {
          reject(new Error("User ID is required"));
        }

        const {
          userId,
          first_name,
          last_name,
          phone,
          street_one,
          street_two,
          city,
          state,
          zipcode,
        } = address;

        const update = await db.query(
          `UPDATE customer_address 
                 SET first_name='${first_name}', last_name='${last_name}', phone='${phone}', 
                     street_one='${street_one}', street_two='${street_two}', city='${city}',
                     state='${state}', zipcode='${zipcode}' 
                 WHERE user_id='${userId}' 
                 RETURNING *`
        );

        if (update.rowCount > 0) {
          resolve(update.rows);
        } else {
          reject(new Error("Failed to update address"));
        }
      } catch (error) {
        console.log("Error updating address:", error);
        reject(error.message);
      }
    });
  },
};
