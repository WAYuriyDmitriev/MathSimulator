import React, { useRef, useState } from 'react';
import { IStepProps } from '../../../models/IStepProps';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../../../../steps/expression/expression';
import '../../../level.scss';
import Divide from '../Divide';
import MsButton from '../../../../steps/expression/msButton';
import { ErrorPopup } from '../../../../messagePopup/messagePopup';

export default function Step4({
                                  stepIndex,
                                  activeStep,
                                  onCompleteStep,
                                  onChangeCorrectStepState,
                                  fractionModel,
                              }: IStepProps) {
    const arrayState = useRef([false, false]);
    const [buttonState, setButtonState] = useState([false, false]);
    const [subStep, setSubStep] = useState(0);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            //onCompleteStep(stepIndex);
            setSubStep(subStep + 1);
        }
    };

    function onButtonClick(index: number) {
        debugger
        if (index === 0) {
            buttonState[index] = true;
            buttonState[1] = false;
            setSubStep(2);
        } else {
            buttonState[index] = !buttonState[index];
        }

        setButtonState([...buttonState]);
    }

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
        {[1, 2].includes(subStep) && <>
            <div className="ms-5 mt-4 d-flex flex-column">
                <div className="d-flex">
                    <div className="orange-box ps-2 pe-2 fw-bold">
                        15 делится на 3?
                    </div>

                    <MsButton className="ms-4" onClick={() => onButtonClick(0)} isGreen={buttonState[0]}>Да</MsButton>
                    {subStep === 1 &&
                        <MsButton className="ms-2" onClick={() => onButtonClick(1)}
                                  isRed={buttonState[1]}>Нет</MsButton>}
                </div>
                <div className="ms-5 position-relative message-popup-step4">
                    {
                        buttonState[1] && <ErrorPopup />
                    }
                    {subStep === 2 && <>
                        <div className="orange-box ms-5 mt-4">
                            Значит 1419 делится на 3<br />
                            и 30 делится на 3

                        </div>
                    </>
                    }
                </div>
                {[2, 4].includes(subStep) && <div className="position-absolute end-0 bottom-0">
                    <button type="button" className="btn btn-warning " onClick={() => {
                        setSubStep(subStep + 1);
                        onCompleteStep(3);
                    }
                    }>
                        Продолжить
                    </button>
                </div>
                }
            </div>
        </>
        }
        {subStep >= 3 && <Divide onCompleteStep={() => {
            onCompleteStep(4);
            setSubStep(4);
        }} />
        }
    </>;
}