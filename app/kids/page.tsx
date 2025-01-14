"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useUserData, useGetClasses } from "@/queries/user";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const KidsProfilesPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { data: classes, isLoading: loadingClasses } = useGetClasses();
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleFilterToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilter = () => {
    console.log("Filter applied:", { selectedSchool, selectedClass });
    // TODO: Add filter logic here (e.g., updating the displayed profiles)
    setShowFilterModal(false);
  };

  const handleReset = () => {
    setSelectedSchool("");
    setSelectedClass("");
    console.log("Filters reset");
    // TODO: Add reset logic here
  };

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
      <div className="flex w-full h-full">
        {/* Left section */}
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full h-full pl-[59px] pt-[19px] overflow-hidden">
          {/* Title bar */}
          <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
            <h2 className="text-4xl font-normal line-">Kids&apos; profiles</h2>
            <button
              onClick={handleFilterToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-400"
            >
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </button>
            <Button
              variant="outline"
              className="text-xl w-[284px] bg-blue hover:bg-blueLight"
              onClick={() => router.push("/kids/registerKid")}
            >
              Register kid
            </Button>
          </div>

          {/* Profiles list */}
          <div className="flex overflow-x-auto overflow-visible gap-6 mt-6 h-full max-h-[650px] items-center mr-[59px]">
            {loadingUser ? (
              <p className="flex h-full w-full">Loading profiles...</p>
            ) : userData?.children && userData.children.length > 0 ? (
              userData.children.map((child) => (
                <div
                  key={child.childId}
                  className="flex flex-col items-center justify-center border rounded-lg h-full max-h-[576px] min-w-[576px] shadow-md"
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">
            <div className="flex items-center mb-4 justify-between">
              <p className="text-xl font-semibold text-black">Filter</p>
              <button
                className="text-black hover:text-gray-400"
                onClick={handleFilterToggle}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-black">By School</label>
                <select
                  className="w-full border p-2 rounded-lg bg-white text-black"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="">Select school</option>
                  {!loadingClasses &&
                    classes?.map((school) => (
                      <option key={school.classId} value={school.schoolName}>
                        {school.schoolName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-black">By Class</label>
                <select
                  className="w-full border p-2 rounded-lg bg-white text-black"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select class</option>
                  {!loadingClasses &&
                    classes?.map((classItem) => (
                      <option key={classItem.classId} value={classItem.name}>
                        {classItem.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  className="bg-blue text-white px-4 py-2 rounded-lg"
                  onClick={handleFilter}
                >
                  Filter
                </Button>
                <Button
                  className="bg-red text-white px-4 py-2 rounded-lg"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsProfilesPage;
