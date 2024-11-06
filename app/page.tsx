"use client";

import React from "react";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen">
      <Header>
        <Button
          variant="default"
          onClick={() => console.log("Logging in")}
          className="px-4 py-2 btn-secondary"
        >
          Login
        </Button>
      </Header>

      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/better-hands.jpeg')" }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex items-start h-full text-white z-10 px-4 text-center">
        <div className="relative flex flex-col items-start justify-start h-full text-white px-10 mt-24">
          <h1 className="text-3xl font-bold mb-4">Welcome to SchoolMoney</h1>
          <p className="text-2xl mb-8 font-semibold">
            Managing school fundraisers has never been{" "}
            <span className="italic">easier!</span>
          </p>
          <p className="mb-2">
            Invite parents and track their contributions effortlessly
          </p>
          <p className="mb-2">
            Stay updated with real-time reports on fundraising progress
          </p>
          <p className="mb-8">
            Create and manage fundraising campaigns for your class
          </p>
          <Button
            variant="default"
            onClick={() => router.push("/register")}
            className="px-4 py-2 btn-secondary"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
