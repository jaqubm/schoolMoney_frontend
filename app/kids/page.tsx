"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useUserData } from "@/queries/user";

const KidsProfilesPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Upper screen */}
      <Header withBorder>
        <div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser
              ? "Loading..."
              : `Welcome, ${userData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser ? "..." : userData?.name?.[0] || "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      {/* Lower screen */}
      <div className="flex w-full h-full overflow-hidden">
        {/* Left section */}
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">
          {/* Title bar */}
          <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
            <h2 className="text-4xl font-normal line-">Kids&apos; profiles</h2>
            <Button
              variant="outline"
              className="text-xl w-[284px] bg-blue hover:bg-blueLight"
              onClick={() => router.push("/kids/registerKid")}
            >
              Register kid
            </Button>
          </div>

          {/* Profiles list */}
          <div className="flex overflow-x-auto gap-6 mt-6 h-full max-h-[650px] items-center">
            {loadingUser ? (
              <p className="flex h-full w-full">Loading profiles...</p>
            ) : userData?.children && userData.children.length > 0 ? (
              userData.children.map((child) => (
                <div
                  key={child.childId}
                  className="flex flex-col items-center justify-center border rounded-lg p-6 h-full max-h-[576px] min-w-[576px] shadow-md"
                >
                  <Avatar className="w-52 h-52">
                    <AvatarFallback className={"text-4xl"}>
                      {child.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center gap-2 mt-5">
                    <p className="text-xl font-bold">{child.name}</p>
                    <p className="text-xl">
                      <strong>School</strong> {child.schoolName}
                    </p>
                    <p className="text-xl">
                      <strong>Class:</strong> {child.className}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex h-full w-full">No kids profiles available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsProfilesPage;
