"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { playfairFont } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        if (remember) localStorage.setItem("remember", "1");
        toast.success("Welcome back");
        router.push("/admin");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/icons/candle.svg"
              alt="Glow and Gather Logo"
              width={60}
              height={60}
            />
          </div>
          <h1
            className="text-4xl font-bold text-foreground mb-2"
            style={playfairFont}
          >
            Admin Login
          </h1>
          <p className="text-muted-foreground">
            Sign in to manage your store
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="admin@glowandgather.com" />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            {/* Submit Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" disabled={isLoading} className="w-full" style={playfairFont}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Admins only</TooltipContent>
            </Tooltip>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button variant="link" onClick={() => router.push("/")}>← Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;