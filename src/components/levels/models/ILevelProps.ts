export interface ILevelProps {
    onCompleteStep: (step: number, totalSteps: number) => void;
    onCompleteLevel: () => void;
    onChangeCorrectStepState: (step: number, state: string) => void;
}