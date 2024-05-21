import React from 'react';
import { Expression } from '../../steps/expression/expression';
import { parseExpression } from '../../../parsers';
import { IStepProps } from './IStepProps';

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
    const stepData = {
        expression: '$frac(a@3 * b@9 + c@2, 9) + $frac(d@4 * e@7 + f@3, 7)',
    };
    return <>
        {activeStep <= stepIndex + 1 &&
            <>
                <div className="step">
                    <div className="hint-slot hint-slot--up">
                    </div>

                    <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
                        onChangeCorrectStepState(stepIndex, isCorrect);
                        if (isCorrect == 'correct' && activeStep == stepIndex) {
                            onCompleteStep(stepIndex);
                        }
                    }} isPassive={false} />
                    <div className="hint-slot hint-slot--down">
                    </div>

                </div>
                {(stepIndex < activeStep) && <div className="equal">=</div>}
            </>
        }
    </>;
}