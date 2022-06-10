import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Step, { StepState } from "./Step";
import Styles from "./Stepper.module.css";

type StepperProps = {
  currentStep: number;
  steps: {
    description: string;
    onClick?: () => void;
  }[];
};

const Stepper: React.FC<StepperProps> = ({ currentStep = 1, steps }) => {
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
    <div className={clsx(Styles.stepperContainer)}>
      {stepperSteps.map((step, index) => (
        <Step key={index} lastStep={index === steps.length} stepState={step} />
      ))}
    </div>
  );
};

export default Stepper;
