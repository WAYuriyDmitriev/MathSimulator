import React from 'react';
import { Link } from 'react-router-dom';
import './navigatePage.css';

export function NavigatePage() {
    return (
        <div className="app__wrapper">
            <div className="status-bar">
                <div className="status-bar__path-wrapper">
                    <div className="level-path">
                        <p className="level-path__item">
                            <Link to="/">ТРЕНАЖЕРЫ</Link> / К КУРСУ ПОДГОТОВКИ К ОГЭ «КОТАНГЕНС»</p>
                    </div>
                </div>

            </div>
            <div className="game-field">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link className="nav-link" to="/level/T4"><span>Т4</span> Арифметические действия с обыкновенными
                            дробями. Сложение</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/level/T5"><span>T5</span> Арифметические действия с обыкновенными
                            дробями. Умножение</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/level/2"><span>Т6</span> Арифметические действия с десятичными
                            дробями. Умножение. Деление</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}