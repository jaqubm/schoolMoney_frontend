"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/queries/user/user";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Stepper } from "@/components/fundraiser/Stepper";
import FundraiserStep1Form from "@/components/fundraiser/FundraiserStep1Form";
import React, { useEffect, useState } from "react";
import { stepSchemas } from "@/app/newFundraiser/validationRules";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FundraiserStep2Form from "@/components/fundraiser/FundraiserStep2Form";
import FundraiserStep3Form from "@/components/fundraiser/FundraiserStep3Form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useCreateFundraiser } from "@/queries/fundraiser/fundraiser";

const stepComponents = [
  FundraiserStep1Form,
  FundraiserStep2Form,
  FundraiserStep3Form,
];

const FundraisersPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const router = useRouter();
  const { data: user } = useUserData();
  const CurrentForm = stepComponents[currentStep];
  const isLastStep = currentStep === stepComponents.length - 1;
  const createFundraiserMutation = useCreateFundraiser();

  const methods = useForm<z.infer<(typeof stepSchemas)[number]>>({
    resolver: zodResolver(stepSchemas[currentStep]),
    defaultValues: formData,
    mode: "onChange",
  });

  const { handleSubmit, trigger, watch, reset, getValues } = methods;
  const values = watch();

  useEffect(() => {
    reset(formData);
  }, [currentStep]);

  useEffect(() => {
    const currentSchema = stepSchemas[currentStep];
    let currentFields: string[] = [];

    if (currentSchema instanceof z.ZodObject) {
      currentFields = Object.keys(currentSchema.shape);
    }

    if (currentSchema instanceof z.ZodEffects) {
      const baseSchema = currentSchema._def.schema;
      currentFields = Object.keys(baseSchema.shape);
    }

    console.log("Current Fields:", { currentFields });

    const allFieldsFilled = currentFields.every((field) => {
      const value = getValues(field as keyof typeof formData);

      if (field === "goalAmount") {
        return typeof value === "number" && !isNaN(value);
      }

      if (field === "imageIndex") {
        return value !== null && value !== undefined;
      }

      return value !== "" && value !== undefined && value !== 0;
    });

    setIsNextEnabled(allFieldsFilled);
  }, [currentStep, getValues, values]);

  const handleNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setFormData((prev) => ({ ...prev, ...getValues() }));
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
    }
  };

  const handlePrevStep = () => {
    setFormData((prev) => ({ ...prev, ...getValues() }));
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = () => {
    const finalData = { ...formData, ...getValues() };

    createFundraiserMutation.mutate(finalData, {
      onSuccess: () => {
        router.push("/fundraisers");
      },
    });

    // toast({
    //   title: "Fundraiser Created",
    //   description: "Your fundraiser has been successfully created.",
    // });

    // router.push("/fundraisers");
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <div className="flex items-center gap-4">
          <span className="text-base">Welcome, {user?.name || "User"}</span>
          <Avatar>
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-fit justify-start items-center p-3 pl-6 pt-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-4 text-secondary hover:text-gray-800"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-xl font-bold">Start Fundraiser</span>
            </button>
          </div>

          <div className="flex items-center pl-14">
            <p className="text-gray-500 text-sm">
              Add a new fundraiser to your class
            </p>
          </div>

          <div className="flex items-center pl-14 mt-8">
            <Stepper currentStep={currentStep} />
          </div>

          <div className="flex items-center justify-center pl-14">
            <FormProvider {...methods}>
              <div className="flex items-center justify-center pt-5">
                <CurrentForm />
              </div>
            </FormProvider>
          </div>

          <div className="flex items-center justify-center pt-8 gap-4 pl-14">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={
                isLastStep ? handleSubmit(handleFinalSubmit) : handleNextStep
              }
              disabled={!isNextEnabled}
              className={`${
                isNextEnabled
                  ? "bg-blue text-white hover:bg-blueLight"
                  : "bg-grayLight text-secondary cursor-not-allowed"
              } px-6 py-2 rounded-md`}
            >
              {isLastStep ? "Submit" : "Next Step"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisersPage;
