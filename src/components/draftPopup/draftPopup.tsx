import React, { ReactNode } from 'react';
import './draftPopup.css';
import './expression-draft.css';

interface IDraftPopupProps {
    isOpen: boolean,
    children?: ReactNode[] | ReactNode,
    onClose: () => void
}

export function DraftPopup({ isOpen, children, onClose }: IDraftPopupProps) {
    return (
        <>
            {isOpen && <div className="overlay"></div>}
            <div className={`draft-popup ${isOpen ? 'draft-popup--open' : ''}`}>
                <div className="draft-popup__wrapper">
                    {...Array.isArray(children) ? children : [children]}
                </div>
                <button type="button" className="draft-popup-close" onClick={onClose}></button>
            </div>
        </>
    );
}