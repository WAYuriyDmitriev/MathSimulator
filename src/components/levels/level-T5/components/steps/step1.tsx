import React, { useRef } from 'react';
import { IStepProps } from '../../../models/IStepProps';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../../../../steps/expression/expression';
import '../../../level.scss';

export default function Step1({
                                  stepIndex,
                                  activeStep,
                                  onCompleteStep,
                                  onChangeCorrectStepState,
                                  fractionModels,
                                  isShowCrib,
                              }: IStepProps) {
    const [left, right] = fractionModels;
    const arrayState = useRef([false, false, false, false, false, false]);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            onCompleteStep(stepIndex);
        }
    };

    return <>
        <div className="step">
            <div className="hint-slot hint-slot--up">
            </div>

            <div className="expression-wrapper">
                <div className="fraction">
                    <div className="dividend">
                        <ExpressionSign sign="(" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="ЦЧ" answer={left.whole}
                                         onChangeCorrectState={(state) => onchange(0, state)} />
                        <ExpressionSign sign="*" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="З" answer={left.divider}
                                         onChangeCorrectState={(state) => onchange(1, state)} />
                        <ExpressionSign sign=")" />
                        <ExpressionSign sign="+" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="Ч" answer={left.dividend}
                                         onChangeCorrectState={(state) => onchange(2, state)} />
                    </div>
                    <div className="slash w-100" />
                    <div className="divider">
                        <ExpressionNumber value={left.divider} />
                    </div>
                </div>

                <ExpressionSign sign="**" />

                <div className="fraction">
                    <div className="dividend">
                        <ExpressionSign sign="(" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="ЦЧ" answer={right.whole}
                                         onChangeCorrectState={(state) => onchange(3, state)} />
                        <ExpressionSign sign="*" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="З" answer={right.divider}
                                         onChangeCorrectState={(state) => onchange(4, state)} />
                        <ExpressionSign sign=")" />
                        <ExpressionSign sign="+" />
                        <ExpressionField isShowCrib={isShowCrib} cribLabel="Ч" answer={right.dividend}
                                         onChangeCorrectState={(state) => onchange(5, state)} />
                    </div>
                    <div className="slash w-100" />
                    <div className="divider">
                        <ExpressionNumber value={right.divider} />
                    </div>
                </div>
            </div>
        </div>
        {(stepIndex < activeStep) && <div className="equal">=</div>}
    </>;
}