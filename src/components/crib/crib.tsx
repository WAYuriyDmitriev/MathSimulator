import React from 'react';
import './crib.css';

export function Crib() {
    return (
        <div className="crib">
            <div className="crib__wrapper">
                <button className="crib__button" type="button">
                    <span className="crib__text">Шпаргалка</span></button>
            </div>
        </div>
    );
}