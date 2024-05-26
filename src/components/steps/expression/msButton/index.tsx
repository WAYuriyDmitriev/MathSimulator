import './index.scss';
import React, { ReactNode } from 'react';

export interface IMsButton {
    children: ReactNode;
    onClick: () => void;
    isGreen?: boolean;
    isRed?: boolean;
    className?: string;
}

export default function MsButton({ children, onClick, isGreen, isRed, className }: IMsButton) {
    return (
        <button
            tabIndex={-1}
            className={['ms-button', isGreen ? 'ms-button__success' : '', isRed ? 'ms-button__error' : '', className || ''].join(' ')}
            onClick={onClick}>{children}</button>
    );
}