import './index.scss';
import React, { useRef, useState } from 'react';
import { ExpressionField, ExpressionNumber } from '../../../../steps/expression/expression';

export interface IDivideProps {
    dividend?: number,
    divider?: number,
    onCompleteStep: (step: number) => void;
}

export default function Divide({ onCompleteStep }: IDivideProps) {
    const resultArray = useRef([false, false, false]);
    const firstStep = useRef([false, false]);
    const secondStep = useRef([false, false]);
    const step3 = useRef([false, false]);
    const step4 = useRef([false]);
    const step5 = useRef([false]);
    const [step, nextStep] = useState(0);
    const onchange = (index: number, isCorrect: string, array: Array<boolean>) => {
        array[index] = isCorrect == 'correct';
        if ([resultArray, secondStep, firstStep, step3, step4, step5].every((arr) => arr.current.every(Boolean))) {
            onCompleteStep(5);
        }

        if (firstStep.current.every(Boolean)) {
            nextStep(1);
        }
        if (secondStep.current.every(Boolean)) {
            nextStep(2);
        }

        if (step3.current.every(Boolean)) {
            nextStep(3);
        }
        if (step4.current.every(Boolean)) {
            nextStep(4);
        }
        if (step5.current.every(Boolean)) {
            nextStep(5);
        }
    };
    return (
        <div className="d-flex flex-column ms-5">
            <div className="d-flex">
                <div className="d-flex flex-column">
                    <div className="margin-field d-flex margin-field-tp">
                        <ExpressionNumber value={1} />
                        <ExpressionNumber value={4} />
                        <ExpressionNumber value={1} />
                        <ExpressionNumber value={9} />
                    </div>

                    <div className="margin-field d-flex margin-field-tp">
                        <ExpressionField answer={1}
                                         onChangeCorrectState={(state) => onchange(0, state, firstStep.current)} />
                        <ExpressionField answer={2}
                                         onChangeCorrectState={(state) => onchange(1, state, firstStep.current)} />
                    </div>

                    <div className="slash w-100"></div>
                </div>
                <div className="vertical-slash h-100" style={{ minWidth: '2px', background: 'black' }}></div>
                <div>
                    <div className="d-flex flex-column">
                        <div className="margin-field d-flex margin-field-tp">
                            <ExpressionNumber value={3} />
                        </div>
                        <div className="slash w-100" />
                        <div className="d-flex margin-field margin-field-tp">
                            <ExpressionField answer={4}
                                             onChangeCorrectState={(state) => onchange(0, state, resultArray.current)} />
                            <ExpressionField answer={7}
                                             onChangeCorrectState={(state) => onchange(1, state, resultArray.current)} />
                            <ExpressionField answer={3}
                                             onChangeCorrectState={(state) => onchange(2, state, resultArray.current)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column">
                <div className="d-flex margin-field margin-field-tp">
                    <div className="zero-box" />
                    <ExpressionField answer={2}
                                     onChangeCorrectState={(state) => onchange(0, state, secondStep.current)} />
                    <ExpressionField answer={1}
                                     onChangeCorrectState={(state) => onchange(1, state, secondStep.current)} />
                </div>

                <div className="d-flex margin-field margin-field-tp">
                    <div className="zero-box" />
                    <ExpressionField answer={2}
                                     onChangeCorrectState={(state) => onchange(0, state, step3.current)} />
                    <ExpressionField answer={1}
                                     onChangeCorrectState={(state) => onchange(1, state, step3.current)} />
                </div>

                <div className="slash " style={{ marginLeft: '70px', width: '210px' }} />

                <div className="d-flex margin-field margin-field-tp">
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <ExpressionField answer={9}
                                     onChangeCorrectState={(state) => onchange(0, state, step4.current)} />
                </div>
                <div className="d-flex margin-field margin-field-tp">
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <ExpressionField answer={9}
                                     onChangeCorrectState={(state) => onchange(0, state, step5.current)} />
                </div>

                <div className="slash " style={{ marginLeft: '210px', width: '70px' }} />

                <div className="d-flex margin-field margin-field-tp">
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <div className="zero-box" />
                    <ExpressionNumber value={0} />
                </div>


            </div>
        </div>
    );
}