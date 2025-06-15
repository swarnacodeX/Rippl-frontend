// src/pages/homeSections/Footer.tsx
import React from "react";

export default  function Footer(){
    return(
  <footer className="bg-[#232f3e] text-white py-6">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <button className="bg-[#37475A] hover:bg-[#485769] text-white py-2 px-4 rounded mb-6 w-full">
          Back to top
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mb-6">
          <div>
            <h3 className="font-bold mb-2">Get to Know Us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Connect with Us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Make Money with Us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Sell on Strim</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Let Us Help You</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Returns Centre</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; 2025, Amazon.in Clone</p>
        </div>
      </div>
    </div>
  </footer>
    )
}
