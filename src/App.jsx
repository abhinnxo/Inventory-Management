import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Category } from "./Pages/Category";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordOTP from "./Pages/ResetPasswordOTP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/otp" element={<ResetPasswordOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/category/:id" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
