import React, { useRef, useState } from 'react';

import './index.scss';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../../../../steps/expression/expression';

export interface IMultiplicationProps {
    firstMul: number;
    secondMul: number;
    onComplete?: () => void;
}

export default function Multiplication({ firstMul, secondMul, onComplete }: IMultiplicationProps) {
    const firstMulString = firstMul.toString();
    const secondMulString = secondMul.toString();

    const resultStrings: Array<string> = Array.from(secondMulString).reverse().map((digit) => (firstMul * Number(digit)).toString());
    resultStrings.push((firstMul * secondMul).toString());
    const allStep = useRef(
        Array.from(Array(resultStrings.length))
            .map((_, index) => Array.from(Array(resultStrings[index].length)).map(() => false)),
    );
    const [currentStep, setCurrentStep] = useState(0);

    const onchange = (numberDigit: number, index: number, isCorrect: string) => {
        const currentStateArray = allStep.current[numberDigit];
        currentStateArray[index] = isCorrect == 'correct';
        if (currentStateArray.every(Boolean)) {
            setCurrentStep(currentStep + 1);
        }

        if (allStep.current.every((states) => states.every(Boolean))) {
            onComplete?.();
        }
    };

    return (
        <div className="multiplication-container">
            <div className="d-flex">
                {Array.from(firstMulString).map((digit) => <ExpressionNumber value={Number(digit)} />)}
            </div>
            <div className="multiplication-x">
                <ExpressionSign sign="x" />
            </div>
            <div className="d-flex">
                {Array.from(secondMulString).map((digit) => <ExpressionNumber value={Number(digit)} />)}
            </div>
            <div className="slash w-50" />
            <div className="d-flex">
                {
                    Array.from(resultStrings[0]).map((digit, index) => <ExpressionField
                        answer={Number(digit)}
                        onChangeCorrectState={(isCorrect) => onchange(0, index, isCorrect)} />)
                }
            </div>

            <div className="d-flex">
                {
                    Array.from(resultStrings[1]).map((digit, index) => <ExpressionField
                        answer={Number(digit)}
                        onChangeCorrectState={(isCorrect) => onchange(1, index, isCorrect)} />)
                }
                <div style={{ width: '70px' }} />
            </div>
            <div className="multiplication-plus">
                <ExpressionSign sign="+" />
            </div>
            <div className="slash w-100" />
            <div className="d-flex">
                {
                    Array.from(resultStrings[2]).map((digit, index) => <ExpressionField
                        answer={Number(digit)}
                        onChangeCorrectState={(isCorrect) => onchange(2, index, isCorrect)} />)
                }
            </div>
        </div>
    );
}