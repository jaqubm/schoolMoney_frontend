"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { getApiStatus } from "@/app/api/status";

export default function Home() {
  // Use like normal React

  console.log(getApiStatus());

  return (
    <>
      <ModeToggle />
    </>
  );
}
