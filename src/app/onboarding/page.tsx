"use client";

import { useState } from "react";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import { StepWelcome } from "@/components/onboarding/StepWelcome";
import { StepContact } from "@/components/onboarding/StepContact";
import { StepCenter } from "@/components/onboarding/StepCenter";
import { StepActivities } from "@/components/onboarding/StepActivities";
import { StepPlan } from "@/components/onboarding/StepPlan";
import { StepSuccess } from "@/components/onboarding/StepSuccess";

type Billing = "anual" | "mensual";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [billing, setBilling] = useState<Billing>("anual");
  const [selectedPlan, setSelectedPlan] = useState("go_pro");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  function renderStep() {
    switch (step) {
      case 0:
        return <StepWelcome onNext={next} />;
      case 1:
        return <StepContact onNext={next} onBack={back} />;
      case 2:
        return <StepCenter onNext={next} onBack={back} />;
      case 3:
        return (
          <StepActivities
            activities={activities}
            setActivities={setActivities}
            onNext={next}
            onBack={back}
          />
        );
      case 4:
        return (
          <StepPlan
            billing={billing}
            setBilling={setBilling}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            onNext={next}
            onBack={back}
          />
        );
      case 5:
        return <StepSuccess />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-[300px_1fr] min-h-screen">
      <div className="flex items-center px-6 py-6 md:px-12 md:py-20 border-b border-dark-muted md:border-b-0">
        <OnboardingStepper currentStep={step} />
      </div>
      <div className="flex items-start md:items-center py-8 px-5 md:py-16 md:px-8 lg:px-14 overflow-y-auto">
        <div className="w-full max-w-145 mx-auto">{renderStep()}</div>
      </div>
    </div>
  );
}
