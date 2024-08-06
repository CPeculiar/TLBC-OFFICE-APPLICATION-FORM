import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Layouts/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import NotFound from "./Components/Layouts/NotFound";

const App = () => {
  return (
    <>
    
    <Routes>
    <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} /> 
      
      {/* <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      /> */}
    </Routes>
    </>
  );
};

export default App;
