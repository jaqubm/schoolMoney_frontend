"use client";

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FundraiserStep2Form = () => {
  const { register, setValue, formState } = useFormContext();

  const handleSelectChange = (value: string) => {
    setValue("classId", value, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Class</label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {/* Dynamiczne lub statyczne opcje */}
            <SelectItem value="1A">Class 1A</SelectItem>
            <SelectItem value="2B">Class 2B</SelectItem>
            <SelectItem value="3C">Class 3C</SelectItem>
          </SelectContent>
        </Select>
        {/* Wyświetlenie błędu, jeśli istnieje */}
        {/*{formState.errors.classId?.message && (*/}
        {/*    <p className="text-sm text-red-500 mt-1">*/}
        {/*        {formState.errors.classId.message}*/}
        {/*    </p>*/}
        {/*)}*/}
        <p className="text-xs text-gray-500 mt-1">
          Assign this fundraiser to a specific class
        </p>
      </div>
    </div>
  );
};

export default FundraiserStep2Form;
