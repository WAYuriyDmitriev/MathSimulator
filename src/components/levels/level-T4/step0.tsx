import React from 'react';
import { Expression } from '../../steps/expression/expression';
import { parseExpression } from '../../../parsers';
import { IStepProps } from './IStepProps';

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
    const stepData = {
        expression: '3 $frac(2, 9) + 4 $frac(3, 7)',
        messageTop: 'Переводим в неправильную дробь :',
    };
    return <>
        <div className="step">
            <div className="hint-slot hint-slot--up hint-slot--step0">
                {stepData.messageTop &&
                    <div className={`hint hint-up ${activeStep > stepIndex + 1 ? 'hint--inactive' : ''}`}>
                        {stepData.messageTop}
                    </div>}
            </div>
            <div className="step0-expression-wrapper">
                {activeStep <= stepIndex + 1 && <div className="step0-arrows-wrapper">
                    <div className="arrow-element arrow-element--one">
                        <div className="step0-arrow step0-arrow--one"></div>
                        <div className="step0-arrow-text step0-arrow-text--one">Числитель (Ч)</div>
                    </div>
                    <div className="arrow-element arrow-element--two">
                        <div className="step0-arrow step0-arrow--two"></div>
                        <div className="step0-arrow-text step0-arrow-text--two">Целое Число (ЦЧ)</div>
                    </div>
                    <div className="arrow-element arrow-element--three">
                        <div className="step0-arrow step0-arrow--three"></div>
                        <div className="step0-arrow-text step0-arrow-text--three">Знаменатель (З)</div>
                    </div>

                </div>}
                <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
                    onChangeCorrectStepState(stepIndex, isCorrect);
                    if (isCorrect == 'correct' && activeStep == stepIndex + 1) {
                        onCompleteStep(stepIndex);
                    }
                }} isPassive={true} />
            </div>


            <div className="hint-slot hint-slot--down">
            </div>
        </div>
        {(stepIndex < activeStep) && <div className="equal">=</div>}
    </>;
}