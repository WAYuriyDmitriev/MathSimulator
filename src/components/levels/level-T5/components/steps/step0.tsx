import React from 'react';
import { Expression } from '../../../../steps/expression/expression';
import { parseExpression } from '../../../../../parsers';
import { IStepProps } from '../../../models/IStepProps';

export default function Step0({
                                 stepIndex,
                                 activeStep,
                                 onCompleteStep,
                                 onChangeCorrectStepState,
                                 isShowCrib,
                                 fractionModels,
                             }: IStepProps) {
    const [left, right] = fractionModels;
    const expression = `${left.whole} $frac(${left.dividend}, ${left.divider}) ** ${right.whole} $frac(${right.dividend}, ${right.divider})`;
    return <>
        <div className="step">
            <div className="step0-expression-wrapper">
                {activeStep === 0 && isShowCrib && <div className="step0-arrows-wrapper">
                    <div className="arrow-element arrow-element--one">
                        <div className="step0-arrow step0-arrow--one"></div>
                        <div className="step0-arrow-text step0-arrow-text--one">Числитель (Ч)</div>
                    </div>
                    <div className="arrow-element arrow-element--two">
                        <div className="step0-arrow step0-arrow--two"></div>
                        <div className="step0-arrow-text step0-arrow-text--two">Целое Число (ЦЧ)</div>
                    </div>
                    <div className="arrow-element arrow-element--three">
                        <div className="step0-arrow--three"></div>
                        <div className="step0-arrow-text step0-arrow-text--three">Знаменатель (З)</div>
                    </div>

                </div>}
                <Expression expression={parseExpression(expression)} onChangeCorrectState={(isCorrect) => {
                    onChangeCorrectStepState?.(stepIndex, isCorrect);
                    if (isCorrect == 'correct' && activeStep == stepIndex + 1) {
                        onCompleteStep(stepIndex);
                    }
                }} isPassive={true} />
            </div>


            <div className="hint-slot hint-slot--down">
            </div>
        </div>
        <div className="equal">=</div>
    </>;
}