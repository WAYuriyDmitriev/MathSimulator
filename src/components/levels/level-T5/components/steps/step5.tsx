import React, { useRef, useState } from 'react';
import { ExpressionField } from '../../../../steps/expression/expression';
import { Diagonal } from '../Diagonal';
import { IStepProps } from '../../../models/IStepProps';

export default function Step5({ onChangeCorrectStepState, onCompleteStep }: IStepProps) {
    const arrayState = useRef([false, false, false, false]);
    const [isShowComma, setIsShowComma] = useState(true);
    const onchange = (index: number, isCorrect: string) => {
        arrayState.current[index] = isCorrect == 'correct';
        onChangeCorrectStepState?.(0, isCorrect);
        if (arrayState.current.every(Boolean)) {
            onCompleteStep(6);
            setIsShowComma(false);
        }
    };
    return (
        <div className="d-flex margin-field">
            <ExpressionField answer={4} onChangeCorrectState={(state) => onchange(0, state)} />
            {isShowComma && <Diagonal answer="12" />}
            <ExpressionField answer={7} onChangeCorrectState={(state) => onchange(1, state)} />
            <Diagonal answer="," onChangeCorrectState={(state: string) => onchange(2, state)} />
            <ExpressionField answer={3} onChangeCorrectState={(state) => onchange(3, state)} />

        </div>
    );
}