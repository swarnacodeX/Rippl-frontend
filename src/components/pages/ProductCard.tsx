// src/components/ProductCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  age:number;
  deliveryDate: string;
  isPrime?: boolean;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  age,
  deliveryDate,
  isPrime = false,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative pt-4 px-4 flex-grow">
        <div className="aspect-square relative overflow-hidden mb-4">
          <img
            src={image}
            alt={name}
            className="object-contain w-full h-full"
          />
        </div>

        <CardContent className="p-0 mb-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{name}</h3>
          
          

          <div className="mb-1">
            <span className="text-lg font-bold">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-700 border-red-200">
                  {discount}% off
                </Badge>
              </>
            )}
          </div>

          <div className="text-xs">
            Get it by <span className="font-bold">{deliveryDate}</span>
          </div>

          {isPrime && (
            <div className="mt-1">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Prime
              </Badge>
            </div>
          )}
          <div className="flex items-center mb-1">
            
            <span className="text-xs text-blue-600 ml-1">({age})</span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
