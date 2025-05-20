// App.tsx or App.jsx
"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Home from "./components/pages/customer/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;
