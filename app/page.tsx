"use client";

// import { ModeToggle } from "@/components/mode-toggle";
// import { getApiStatus } from "@/app/api/status";
//
// export default function Home() {
//   // Use like normal React
//
//   console.log(getApiStatus());
//
//   return (
//     <>
//       <ModeToggle />
//     </>
//   );
// }

import React from 'react';
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";

const WelcomePage = () => {
    return (
        <div className="relative h-screen w-screen">
            <Header buttonText="Login" onButtonClick={() => console.log("Navigate to login")}/>

            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{backgroundImage: "url('/assets/better-hands.jpeg')"}}
            ></div>

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative flex flex-col items-center justify-center h-full text-white z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to SchoolMoney</h1>
                <p className="text-xl mb-6 font-semibold">
                    Managing school fundraisers has never been <span className="italic text-indigo-300">easier!</span>
                </p>
                <p className="mb-2">Invite parents and track their contributions effortlessly.</p>
                <p className="mb-2">Stay updated with real-time reports on fundraising progress.</p>
                <p className="mb-8">Create and manage fundraising campaigns for your class.</p>
                <Button
                    variant="default"
                    onClick={() => console.log("Get Started clicked")}
                    // className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg"
                    className="px-4 py-2 font-poppins bg-button-bg text-button-text rounded-lg"
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;

