"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";
import FundraisersList from "@/components/fundraiser/FundraisersList";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/activity-card";
import { clsx } from "clsx";
import { useUserData } from "@/queries/user/user";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Stepper } from "@/components/fundraiser/Stepper";
import FundraiserStep1Form from "@/components/fundraiser/FundraiserStep1Form";
import React, { useEffect, useState } from "react";
import { stepSchemas } from "@/app/newFundraiser/validationRules";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FundraiserStep2Form from "@/components/fundraiser/FundraiserStep2Form";
import FundraiserStep3Form from "@/components/fundraiser/FundraiserStep3Form";
import { toast } from "@/hooks/use-toast";
// type FundraiserForm = z.infer<(typeof stepSchemas)[number]>;
type FundraiserForm = z.infer<typeof stepSchemas>;

const stepComponents = [
  FundraiserStep1Form,
  FundraiserStep2Form,
  FundraiserStep3Form,
];

const FundraisersPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  // const currentSchema = stepSchemas[currentStep - 1];
  // const currentSchema = stepSchemas;
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const { data: user } = useUserData();

  const methods = useForm<FundraiserForm>({
    // resolver: zodResolver(currentSchema),
    resolver: zodResolver(stepSchemas),
    defaultValues: {
      title: "",
      description: "",
      goalAmount: 0,
      // classId: "",
      // startDate: "",
      // endDate: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, trigger, formState, watch } = methods;
  const values = watch();

  useEffect(() => {
    const allFieldsFilled = Object.values(values).every(
      (value) => value !== "" && value !== 0,
    );
    // toast({
    //   title: allFieldsFilled ? "wypełnione" : "niewypełnione",
    //   description: `Errors: ${JSON.stringify(formState.errors, null, 2)}`,
    // });
    // setIsNextEnabled(allFieldsFilled && formState.isValid);
    setIsNextEnabled(allFieldsFilled);
  }, [values, formState.isValid]);

  const handleNextStep = async () => {
    const isValid = await trigger();
    console.log(values);
    toast({
      title: isValid ? "jestem następny" : "nie jestem",
      description: "ncnsd",
    });

    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // const isLastStep = currentStep === stepSchemas.length;
  const isLastStep = currentStep === 3;

  const handleSubmitForm = () => {
    // do zrobienia
    console.log("Submitting fundraiser data...");
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
                {/*<Stepper currentStep={currentStep} />*/}

                <div className="flex items-center justify-center p-6">
                  {currentStep === 1 && <FundraiserStep1Form />}
                  {currentStep === 2 && <FundraiserStep2Form />}
                  {currentStep === 3 && <FundraiserStep3Form />}
                </div>
              </div>
            </FormProvider>
          </div>

          <div className="flex items-center justify-center pt-8 gap-4">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={
                isLastStep ? handleSubmit(handleSubmitForm) : handleNextStep
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
