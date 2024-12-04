"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FundraiserStep1Form = () => {
  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col items-center p-6 shadow-lg rounded-md bg-white">
      <div className="flex flex-wrap justify-between w-full max-w-4xl gap-6">
        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Name
          </label>
          <Input
            {...register("title")}
            placeholder="Fundraiser Name"
            className="w-full"
          />
          {/*{formState.errors.name?.message && (*/}
          {/*  <p className="text-sm text-red-500 mt-1">*/}
          {/*    {formState.errors.name.message}*/}
          {/*  </p>*/}
          {/*)}*/}
          <p className="text-xs text-gray-500 mt-1">
            Give your fundraiser a short and clean name
          </p>
        </div>

        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Fundraiser Description"
            className="w-full resize-none"
          />
          {/*{formState.errors.description?.message && (*/}
          {/*  <p className="text-sm text-red-500 mt-1">*/}
          {/*    {formState.errors.description.message}*/}
          {/*  </p>*/}
          {/*)}*/}
          <p className="text-xs text-gray-500 mt-1">
            Describe the purpose of the fundraiser and its impact
          </p>
        </div>

        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Goal
          </label>
          <Input
            {...register("goalAmount")}
            type="number"
            placeholder="Fundraiser Goal"
            className="w-full"
          />
          {/*{formState.errors.goal?.message && (*/}
          {/*  <p className="text-sm text-red-500 mt-1">*/}
          {/*    {formState.errors.goal.message}*/}
          {/*  </p>*/}
          {/*)}*/}
          <p className="text-xs text-gray-500 mt-1">
            Set a clear and achievable goal
          </p>
        </div>

        {/*<div className="flex flex-col items-center justify-center w-[48%] border-2 border-dashed border-gray-300 rounded-lg h-[120px]">*/}
        {/*  <p className="text-sm text-gray-500">Drop your image here</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default FundraiserStep1Form;
