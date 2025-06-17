// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/customer/Home";
import TodaysDeals from "./components/pages/customer/homeSections/TodaysDeals";
import Sell from "./components/pages/customer/homeSections/Sell";
import RegistryPage from "./components/pages/customer/homeSections/RegistryPage";
import GiftCardsPage from "./components/pages/customer/homeSections/GiftCard";
import CustomerService from "./components/pages/customer/homeSections/CustomerService";
import CategoryGrid from "./components/pages/customer/homeSections/CategoryGrid";
import AccountPage from "./components/pages/customer/homeSections/Account";
// Add other imports as needed

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="todays-deals" replace />} />
          <Route path="todays-deals" element={<TodaysDeals />} />
          <Route path="deals" element={<TodaysDeals />} />
          <Route path="sell" element={<Sell />} />
          <Route path="registry" element={<RegistryPage />} />
          <Route path="gift-cards" element={<GiftCardsPage />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="categories" element={<CategoryGrid />} />
          <Route path="account" element={<AccountPage />} />
          
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
