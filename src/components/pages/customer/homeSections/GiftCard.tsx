// src/pages/GiftCardsPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gift Cards</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buy a Gift Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">₹500</SelectItem>
                    <SelectItem value="1000">₹1000</SelectItem>
                    <SelectItem value="2000">₹2000</SelectItem>
                    <SelectItem value="5000">₹5000</SelectItem>
                    <SelectItem value="custom">Custom Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input id="recipient" type="email" placeholder="Enter recipient's email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input id="message" placeholder="Add a personal message" />
              </div>
              <Button className="w-full">Purchase Gift Card</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redeem a Gift Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Gift Card Code</Label>
                <Input id="code" placeholder="Enter gift card code" />
              </div>
              <Button className="w-full">Redeem Gift Card</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Gift Card Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center py-8">₹0.00</div>
            <div className="flex justify-center">
              <Button variant="outline">View Gift Card History</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}