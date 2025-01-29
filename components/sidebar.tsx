"use client";

import { Button } from "@/components/ui/button";
import {
  AcademicCapIcon,
  BanknotesIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  UsersIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";
import { useTheme } from "next-themes";

type IconProps = {
  className: string;
};

const NAV_ITEMS = [
  {
    name: "Home",
    Icon: ({ className }: IconProps) => <HomeIcon className={className} />,
    path: "/home",
  },
  {
    name: "Kids",
    Icon: ({ className }: IconProps) => <UsersIcon className={className} />,
    path: "/kids",
  },
  {
    name: "Fundraisers",
    Icon: ({ className }: IconProps) => <BanknotesIcon className={className} />,
    path: "/fundraisers",
  },
  {
    name: "Balances",
    Icon: ({ className }: IconProps) => (
      <CreditCardIcon className={className} />
    ),
    path: "/balances",
  },
  {
    name: "Classes",
    Icon: ({ className }: IconProps) => (
      <AcademicCapIcon className={className} />
    ),
    path: "/classes",
  },
] as const;

const BUTTON_STYLE =
  "w-full h-[60px] text-[18px] font-medium flex items-center justify-start gap-4";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col space-y-2 w-full">
        {NAV_ITEMS.map(({ name, path, Icon }) => {
          let isActive = pathname.startsWith(path);

          if (path === "/fundraisers") {
            isActive =
              pathname.startsWith("/fundraise") ||
              pathname.startsWith("/newFundraiser");
          }

          return (
            <Button
              key={name}
              variant="ghost"
              className={BUTTON_STYLE + (isActive ? " text-blue" : "")}
              onClick={() => router.push(path)}
            >
              <div className="flex justify-center items-center h-1/2">
                <Icon className="w-full h-full" />
              </div>
              {name}
            </Button>
          );
        })}
      </div>

      <div className="flex">
        <div className="w-full space-y-2">
          <Button
            key="Logout"
            variant="ghost"
            className={BUTTON_STYLE + " text-red"}
            onClick={handleLogout}
          >
            <div className="flex justify-center items-center h-1/2">
              <UserIcon className="w-full h-full rotate-180" />
            </div>
            Logout
          </Button>

          <Button
            key="Profile"
            variant="ghost"
            className={
              BUTTON_STYLE +
              (pathname.startsWith("/profile") ? " text-blue" : "")
            }
            onClick={() => router.push("/profile")}
          >
            <div className="flex justify-center items-center h-1/2">
              <UserIcon className="w-full h-full" />
            </div>
            Profile
          </Button>
        </div>

        <div className="flex justify-center items-end m-2">
          <Button
            className="h-12 bg-transparent border"
            onClick={handleThemeToggle}
          >
            {theme === "light" ? (
              <MoonIcon className="size-6" />
            ) : (
              <SunIcon className="size-6 text-yellow-200 hover:bg-none" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};
