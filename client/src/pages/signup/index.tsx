import { useEffect, useState } from "react";
import Stepper from "../../components/common/Stepper";
import SignUpAsAdminStep from "./SignUpAsAdmin";
import SignUpPersonalDetailsStep from "./SignUpPersonalDetails";
import SignUpUserDetailsStep from "./SignUpUserDetails";

type SignUpProp = {
  asAdmin?: boolean;
};

const SignUpForm: React.FC<SignUpProp> = ({ asAdmin = false }: SignUpProp) => {
  const maxStep = asAdmin ? 3 : 2;
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (currentStep <= 0) {
      setCurrentStep(1);
    }
    if (currentStep > maxStep) {
      setCurrentStep(maxStep);
    }
  }, [currentStep, maxStep]);
  const SignUpModal = () => {
    switch (currentStep) {
      case 1: {
        return <SignUpUserDetailsStep />;
      }

      case 2: {
        return <SignUpPersonalDetailsStep />;
      }

      case 3: {
        return <SignUpAsAdminStep />;
      }
      default: {
        return <></>;
      }
    }
  };
  const steps = [
    {
      description: "placeHolder1",
      onClick: () => {
        setCurrentStep(1);
      },
    },
    {
      description: "placeHolder2",
      onClick: () => {
        setCurrentStep(2);
      },
    },
  ];
  if (maxStep === 3)
    steps.push({
      description: "placeHolder3",
      onClick: () => {
        setCurrentStep(3);
      },
    });
  return (
    <div>
      <Stepper
        header="Place holder title"
        currentStep={currentStep}
        steps={steps}
      />
      <SignUpModal />
    </div>
  );
};

export default SignUpForm;
