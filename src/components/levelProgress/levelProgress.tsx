import React from 'react';
import './levelProgress.css';

interface ILevelProgressProps {
    completeCount: number,
    totalCount: number,
}

export function LevelProgress({ completeCount, totalCount }: ILevelProgressProps) {
    return (
        <div className="level-progress">
            <div className="level-progress__header">
                <div className="level-progress__solved">
                    Решено примеров
                </div>
                <div className="level-progress__complete">
                    <div className="level-progress__complete-count">{completeCount}</div>
                    <div>из</div>
                    <div className="level-progress__total-count">{totalCount}</div>
                </div>
            </div>
            <div className="level-progress__status">
                <div className="level-progress__bar">
                </div>
            </div>
        </div>
    );
}