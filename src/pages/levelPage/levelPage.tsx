import React, { useState } from 'react';
import { LevelProgress } from '../../components/levelProgress/levelProgress';
import { StepProgress } from '../../components/stepProgress/stepProgress';
import { Link, useParams } from 'react-router-dom';
import { ErrorPopup, SuccessPopup } from '../../components/messagePopup/messagePopup';
import LevelT4 from '../../components/levels/level-T4/level-T4';
import './levelPage.css';

export function LevelPage() {
    const [stepCompleteCount, setStepCompleteCount] = useState(0);
    const [totalStepsCount, setTotalStepsCount] = useState(1);
    const [isActiveHint, setIsActiveHint] = useState(false);
    const [isCompleteLevel, setIsCompleteLevel] = useState(false);

    const { id } = useParams();
    const levels = [
        LevelT4,
    ];
    const CurrentLevel = levels[Number(id)];
    const currentLevelElement = CurrentLevel ? <CurrentLevel onCompleteStep={(step, totalSteps) => {
        setStepCompleteCount(step - 1);
        setTotalStepsCount(totalSteps);
    }} onCompleteLevel={() => {
        setIsCompleteLevel(true);
    }} onChangeCorrectStepState={(step, state) => {
        setIsActiveHint(state == 'incorrect');
    }}></CurrentLevel> : 'Уровень не найден';

    return (
        <>
            <div className="app__wrapper">
                <div className="status-bar">
                    <div className="status-bar__path-wrapper">
                        <div className="level-path">
                            <p className="level-path__item">
                                <Link to="/">Тренажер</Link> / Арифметические действия с обыкновенными дробями. </p>
                            <p className="level-path__item">Умножение.</p>
                        </div>
                    </div>
                    <div className="status-bar__progress progress">
                        <LevelProgress completeCount={0} totalCount={15} />
                        <StepProgress completeCount={stepCompleteCount} totalCount={totalStepsCount - 1} />
                        <button
                            className={`progress__button progress__button--hint ${isActiveHint ? 'progress__button--hint-active' : ''}`}>
                            <span>Подсказка</span>
                        </button>
                        <button
                            className={`progress__button progress__button--next-level ${isCompleteLevel ? '' : 'progress__button--inactive'}`}>
                            <span>Следующий пример</span>
                        </button>
                    </div>
                </div>
                <div className="game-field">
                    {currentLevelElement}
                    {isCompleteLevel && <SuccessPopup />}
                    {isActiveHint && <ErrorPopup />}
                </div>

            </div>
        </>
    );
}