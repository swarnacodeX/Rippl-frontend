// src/pages/homeSections/TodaysDeals.tsx
import React from "react";
import { ProductCard } from "../../ProductCard";

const products = [
  {
    id: "1",
    name: "Apple iPhone 15 (128 GB) - Blue",
    price: 79900,
    originalPrice: 89900,
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Tomorrow, May 21",
    isPrime: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
    price: 124999,
    originalPrice: 149999,
    image: "https://m.media-amazon.com/images/I/51hqXIAVXAL._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Thursday, May 23",
    isPrime: true,
  },
  {
    id: "3",
    name: "boAt Airdopes 141 Bluetooth TWS Earbuds with 42H Playtime",
    price: 1299,
    originalPrice: 4499,
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Tomorrow, May 21",
    isPrime: true,
  },
  {
    id: "4",
    name: "HP Laptop 15s, 12th Gen Intel Core i5-1235U, 15.6-inch (39.6 cm), FHD, 16GB DDR4, 512GB SSD",
    price: 54990,
    originalPrice: 65999,
    image: "https://m.media-amazon.com/images/I/71fzx0pGY5L._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Friday, May 24",
    isPrime: false,
  },
  {
    id: "5",
    name: "Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling Headphones",
    price: 19990,
    originalPrice: 29990,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Tomorrow, May 21",
    isPrime: true,
  },
  {
    id: "6",
    name: "Amazon Basics 80 cm (32 inches) HD Ready Smart LED Fire TV",
    price: 12999,
    originalPrice: 24999,
    image: "https://m.media-amazon.com/images/I/71SZ+Qc1YJL._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Thursday, May 23",
    isPrime: true,
  },
  {
    id: "7",
    name: "Prestige Electric Kettle PKOSS - 1500watts, Steel (1.5Ltr), Black",
    price: 649,
    originalPrice: 1195,
    image: "https://m.media-amazon.com/images/I/51DGcy8eBCL._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Tomorrow, May 21",
    isPrime: true,
  },
  {
    id: "8",
    name: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen 15.6 inch (39.62cm) FHD Thin & Light Laptop",
    price: 49990,
    originalPrice: 73890,
    image: "https://m.media-amazon.com/images/I/61xzutxmAlL._AC_UY218_.jpg",
    age: 2345,
    deliveryDate: "Saturday, May 25",
    isPrime: false,
  },
];

export default function TodaysDeals(){
  return(
  <div>
    <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
    </div>
  )
}
