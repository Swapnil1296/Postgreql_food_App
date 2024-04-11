import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  userAddress: null,
  cartItem: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
      state.error = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItem = action.payload;
      state.error = action.payload;
    },

    signoutSuccess: (state) => {
      state.currentUser = null;
      state.userAddress = null;
      state.cartItem = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  setUserAddress,
  setCartItems,
} = userSlice.actions;

export default userSlice.reducer;
