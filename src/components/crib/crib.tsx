import React from 'react';
import './crib.css';

export interface ICribProps {
    onClick?: () => void;
}

export function Crib({ onClick }: ICribProps) {
    return (
        <div className="crib">
            <div className="crib__wrapper">
                <button className="crib__button" type="button" onClick={onClick}>
                    <span className="crib__text">Шпаргалка</span></button>
            </div>
        </div>
    );
}