import React from 'react';
import './stepProgress.css';

interface IStepProgressProps {
    completeCount: number,
    totalCount: number,
}

export function StepProgress({ completeCount, totalCount }: IStepProgressProps) {
    return (
        <div className="step-progress">
            <div className="step-progress__header">
                <div className="step-progress__solved">
                    Решено этапов в примере
                </div>
                <div className="step-progress__complete">
                    <div className="step-progress__complete-count">{completeCount}</div>
                    <div>из</div>
                    <div className="step-progress__total-count">{totalCount}</div>
                </div>
            </div>
        </div>
    );
}