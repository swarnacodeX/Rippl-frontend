import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

import type { RootState } from "@/components/state/persist/store";
import { useSelector } from "react-redux";
interface Item { id: number; name: string; price: number; age: number; description: string; category: string }

export default function Sell() {
  const categories = ["Electronics", "Clothing", "Books", "Furniture", "Toys"];
  const email=useSelector((state:RootState)=>state.user.email);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ id:0, name: "", price:0, age: 0, category: categories[0], description: ""});

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.category) return;

    try {
      const response = await axios.post("http://localhost:2400/api/items/newItem", { email, itemName: newItem.name, itemAge: newItem.age, itemCategory: newItem.category,
                                                                                       itemDescription: newItem.description, itemPrice: newItem.price});
      setItems([
        {
          ...newItem,
          id: response.data.itemId
          
        },
        ...items,
      ]);

      setNewItem({ id:0, name: "", price:0, age:0, category: categories[0], description: ""});
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Selling Items</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mb-4 bg-[#febd69] hover:bg-[#f3a847] text-black">
            Sell Item
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 space-y-2 bg-white shadow-md rounded-md w-[300px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border rounded p-2"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="age">Age (in months)</Label>
              <Input
                id="age"
              
                value={newItem.age}
                onChange={(e) => setNewItem({ ...newItem, age: Number(e.target.value) })}
              />
            </div>
            <Button
              type="submit"
              className="bg-[#232f3e] text-white w-full"
            >
              Add Item
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-white">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-md font-bold mt-2">₹{item.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Category: {item.category}</p>
              <p className="text-xs text-gray-500">Age: {item.age} months</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
