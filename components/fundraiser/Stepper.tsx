import React from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

const steps = [
    { stepNumber: 0, label: 'General' },
    { stepNumber: 1, label: 'Class Association' },
    { stepNumber: 2, label: 'Dates' },
]

type StepperProps = {
    currentStep: number
}

export const Stepper = ({ currentStep }: StepperProps) => {
    return (
        <div className="flex items-center justify-center w-full">
            {steps.map((step, index) => (
                <div
                    key={step.stepNumber}
                    className="flex items-center justify-center gap-5 w-fit p-5"
                >
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            currentStep === step.stepNumber
                                ? 'bg-blue text-primary'
                                : 'bg-grayLight text-secondary'
                        }`}
                    >
                        {step.stepNumber + 1}
                    </div>

                    <span
                        className={`text-base font-medium ${
                            currentStep === step.stepNumber
                                ? 'text-secondary'
                                : 'text-gray-500'
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
    )
}
