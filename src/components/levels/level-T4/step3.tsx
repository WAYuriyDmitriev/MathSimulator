import React, { useEffect, useState } from 'react';
import { Expression, ExpressionFieldDiagonal } from '../../steps/expression/expression';
import { parseExpression } from '../../../parsers';
import { IStepProps } from './IStepProps';

export default function Step({
                                 stepIndex,
                                 activeStep,
                                 onCompleteStep,
                                 onChangeCorrectStepState,
                                 onCompleteSubStep,
                             }: IStepProps) {
    const [correctFields, setCorrectFields] = useState<Record<string, string>>({
        diagonal1: 'empty',
        diagonal2: 'empty',
        subStep1: 'empty',
        subStep2: 'empty',
    });
    const [isCorrect, setCorrect] = useState('empty');
    const [subStep, setSubStep] = useState(0);

    useEffect(() => {
        let newIsCorrect = 'empty';
        if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
            newIsCorrect = 'correct';
        } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
            newIsCorrect = 'incorrect';
        }
        if (correctFields.subStep1 == 'correct') {
            const nextSubStep = Math.max(subStep, 1);
            if (nextSubStep != subStep) {
                setSubStep(nextSubStep);
                onCompleteSubStep(stepIndex, nextSubStep);
            }
        }

        if (correctFields.diagonal1 == 'correct' && correctFields.diagonal2 == 'correct' && correctFields.subStep1 == 'correct') {
            const nextSubStep = Math.max(subStep, 2);
            if (nextSubStep != subStep) {
                setSubStep(nextSubStep);
                onCompleteSubStep(stepIndex, nextSubStep);
            }
        }
        if (isCorrect != newIsCorrect) {
            onChangeCorrectStepState?.(stepIndex, newIsCorrect);
            setCorrect(newIsCorrect);
            if (newIsCorrect == 'correct' && activeStep == stepIndex) {
                onCompleteStep(stepIndex);
            }
        }
    }, [correctFields]);

    const stepData1 = {
        expression: '$frac(29, 9) + $frac(31, 7)',
        messageTop: 'Делаем диагональное умножение \n знаменателя на числитель',
        messageBottom: 'Умножаем',
    };
    const stepData2 = {
        expression: '$frac(_, a@63) + $frac(_, b@63)',
    };
    const stepData3 = {
        expression: '$frac(a@203, 63) + $frac(b@279, 63)',
        messageTop: 'Складываем',
    };

    return <>
        <div className="step">
            <div className="hint-slot hint-slot--up hint-slot--step3-top">
                {subStep > 0 && stepData1.messageTop &&
                    <div className={`hint hint-up ${(activeStep > stepIndex || subStep > 2) ? 'hint--inactive' : ''}`}>
                        {stepData1.messageTop}
                    </div>}
                {subStep > 0 && stepData1.messageTop && <div className="hint-lines">
                    <div className="hint-line hint-line--top-left"></div>
                    <div className="hint-line hint-line--top-right"></div>
                </div>}
            </div>

            <div className="step3-expression-wrapper">
                {subStep > 0 && <div className="arrows-diagonal">
                    <div className="arrow-diagonal arrow-diagonal--left"></div>
                    <div className="arrow-diagonal arrow-diagonal--right"></div>
                </div>}
                {subStep > 0 && <div className="step3-diagonal-fields">
                    <ExpressionFieldDiagonal name={'diagonal1'} answer={7} onChangeCorrectState={(isCorrect) => {
                        setCorrectFields(last => ({ ...last, diagonal1: isCorrect }));
                    }} />
                    <ExpressionFieldDiagonal name={'diagonal2'} answer={9} onChangeCorrectState={(isCorrect) => {
                        setCorrectFields(last => ({ ...last, diagonal2: isCorrect }));
                    }} />
                </div>}
                <Expression expression={parseExpression(stepData1.expression)} onChangeCorrectState={(isCorrect) => {
                }} isPassive={false} />
            </div>
            <div className="hint-slot hint-slot--down hint-slot--step3-bottom">
                {stepData1.messageBottom && <div
                    className={`hint hint-down ${(activeStep > stepIndex || subStep > 0) ? 'hint--inactive' : ''}`}>
                    {stepData1.messageBottom}
                </div>}
                {stepData1.messageBottom && <div className="hint-lines">
                    <div className="hint-line hint-line--bottom-left"></div>
                    <div className="hint-line hint-line--bottom-right"></div>
                </div>}
            </div>

        </div>
        <div className="equal">=</div>

        {subStep < 2 && <div className="step">
            <div className="hint-slot hint-slot--up">
            </div>

            <div className="step3-expression-wrapper">
                <Expression expression={parseExpression(stepData2.expression)} onChangeCorrectState={(isCorrect) => {
                    setCorrectFields(last => ({ ...last, subStep1: isCorrect }));
                }} isPassive={false} />
            </div>
            <div className="hint-slot hint-slot--down">
            </div>
        </div>
        }

        {subStep == 2 &&
            <>
                <div className="step">
                    <div className="hint-slot hint-slot--up">
                        {stepData3.messageTop && activeStep >= stepIndex + 1 &&
                            <div className={`hint hint-up ${activeStep > stepIndex + 1 ? 'hint--inactive' : ''}`}>
                                {stepData3.messageTop}
                            </div>}
                        {stepData3.messageTop && activeStep >= stepIndex + 1 && <div className="hint-lines">
                            <div className="hint-line hint-line--top-left"></div>
                            <div className="hint-line hint-line--top-right"></div>
                        </div>}
                    </div>
                    <div className="step3-expression-wrapper">
                        <Expression expression={parseExpression(stepData3.expression)}
                                    onChangeCorrectState={(isCorrect) => {
                                        setCorrectFields(last => ({ ...last, subStep2: isCorrect }));
                                    }} isPassive={false} />
                    </div>
                    <div className="hint-slot hint-slot--down">
                    </div>
                </div>
                {(stepIndex < activeStep) && <div className="equal">=</div>}
            </>
        }
    </>;
}