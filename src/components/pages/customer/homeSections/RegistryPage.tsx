// src/pages/RegistryPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegistryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a Registry</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registry Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="wedding" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="wedding" id="wedding" className="peer sr-only" />
                <Label
                  htmlFor="wedding"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="text-lg font-semibold">Wedding</div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="baby" id="baby" className="peer sr-only" />
                <Label
                  htmlFor="baby"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="text-lg font-semibold">Baby</div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="wishlist" id="wishlist" className="peer sr-only" />
                <Label
                  htmlFor="wishlist"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="text-lg font-semibold">Wishlist</div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registry Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Registry Name</Label>
                <Input id="name" placeholder="e.g., John & Jane's Wedding" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Tell us about your registry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacy">Privacy Settings</Label>
              <RadioGroup defaultValue="public" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="pt-4">
              <Button className="w-full">Create Registry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}