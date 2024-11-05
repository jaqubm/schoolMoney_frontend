"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left side with image */}
      <div className="w-1/2 bg-cover bg-center relative">
        <Image
          src="/login_background.jpg"
          alt="School"
          fill={true}
          sizes="50vw"
          priority={true}
          className="object-cover opacity-70"
        />
        <div className="pl-5 flex justify-between">
          <div className="flex z-0 text-white text-4xl">
            <h1>School</h1>
            <h1 className="font-bold">Money</h1>
          </div>
        </div>
        <div className="flex flex-col h-screen items-center pt-20">
          <div className="z-0 text-center mb-[350px] font-semibold text-white text-[72px]">
            <h1>Welcome Back!</h1>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16 pb-52">
        <h2 className="text-4xl font-semibold mb-4">Login</h2>
        <p className="mb-8 text-gray-600">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-[30px]">
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            ></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full"
            />
          </div>
          <div className="mb-[50px]">
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            ></Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-gray-600">
          New User?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}