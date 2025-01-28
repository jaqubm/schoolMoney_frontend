"use client";

import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {UserInfo} from "@/components/UserInfo";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Define the routes where user info should be hidden
  const hideUserInfoRoutes = ["/", "/login", "/register"];
  const showUserInfo = !hideUserInfoRoutes.includes(pathname);

  const handleLogoClick = () => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };

  return showUserInfo ? (
            <nav
                className={`flex h-24 justify-between items-center w-full p-4 relative z-20 ${
                    showUserInfo ? "border-b" : "border-b-0"
                }`}
            >
              {/* Logo */}
              <button onClick={handleLogoClick} className="text-2xl font-poppins">
                School<span className="font-bold">Money</span>
              </button>

              {/* Conditionally Render User Info */}
              {showUserInfo && <UserInfo />}
            </nav>
        ) : null;
}
