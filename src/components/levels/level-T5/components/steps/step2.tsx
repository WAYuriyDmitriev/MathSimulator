import React, { useRef } from 'react';
import { IStepProps } from '../../../models/IStepProps';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../../../../steps/expression/expression';
import '../../../level.scss';

export default function Step2({
                                  stepIndex,
                                  activeStep,
                                  onCompleteStep,
                                  onChangeCorrectStepState,
                                  fractionModels,
                              }: IStepProps) {
    const [left, right] = fractionModels;
    const arrayState = useRef([false, false]);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            onCompleteStep(stepIndex);
        }
    };

    return <>
        <div className="step">
            <div className="expression-wrapper">
                {(activeStep === 2) &&
                    <div className="hint-slot hint-slot--up hint-slot--step3-top hit__top" style={{ top: '-34px' }}>
                        <div className={`hint hint-up`}>
                            Умножаем
                        </div>
                        <div className="hint-lines">
                            <div className="hint-line hint-line--top-left"></div>
                            <div className="hint-line hint-line--top-right"></div>
                        </div>
                    </div>
                }

                <div className="fraction">
                    <div className="dividend">
                        <ExpressionField

                            answer={left.allDividend}
                            onChangeCorrectState={(state) => onchange(0, state)}
                        />
                    </div>
                    <div className="slash w-100" />
                    <div className="divider">
                        <ExpressionNumber value={left.divider} />
                    </div>
                </div>

                <ExpressionSign sign="**" />

                <div className="fraction">
                    <div className="dividend">
                        <ExpressionField
                            answer={right.allDividend}
                            onChangeCorrectState={(state) => onchange(1, state)}
                        />
                    </div>
                    <div className="slash w-100" />
                    <div className="divider">
                        <ExpressionNumber value={right.divider} />
                    </div>
                </div>
                {(activeStep === 2) &&
                    <div className="hint-slot hint-slot--down hint-slot--step3-bottom" style={{ bottom: '-32px' }}>
                        <div
                            className={`hint hint-down `}>
                            Умножаем
                        </div>
                        <div className="hint-lines" style={{ bottom: '10px' }}>
                            <div className="hint-line hint-line--bottom-left"></div>
                            <div className="hint-line hint-line--bottom-right"></div>
                        </div>
                    </div>
                }
            </div>
        </div>


        <div className="equal">=</div>
    </>;
}