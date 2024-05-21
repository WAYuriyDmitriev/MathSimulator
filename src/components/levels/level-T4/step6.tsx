import React from 'react';
import { Expression } from '../../steps/expression/expression';
import { parseExpression } from '../../../parsers';
import { IStepProps } from './IStepProps';

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
    const stepData = {
        expression: 'a@7 $frac(b@41, 63)',
        messageTop: 'Сократить и (или) выделить \n целую часть',
    };
    return <>
        <div className="step">
            <div className="hint-slot hint-slot--up hint-slot--step6">
                {stepData.messageTop &&
                    <div className={`hint hint-up ${activeStep > stepIndex ? 'hint--inactive' : ''}`}>
                        {stepData.messageTop}
                    </div>}
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
    </>;
}