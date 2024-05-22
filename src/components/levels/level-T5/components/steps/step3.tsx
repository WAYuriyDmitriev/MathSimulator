import React, { useRef } from 'react';
import { IStepProps } from '../../../models/IStepProps';
import { ExpressionField } from '../../../../steps/expression/expression';
import '../../../level.scss';

export default function Step3({
                                  stepIndex,
                                  activeStep,
                                  onCompleteStep,
                                  onChangeCorrectStepState,
                                  fractionModel,
                                  isShowEqual,
                              }: IStepProps) {
    const arrayState = useRef([false, false]);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            onCompleteStep(stepIndex);
        }
    };

    return <>
        <div className="step">
            <div className="expression-wrapper">
                <div className="fraction">
                    <div className="dividend">
                        <ExpressionField
                            answer={fractionModel.allDividend}
                            onChangeCorrectState={(state) => onchange(0, state)}
                        />
                    </div>
                    <div className="slash w-100" />
                    <div className="divider">
                        <ExpressionField
                            answer={fractionModel.divider}
                            onChangeCorrectState={(state) => onchange(1, state)}
                        />
                    </div>
                </div>
            </div>
        </div>
        {isShowEqual && <div className="equal">=</div>}
    </>;
}