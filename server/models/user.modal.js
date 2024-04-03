const db = require("../configuration/dbConfig");
const bcrypt = require("bcrypt");
module.exports = {
  GetAllUser: async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user_details").then((user) => resolve(user));
    })
      .catch((err) => reject(err.message))
      .finally((data) => console.log(data));
  },
  SignUpUser: async (userInfo) => {
    console.log("userINfo: " + userInfo);
    return new Promise(async (resolve, reject) => {
      try {
        // Check if the user already exists
        const existingUser = await db.query(
          "SELECT * FROM user_details WHERE user_email = $1 OR user_phone = $2",
          [userInfo.email, userInfo.phone]
        );

        if (existingUser.rows.length > 0) {
          throw new Error(
            "User already exists with phone number or email address"
          );
        }
        const existingProfileName = await db.query(
          "select * from user_details where user_profile=$1",
          [userInfo.profile_name]
        );
        if (existingProfileName.rows.length > 0) {
          throw new Error(
            "Profile name already exists,Please Enter a Unique Profile Name"
          );
        }

        // Insert the new user
        const newUser = await db.query(
          "INSERT INTO user_details (user_name,user_email,user_phone,user_address,user_profile,password) VALUES($1,$2,$3,$4,$5,$6) RETURNING user_id, user_name, user_email, user_phone, user_address",
          [
            userInfo.name,
            userInfo.email,
            userInfo.phone,
            userInfo.address,
            userInfo.profile_name,
            userInfo.password,
          ]
        );

        // Resolve with the newly created user
        const user = newUser.rows[0];
        resolve(user);
      } catch (error) {
        // Handle errors and reject with an appropriate message
        console.log("Error in SignUpUser:", error.message);
        reject(error);
      }
    });
  },
  LogInUser: async (userInfo) => {
    return new Promise(async (resolve, reject) => {
      console.log(userInfo);
      try {
        // Fetch the user details from the database using the provided email
        const user = await db.query(
          "SELECT * FROM user_details WHERE user_email = $1",
          [userInfo.email]
        );

        // If no user found with the provided email, reject with an error
        if (user.rows.length === 0) {
          throw new Error("User not found");
        }

        // Compare the hashed password with the provided password using bcrypt.compare
        const isPasswordMatch = await bcrypt.compare(
          userInfo.password,
          user.rows[0].password
        );

        // If passwords match, resolve with the user details
        if (isPasswordMatch) {
          resolve(user.rows[0]);
        } else {
          // If passwords don't match, reject with an error
          throw new Error("Incorrect password");
        }
      } catch (error) {
        console.log("Error in LogInUser:", error.message);
        reject(error);
      }
    });
  },
};
