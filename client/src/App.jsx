import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import UserLogIn from "./pages/UserLogIn";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<UserLogIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Route>
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
