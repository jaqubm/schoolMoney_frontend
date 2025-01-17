"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useUserData, useGetClasses } from "@/queries/user";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

const ClassProfilesPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { data: classes, isLoading: loadingClasses } = useGetClasses();
  const router = useRouter();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTreasurer, setSelectedTreasurer] = useState("");

  const [appliedSchool, setAppliedSchool] = useState("");
  const [appliedClass, setAppliedClass] = useState("");
  const [appliedTreasurer, setAppliedTreasurer] = useState("");

  // Toggle filter modal
  const showModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  // Apply filter logic
  const handleFilter = () => {
    setAppliedSchool(selectedSchool);
    setAppliedClass(selectedClass);
    setAppliedTreasurer(selectedTreasurer);
    setShowFilterModal(false);
  };

  // Reset filters
  const handleReset = () => {
    setSelectedSchool("");
    setSelectedClass("");
    setSelectedTreasurer("");
    setAppliedSchool("");
    setAppliedClass("");
    setAppliedTreasurer("");
    setShowFilterModal(false);
  };

  // Filtered classes
  const filteredClasses = useMemo(() => {
    if (!classes) return [];
    return classes
      .filter((classItem) => {
        const schoolMatch =
          appliedSchool === "" || classItem.schoolName === appliedSchool;
        const classMatch =
          appliedClass === "" || classItem.name === appliedClass;
        const treasurerMatch =
          appliedTreasurer === "" ||
          `${classItem.treasurer.name} ${classItem.treasurer.surname}` ===
            appliedTreasurer;
        return schoolMatch && classMatch && treasurerMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [classes, appliedSchool, appliedClass, appliedTreasurer]);

  // Unique class list (no duplicates)
  const uniqueClasses = useMemo(() => {
    if (!classes) return [];
    return Array.from(new Set(classes.map((classItem) => classItem.name)));
  }, [classes]);

  // Unique school list (filtered by class)
  const uniqueSchools = useMemo(() => {
    if (!selectedClass || !classes) return [];
    return Array.from(
      new Set(
        classes
          .filter((classItem) => classItem.name === selectedClass)
          .map((classItem) => classItem.schoolName),
      ),
    );
  }, [selectedClass, classes]);

  // Unique treasurers list
  const uniqueTreasurers = useMemo(() => {
    if (!classes) return [];
    return Array.from(
      new Set(
        classes.map(
          (classItem) =>
            `${classItem.treasurer.name} ${classItem.treasurer.surname}`,
        ),
      ),
    );
  }, [classes]);

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
                : `${userData?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}`.toUpperCase() || "G"}
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
            <h2 className="text-4xl font-normal">Classes</h2>
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-400">
              <AdjustmentsHorizontalIcon
                className="w-6 h-6"
                onClick={showModalToggle}
              />
            </button>
            <Button
              variant="outline"
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
              onClick={() => router.push("/classes/create")}
            >
              Create class
            </Button>
          </div>

          {/* Classes list */}
          <div className="flex overflow-x-auto overflow-visible gap-6 mt-6 h-full max-h-[650px] items-center mr-[59px] mb-7 px-7">
            {loadingClasses ? (
              <p className="flex h-full w-full">Loading classes...</p>
            ) : filteredClasses.length > 0 ? (
              filteredClasses.map((classItem) => (
                <div
                  key={classItem.classId}
                  className="flex flex-col items-center justify-center border rounded-lg h-full max-h-[400px] min-w-[400px] shadow-md"
                >
                  <Avatar className="w-52 h-52">
                    <AvatarFallback className="text-3xl text-wrap">
                      {classItem.name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center gap-2 mt-5">
                    <p className="text-xl">
                      <strong>School:</strong> {classItem.schoolName}
                    </p>
                    <p className="text-xl">
                      <strong>Treasurer:</strong> {classItem.treasurer.name}{" "}
                      {classItem.treasurer.surname}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex h-full w-full">No classes available.</p>
            )}
          </div>
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
                  {/* Filter By Class */}
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

                  {/* Filter By School */}
                  <div>
                    <label
                      className={
                        !selectedClass ? "text-gray-400" : "text-black"
                      }
                    >
                      By School
                    </label>
                    <select
                      className="w-full border p-2 rounded-lg bg-white"
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      disabled={!selectedClass}
                    >
                      <option value="">Select school</option>
                      {uniqueSchools.map((schoolName, index) => (
                        <option key={index} value={schoolName}>
                          {schoolName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter By Treasurer */}
                  <div>
                    <label className="text-black">By Treasurer</label>
                    <select
                      className="w-full border p-2 rounded-lg bg-white text-black"
                      value={selectedTreasurer}
                      onChange={(e) => setSelectedTreasurer(e.target.value)}
                    >
                      <option value="">Select treasurer</option>
                      {uniqueTreasurers.map((treasurer, index) => (
                        <option key={index} value={treasurer}>
                          {treasurer}
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
      </div>
    </div>
  );
};

export default ClassProfilesPage;
