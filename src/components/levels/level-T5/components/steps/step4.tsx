import React, { useRef, useState } from 'react';
import { IStepProps } from '../../../models/IStepProps';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../../../../steps/expression/expression';
import '../../../level.scss';
import Divide from '../Divide';

export default function Step4({
                                  stepIndex,
                                  activeStep,
                                  onCompleteStep,
                                  onChangeCorrectStepState,
                                  fractionModel,
                              }: IStepProps) {
    const arrayState = useRef([false, false]);
    const [subStep, setSubStep] = useState(0);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            //onCompleteStep(stepIndex);
            setSubStep(subStep + 1);
        }
    };

    const allDividendString = fractionModel.allDividend.toString();
    return <>
        <div className="d-flex" style={{ height: 'max-content' }}>
            <div className="step" style={{ paddingLeft: '100px' }}>
                <div className="expression-wrapper">
                    <div className="fraction">
                        <div className="dividend">
                            {
                                Array.from(allDividendString).map((digit, index) =>
                                    <>
                                        <ExpressionNumber
                                            value={Number(digit)} />
                                        {allDividendString.length - 1 !== index && <ExpressionSign sign="+" />}
                                    </>,
                                )
                            }
                        </div>
                        <div className="slash w-100" />
                        <div className="divider margin-field">
                            {
                                Array.from(fractionModel.divider.toString()).map((digit, index) =>
                                    <>
                                        <ExpressionNumber value={Number(digit)} />
                                        {index === 0 && <ExpressionSign sign="+" />}
                                    </>,
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="equal">=</div>
            <div className="step">
                <div className="expression-wrapper">
                    <div className="fraction">
                        <div className="dividend margin-field">
                            <ExpressionField
                                answer={1}
                                onChangeCorrectState={(state) => onchange(0, state)}
                            />
                            <ExpressionField
                                answer={5}
                                onChangeCorrectState={(state) => onchange(1, state)}
                            />
                        </div>
                        <div className="slash w-100" />
                        <div className="divider margin-field ">
                            <ExpressionNumber
                                value={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {subStep === 1 && <>
            <div className="orange-box ms-5 mt-4">
                Значит 1419 делится на 3<br />
                и 30 делится на 3

            </div>
            <div className="position-absolute end-0 bottom-0">
                <button type="button" className="btn btn-warning " onClick={() => {
                    setSubStep(subStep + 1);
                    onCompleteStep(3);
                }
                }>
                    Продолжить
                </button>
            </div>
        </>
        }
        {subStep === 2 && <Divide onCompleteStep={()=>onCompleteStep(4)} />
        }
    </>;
}