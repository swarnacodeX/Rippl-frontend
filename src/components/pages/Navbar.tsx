import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu } from "lucide-react";
import {Sheet,SheetContent,SheetTrigger,} from "@/components/ui/sheet";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import type { RootState } from "../state/persist/store";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state: RootState) => state.user);
  
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-[#000000] text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#232f3e] text-white">
                <nav className="flex flex-col gap-4 mt-8">
                  <h2 className="text-xl font-bold">Hello, {user.firstname || 'Sign in'}</h2>
                  <Link to="/home/todays-deals" className="py-2 hover:underline">Today's Deals</Link>
                  <Link to="/home/customer-service" className="py-2 hover:underline">Customer Service</Link>
                  <Link to="/home/registry" className="py-2 hover:underline">Registry</Link>
                  <Link to="/home/gift-cards" className="py-2 hover:underline">Gift Cards</Link>
                  <Link to="/home/sell" className="py-2 hover:underline">Sell</Link>

                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            strim.in
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="flex w-full max-w-3xl">
              <Input
                type="text"
                placeholder="Search Strim.in"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0"
              />
              <Button className="rounded-l-none bg-[#febd69] hover:bg-[#f3a847] text-black">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  <div className="text-left">
                    <p className="text-xs">Hello, {user.firstname || 'Guest'}</p>
                    <p className="text-sm font-bold">Account & Lists</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/home/account">Your Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home/orders">Your Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home/wishlist">Your Wish List</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to ="/home/messages">Your Messages</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="hidden lg:block">
            <Button variant="ghost" className="text-white" asChild>
              <Link to="/orders">
                <div className="text-left">
                  <p className="text-xs">Returns</p>
                  <p className="text-sm font-bold">& Orders</p>
                </div>
              </Link>
            </Button>
          </div>
          
          <Button variant="ghost" className="text-white" asChild>
            <Link to="/cart">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 mr-1" />
                <span className="hidden sm:inline">Cart</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
      <div className="bg-[#232f3e] text-white py-1 px-4">
        <div className="container mx-auto flex items-center overflow-x-auto">
          <Button variant="ghost" className="text-white">
            <Menu className="h-5 w-5 mr-1" />
            <span>All</span>
          </Button>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            <Link to="/home/todays-deals" className="whitespace-nowrap py-1 px-2 text-sm hover:underline">Today's Deals</Link>
            <Link to="/home/customer-service" className="whitespace-nowrap py-1 px-2 text-sm hover:underline">Customer Service</Link>
            <Link to="/home/registry" className="whitespace-nowrap py-1 px-2 text-sm hover:underline">Registry</Link>
            <Link to="/home/gift-cards" className="whitespace-nowrap py-1 px-2 text-sm hover:underline">Gift Cards</Link>
            <Link to="/home/sell" className="whitespace-nowrap py-1 px-2 text-sm hover:underline">Sell</Link>
          </div>
        </div>
      </div>
      <div className="md:hidden bg-[#131921] px-4 pb-2">
        <div className="flex w-full">
          <Input
            type="text"
            placeholder="Search Strim.in"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0"
          />
          <Button className="rounded-l-none bg-[#ff9f21] hover:bg-[#ffca86] text-black">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
