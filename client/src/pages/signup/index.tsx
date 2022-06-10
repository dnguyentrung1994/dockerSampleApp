import { useState } from "react";
import Stepper from "../../components/common/Stepper";

type SignUpProp = {
  asAdmin?: boolean;
};

const SignUpForm: React.FC<SignUpProp> = ({ asAdmin = false }: SignUpProp) => {
  // const maxStep = asAdmin ? 3 : 2;
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div>
      <Stepper
        currentStep={currentStep}
        steps={[
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
          {
            description: "placeHolder3",
            onClick: () => {
              setCurrentStep(3);
            },
          },
        ]}
      />
    </div>
  );
};

export default SignUpForm;
