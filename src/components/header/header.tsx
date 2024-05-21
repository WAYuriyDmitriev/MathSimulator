import React from 'react';
import logo from '../../assets/icons/logo.svg';
import './header.css';

export function Header() {
    return (
        <header>
            <div className="header__wrapper">
                <div className="logo">
                    <img className="logo__image" src={logo} alt="" />
                    <p className="logo__text">Математический Тренажер</p>
                </div>
            </div>
        </header>
    );
}