import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./home/Login";
import Register from "./home/Register";
import FarmerRegister from "./home/FarmerRegister";
import FarmerMenu from "./farmer/FarmerMenu";
import CustomerMenu from "./customer/CustomerMenu";
import ViewCart from "./customer/ViewCart";
import MakePayment from "./customer/MakePayment";
import ViewProductdetails from "./customer/ViewProductdetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SearchProvider } from "./home/SearchContext";
import ShippingDetails from "./customer/ShippingDetails";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
       <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/farmer" element={<FarmerRegister />} />
          <Route path="/farmer" element={<FarmerMenu />} />
          <Route path="/consumer" element={<CustomerMenu />} />
          <Route path="/cart" element={<ViewCart />} />
          <Route path="/shipping" element={<ShippingDetails />} />
          <Route path="/payment" element={<MakePayment />} />
          <Route path="/view/product/:productId" element={<ViewProductdetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer /></SearchProvider>
    </div>
  );
}

export default App;
