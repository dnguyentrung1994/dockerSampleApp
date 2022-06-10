import clsx from "clsx";
import Styles from "./Step.module.css";

export type StepState = {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
  onClick?: () => void;
};

type StepProps = {
  key: number;
  lastStep: boolean;
  stepState: StepState;
};
const Step: React.FC<StepProps> = ({ key, stepState, lastStep }) => {
  return (
    <div
      key={key}
      className={clsx(
        lastStep ? Styles.lastStepContainer : Styles.stepContainer
      )}
      onClick={stepState.onClick}
    >
      <div className={clsx(Styles.stepContents)}>
        <div
          className={clsx(
            stepState.completed ? Styles.stepSelected : Styles.stepBase
          )}
        >
          {stepState.completed ? (
            <span className={clsx(Styles.completedStep)}>✓</span>
          ) : (
            stepState.highlighted && (
              <div className="relative">
                <div className={clsx(Styles.highlightedStep)}></div>
                <div className={clsx(Styles.highlightedStepPing)}></div>
              </div>
            )
          )}
        </div>
        <div
          className={clsx(
            stepState.highlighted
              ? Styles.stepDescriptionHighlighted
              : Styles.stepDescriptionNormal
          )}
        >
          {stepState.description}
        </div>
      </div>
      <div className={clsx(Styles.stepOverlay)}> </div>
    </div>
  );
};

export default Step;
