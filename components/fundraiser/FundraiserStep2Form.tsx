"use client";

import { useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { useClassesData } from "@/queries/classes/classes";
import { Input } from "@/components/ui/input";

const FundraiserStep2Form = () => {
  const { setValue, register } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const { data: classes, isLoading } = useClassesData(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedClass(null);
  };

  const handleClassSelect = (classItem: any) => {
    setSelectedClass(classItem.name);
    setValue("classId", classItem.classId, { shouldValidate: true });
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Class</label>
        <div className="relative">
          <Input
            {...register("classId")}
            type="text"
            placeholder="Search for a class"
            className="w-full p-2 border rounded-md"
            value={selectedClass || searchTerm}
            onChange={handleInputChange}
          />
          {searchTerm && (
            <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-48 overflow-y-auto">
              {isLoading ? (
                <li className="p-2 text-gray-500">Loading...</li>
              ) : classes && classes.length > 0 ? (
                classes.map((classItem: any) => (
                  <li
                    key={classItem.classId}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClassSelect(classItem)}
                  >
                    {classItem.name} ({classItem.schoolName})
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No classes found</li>
              )}
            </ul>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Assign this fundraiser to a specific class
        </p>
      </div>
    </div>
  );
};

export default FundraiserStep2Form;
