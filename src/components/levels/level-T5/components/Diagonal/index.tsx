import React, { useState } from 'react';
import './index.scss';

export function Diagonal({ name, answer, onChangeCorrectState, isIncorrect }: any) {
    const [isRed, setIsRed] = useState(false);
    const [isGreen, setIsGreen] = useState(false);

    function onDiagonalClick() {
        if (isIncorrect) {
            onChangeCorrectState?.(false);
            const newRed = !isRed;
            setIsRed(newRed);
            setIsGreen(false);
            if (newRed) {
                onChangeCorrectState?.('incorrect');
            }
        } else {
            setIsRed(false);
            setIsGreen(true);
            onChangeCorrectState?.('correct');
        }
    }

    return (
        <>
            <div
                className={`ms-diagonal ps-2 ps-3 ${isRed ? 'ms-diagonal__error' : ''} ${isGreen ? 'ms-diagonal__success' : ''}`}
                onClick={onDiagonalClick}>
                <div className="ms-diagonal-value"> {answer}</div>
            </div>
        </>
    );
}