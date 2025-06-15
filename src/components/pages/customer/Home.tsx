// src/pages/HomePage.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import type { RootState } from "../../state/persist/store";
import { Navbar } from "../Navbar";
import Footer from "../customer/homeSections/Footer";

function useCheck() {
  const accesstoken = useSelector((state: RootState) => state.user.accesstoken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accesstoken) {
      navigate("/login");
    }
  }, [accesstoken, navigate]);
}

export default function Home() {
  useCheck();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet /> {/* This renders the nested route content */}
      </main>
      <Footer />
    </div>
  );
}
