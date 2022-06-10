import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Step, { StepState } from "./Step";
import Styles from "./Stepper.module.css";

type StepperProps = {
  currentStep: number;
  header?: string;
  steps: {
    description: string;
    onClick?: () => void;
  }[];
};

const Stepper: React.FC<StepperProps> = ({
  currentStep = 1,
  steps,
  header,
}) => {
  const baseZeroActiveStep =
    currentStep < 0
      ? 0
      : currentStep >= steps.length
      ? steps.length - 1
      : currentStep - 1;

  const [stepperSteps, setSteps] = useState<StepState[]>([]);
  const stepStateRef = useRef<StepState[]>();

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step.description,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
      onClick: step.onClick ?? undefined,
    }));
    stepStateRef.current = stepsState;
    const currentSteps = updateStep(baseZeroActiveStep, stepsState);
    setSteps(currentSteps);
  }, [baseZeroActiveStep, steps]);
  console.log(stepperSteps);

  const updateStep = (stepNumber: number, steps: any[]) => {
    return steps.map((value, index) => ({
      ...value,
      completed: index < stepNumber,
      highlighted: index === stepNumber,
      selected: index <= stepNumber,
    }));
  };
  return (
    <div className={clsx(Styles.component)}>
      <div className="flex flex-row">
        {stepperSteps.map((step, index) => (
          <Step
            key={index}
            lastStep={index === steps.length - 1}
            stepState={step}
          />
        ))}
      </div>
      {header && (
        <div className=" text-3xl justify-self-center self-center pt-8 italic">
          {header}
        </div>
      )}
    </div>
  );
};

export default Stepper;
