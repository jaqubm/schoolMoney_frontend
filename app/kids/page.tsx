"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useUserData } from "@/queries/user";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

const KidsProfilesPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [appliedSchool, setAppliedSchool] = useState("");
  const [appliedClass, setAppliedClass] = useState("");

  const showModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilter = () => {
    setAppliedSchool(selectedSchool);
    setAppliedClass(selectedClass);
    setShowFilterModal(false);
  };

  const handleReset = () => {
    setSelectedSchool("");
    setSelectedClass("");
    setAppliedSchool("");
    setAppliedClass("");
    setShowFilterModal(false);
  };

  const filteredChildren = useMemo(() => {
    if (!userData?.children) return [];
    return userData.children
      .filter((child) => {
        if (child.schoolName == undefined) child.schoolName = "No school";
        if (child.className == undefined) child.className = "No class";
        const schoolMatch =
          appliedSchool === "" || child.schoolName === appliedSchool;
        const classMatch =
          appliedClass === "" || child.className === appliedClass;
        return schoolMatch && classMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [userData?.children, appliedSchool, appliedClass]);

  const uniqueClasses = useMemo(() => {
    if (!userData?.children) return [];
    return Array.from(
      new Set(
        userData.children.map((child) =>
          child.className && child.className.trim() !== ""
            ? child.className
            : "No class",
        ),
      ),
    );
  }, [userData]);

  const uniqueSchools = useMemo(() => {
    if (!selectedClass || !userData?.children) return [];
    return Array.from(
      new Set(
        userData.children
          .filter(
            (child) =>
              (child.className && child.className.trim() !== ""
                ? child.className
                : "No class") === selectedClass,
          )
          .map((child) =>
            child.schoolName && child.schoolName.trim() !== ""
              ? child.schoolName
              : "No school",
          ),
      ),
    );
  }, [selectedClass, userData]);

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
              {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                  "G"}
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
              onClick={showModalToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-400"
            >
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </button>
            <Button
              variant="outline"
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
              onClick={() => router.push("/kids/registerKid")}
            >
              Register kid
            </Button>
          </div>

          {/* Profiles list */}
          <div className="flex overflow-x-auto overflow-visible gap-6 mt-6 h-full max-h-[650px] items-center mr-[59px] mb-7 px-7">
            {loadingUser ? (
              <p className="flex h-full w-full">Loading profiles...</p>
            ) : filteredChildren.length > 0 ? (
              filteredChildren.map((child) => (
                <div
                  key={child.childId}
                  className="flex flex-col items-center justify-center border rounded-lg h-full max-h-[400px] min-w-[400px] shadow-md cursor-pointer"
                  onClick={() => router.push(`/kids/${child.childId}`)}
                >
                  <Avatar className="w-52 h-52">
                    <AvatarFallback className="text-4xl">
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center gap-2 mt-5">
                    <p className="text-xl font-bold">{child.name}</p>
                    <p className="text-xl">
                      <strong>School:</strong> {child.schoolName}
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
                onClick={showModalToggle}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-black">By Class</label>
                <select
                  className="w-full border p-2 rounded-lg bg-white text-black"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setSelectedSchool("");
                  }}
                >
                  <option value="">Select class</option>
                  {uniqueClasses.map((className, index) => (
                    <option key={index} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className={
                    !selectedClass || selectedClass === "No class"
                      ? "text-gray-400"
                      : "text-black"
                  }
                >
                  By School
                </label>
                <select
                  className={`w-full border p-2 rounded-lg bg-white ${!selectedClass ? "border-gray-400 text-gray-400" : "border-black text-black"}`}
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  disabled={!selectedClass || selectedClass === "No class"}
                >
                  <option value="">Select school</option>
                  {uniqueSchools.map((schoolName, index) => (
                    <option key={index} value={schoolName}>
                      {schoolName}
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
