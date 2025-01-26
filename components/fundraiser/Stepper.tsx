import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useScreen, useWindowSize } from "usehooks-ts";

const steps = [
  { stepNumber: 0, label: "General" },
  { stepNumber: 1, label: "Class Association" },
  { stepNumber: 2, label: "Dates" },
];

type StepperProps = {
  currentStep: number;
};

export const Stepper = ({ currentStep }: StepperProps) => {
  const screen = useWindowSize();

  if (screen.width <= 1015) {
    const current =
      steps.find((step) => step.stepNumber === currentStep) ?? steps[0];

    return (
      <div
        key={currentStep}
        className="flex items-center justify-center gap-5 w-fit"
      >
        <div
          className={
            "flex items-center justify-center min-w-10 min-h-10 rounded-full bg-blue text-primary"
          }
        >
          {currentStep + 1}
        </div>

        <span className={"text-base font-medium text-secondary"}>
          {current.label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full gap-5">
      {steps.map((step, index) => (
        <div
          key={step.stepNumber}
          className="flex items-center justify-center gap-5 w-fit"
        >
          <div
            className={`flex items-center justify-center min-w-10 min-h-10 rounded-full ${
              currentStep === step.stepNumber
                ? "bg-blue text-primary"
                : "bg-grayLight text-secondary"
            }`}
          >
            {step.stepNumber + 1}
          </div>

          <span
            className={`text-base font-medium ${
              currentStep === step.stepNumber
                ? "text-secondary"
                : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <span className="text-gray-400">
              <ArrowLongRightIcon className="w-6 h-6 text-gray-400" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
