import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

type PaymentFormProps<Fields extends FieldValues> = {
  hintMessage: string;
  placeholder: string;
} & UseControllerProps<Fields>;

const PaymentForm = <Fields extends FieldValues>({
  hintMessage,
  control,
  name,
  placeholder,
}: PaymentFormProps<Fields>) => {
  const { field, fieldState } = useController({ control, name });
  const error = fieldState.error?.message;

  return (
    <div className="flex flex-col w-fit h-fit gap-6 justify-center items-center">
      <div className="flex flex-col">
        <div className=""></div>
        <label className="text-sm font-medium text-secondary mb-1">
          Amount
        </label>
        {/*label*/}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
              PLN
            </span>
          </div>

          <Input
            className="pl-12 border border-gray-300 dark:border-gray-600"
            {...field}
            placeholder={placeholder}
          />
        </div>
        {error ? (
          <p className="text-red text-xs mt-1">{error}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">{hintMessage}</p>
        )}
      </div>

      <div className="flex w-full justify-center items-center">
        <Button
          type="submit"
          disabled={fieldState.invalid}
          className={`${
            !fieldState.invalid
              ? "bg-blue text-white hover:bg-blueLight"
              : "bg-grayLight text-secondary cursor-not-allowed"
          } px-6 py-2 rounded-md w-1/4`}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
