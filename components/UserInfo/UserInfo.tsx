"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserData } from "@/queries/user";

export const UserInfo = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();

  return (
      <div className="flex items-center">
      <span className="text-lg mr-4">
        {loadingUser ? "Loading..." : `Welcome, ${userData?.name || "Guest"}`}
      </span>
        <Avatar>
          <AvatarFallback>
            {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                "G"}
          </AvatarFallback>
        </Avatar>
      </div>
  );
};
