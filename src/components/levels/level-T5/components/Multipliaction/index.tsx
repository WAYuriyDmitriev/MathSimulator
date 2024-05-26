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
    const [activeState, setActiveState] = useState([
        [...Array.from(firstMulString).map(() => false)],
        [...Array.from(firstMulString).map(() => false)],
    ]);
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

    function onBlurAll() {
        activeState.forEach((states) => states.forEach((state, indexState) => {
            states[indexState] = false;
        }));
        setActiveState([...activeState]);
    }

    function onFocusField(numberResultStr: number, activeElement: number) {
        activeState[1][secondMulString.length - 1 - numberResultStr] = true;

        let activeElementNumber = Math.abs(activeElement - resultStrings[numberResultStr].length + 1);
        activeElementNumber = activeElementNumber > firstMulString.length - 1 ? firstMulString.length - 1 : activeElementNumber;
        activeState[0][secondMulString.length - 1 - activeElementNumber] = true;
        setActiveState([...activeState]);
    }

    return (
        <div className="multiplication-container">
            <div className="d-flex">
                {Array.from(firstMulString).map((digit, index) => <ExpressionNumber value={Number(digit)}
                                                                                    isActive={activeState[0][index]} />)}
            </div>
            <div className="multiplication-x">
                <ExpressionSign sign="x" />
            </div>
            <div className="d-flex">
                {Array.from(secondMulString).map((digit, index) => <ExpressionNumber value={Number(digit)}
                                                                                     isActive={activeState[1][index]} />)}
            </div>
            <div className="slash w-50" />
            <div className="d-flex">
                {
                    Array.from(resultStrings[0]).map((digit, index) => <ExpressionField
                        onBlur={onBlurAll}
                        onFocus={() => onFocusField(0, index)}
                        answer={Number(digit)}
                        onChangeCorrectState={(isCorrect) => onchange(0, index, isCorrect)} />)
                }
            </div>

            <div className="d-flex">
                {
                    Array.from(resultStrings[1]).map((digit, index) => <ExpressionField
                        onBlur={onBlurAll}
                        onFocus={() => onFocusField(1, index)}
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