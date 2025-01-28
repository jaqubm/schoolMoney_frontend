"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

const WelcomePage = () => {
  const router = useRouter();

    const handleLogoClick = () => {
        const token = Cookies.get("access_token");
        if (token) {
            router.push("/home");
        } else {
            router.push("/");
        }
    };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/better-hands.jpeg')" }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-full relative flex flex-col items-start h-full text-white z-10 px-4 text-center">
          <div className="w-full flex justify-between p-4">
              {/* Logo */}
              <button onClick={handleLogoClick} className="text-2xl font-poppins">
                  School<span className="font-bold">Money</span>
              </button>

              <Button
                  variant="default"
                  onClick={() => {
                      if (Cookies.get("access_token")) {
                          router.replace("/home");
                      } else router.push("/login");
                  }}
                  className="px-4 py-2 btn-secondary"
              >
                  Login
              </Button>
          </div>
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
