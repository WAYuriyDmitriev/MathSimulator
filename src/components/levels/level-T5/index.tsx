import React, { useState } from 'react';
import { DraftPopup } from '../../draftPopup/draftPopup';
import Step0 from './components/steps/step0';
import Step1 from './components/steps/step1';
import Step2 from './components/steps/step2';
import Step3 from './components/steps/step3';
import Step4 from './components/steps/step4';
import Step5 from './components/steps/step5';
import '../level.scss';
import '../level-T4/level-T4.css';
import { Crib } from '../../crib/crib';
import { ILevelProps } from '../models/ILevelProps';
import { IFractionModel } from '../models/IFractionModel';
import Multiplication from './components/Multipliaction';

import './index.scss';
import MultiplicationTable from './components/MultiplicationTable';

export default function LevelT5({
                                    onCompleteStep,
                                    onCompleteLevel,
                                    onChangeCorrectStepState,
                                }: ILevelProps) {
    const [isShowCrib, setIsShowCrib] = useState(true);
    const [activeSubStep, setActiveSubStep] = useState(0);

    const [activeStep, setActiveStep] = useState(0);
    const [isOpenDraft, setIsOpenDraft] = useState(false);

    const [multiplicationValue, setMultiplicationValue] = useState<undefined | number>();
    const [divisionValue, setDivisionValue] = useState<undefined | number>();

    const fractionModels: Array<IFractionModel> = [
        {
            whole: 6,
            divider: 5,
            dividend: 3,
        },
        {
            whole: 7,
            divider: 6,
            dividend: 1,
        },
    ].map((fraction: IFractionModel) => ({
        ...fraction,
        allDividend: fraction.whole * fraction.divider + fraction.dividend,
    }));

    const [firstFraction, secondFraction] = fractionModels;
    const resultFractionDividend = (firstFraction.allDividend * secondFraction.allDividend) / (firstFraction.divider * secondFraction.divider);
    const resultFraction: IFractionModel = {
        whole: Math.trunc(resultFractionDividend),
        divider: firstFraction.divider * secondFraction.divider,
        allDividend: firstFraction.allDividend * secondFraction.allDividend,
        dividend: Number(resultFractionDividend.toString().split('.')[1]),
    };

    function getOnCompleteStep(index: number) {
        const nextStep = Math.max(index + 1, activeStep);
        setActiveSubStep(0);

        setActiveStep(last => Math.max(index + 1, last));
        onCompleteStep(nextStep, 10);
        if ([2, 3, 4].includes(nextStep)) {
            setTimeout(() => setIsOpenDraft(true), 1000);
        }
        if (nextStep == 10) {
            onCompleteLevel();
        }
    }

    function getOnCompleteSubStep(index: number, subStepIndex: number) {
        if (subStepIndex == 2 && index == 3) {
            setIsOpenDraft(true);
        }
        setActiveSubStep(subStepIndex);
    }

    function getOnChangeCorrectStepState(index: number, isCorrect: string) {
        onChangeCorrectStepState(activeStep, isCorrect);
    }

    return (
        <div className="level">
            {
                activeStep === 3 && <div className="shadow-box d-flex flex-column text-center">
                    <div className="color-yellow pb-2">Признак делимости</div>
                    <div className="text-start">
                        <div><span className="color-yellow">на 2 :</span> оканчивается 0 ; четное</div>
                        <div><span className="color-yellow">на 3 :</span> оканчивается 0 ; 5</div>
                        <div><span className="color-yellow">на 5 :</span> сумма цифр <span
                            className="color-yellow">делим</span> на 3
                        </div>
                        <div><span className="color-yellow">на 9 :</span> сумма цифр <span
                            className="color-yellow">делим</span> на 3
                        </div>
                        <div><span className="color-yellow">на 10 :</span> оканчивается 0</div>
                    </div>

                </div>
            }
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <Crib onClick={() => setIsShowCrib(!isShowCrib)} />
                    <MultiplicationTable />
                </div>
                <div className="d-flex align-self-start align-items-center">
                    <div className="hint-slot position-relative start-0 justify-content-start pt-3 h-auto">
                        <div className={`hint ${activeStep > 1 ? 'hint--inactive' : ''}`}
                             style={{ width: 'max-content' }}>
                            Переводим в неправильную дробь:
                        </div>
                    </div>
                    {activeStep >= 3 &&
                        <div
                            className="hint-slot position-relative start-0 justify-content-start pt-3 text-center ps-3"
                            style={{ minWidth: '310px' }}
                        >
                            <div className={`hint ${activeStep > 5 ? 'hint--inactive' : ''}`}>
                                Проверяем признаки делимости.<br />
                                Делим.
                            </div>
                        </div>
                    }
                    {activeStep >= 6 &&
                        <div
                            className="hint-slot position-relative start-0 justify-content-start pt-3 text-center ps-3">
                            <div className={`hint ps-4 pe-4`}>
                                Запиши ответ,<br />
                                в виде десятичной дроби
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="full-expression-wrapper h-100">
                <div className="full-expression h-auto">
                    <Step0 activeStep={0} isShowCrib={isShowCrib} fractionModels={fractionModels} />
                    {[0, 1, 2].includes(activeStep) && <Step1
                        fractionModels={fractionModels}
                        stepIndex={0}
                        activeStep={activeStep}
                        isShowCrib={isShowCrib}
                        onCompleteStep={() => getOnCompleteStep(0)}
                        onCompleteSubStep={() => getOnCompleteSubStep}
                        onChangeCorrectStepState={getOnChangeCorrectStepState}
                    />}
                    {
                        [1, 2, 3, 4, 5, 6, 7].includes(activeStep) &&
                        <Step2
                            fractionModels={fractionModels}
                            stepIndex={1}
                            activeStep={activeStep}
                            isShowCrib={isShowCrib}
                            onCompleteStep={() => getOnCompleteStep(1)}
                            onCompleteSubStep={getOnCompleteSubStep}
                            onChangeCorrectStepState={getOnChangeCorrectStepState}
                        />
                    }
                    {
                        [2, 3, 4, 5, 6, 7].includes(activeStep) &&
                        <Step3
                            dividendValue={multiplicationValue}
                            fractionModel={resultFraction}
                            stepIndex={2}
                            isShowEqual={activeStep >= 5}
                            activeStep={activeStep}
                            isShowCrib={isShowCrib}
                            onCompleteStep={() => getOnCompleteStep(2)}
                            onCompleteSubStep={getOnCompleteSubStep}
                            onChangeCorrectStepState={getOnChangeCorrectStepState}
                        />
                    }
                    {
                        [5, 6, 7].includes(activeStep) &&
                        <Step3
                            dividendValue={divisionValue}
                            fractionModel={{ divider: 10, allDividend: 473, whole: 47, dividend: 3 }}
                            stepIndex={4}
                            activeStep={activeStep}
                            isShowCrib={isShowCrib}
                            onCompleteStep={() => getOnCompleteStep(5)}
                            onCompleteSubStep={getOnCompleteSubStep}
                            onChangeCorrectStepState={getOnChangeCorrectStepState}
                            isShowEqual={activeStep >= 6}
                        />
                    }
                    {
                        activeStep >= 6 &&
                        <div className="position-relative">
                            <Step5 onCompleteStep={() => {
                                onCompleteLevel();
                                getOnCompleteStep(6);
                            }}
                                   onChangeCorrectStepState={onChangeCorrectStepState} />
                            {activeStep == 6 &&
                                <div className="orange-box ms-5 mt-5 position-absolute start-0 bottom-0 w-100 p-2">
                                    <div className="fw-bold">Поставь запятую</div>
                                    <div>
                                        Сколько нулей в знаменателе ,<br />
                                        столько и знаков после запятой
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                {[2, 3, 4, 5].includes(activeStep) && <DraftPopup isOpen={isOpenDraft} onClose={() => {
                    setIsOpenDraft(false);
                }}>
                    <div className="drawer-button">
                        <button type="button" className="open-draft-button" onClick={() => {
                            setIsOpenDraft(true);
                        }} disabled={[0].includes(activeStep)}>Черновик
                        </button>
                    </div>
                    {activeStep === 2 &&
                        <Multiplication firstMul={firstFraction.allDividend} secondMul={secondFraction.allDividend}
                                        onComplete={() => setMultiplicationValue(resultFraction.allDividend)} />}

                    {[3, 4, 5].includes(activeStep) &&
                        <>
                            <Step4
                                fractionModel={resultFraction}
                                stepIndex={4}
                                activeStep={activeStep}
                                isShowCrib={isShowCrib}
                                onCompleteStep={(index) => {
                                    getOnCompleteStep(index);
                                    setDivisionValue(473);
                                }}
                                onCompleteSubStep={getOnCompleteSubStep}
                                onChangeCorrectStepState={getOnChangeCorrectStepState}
                            />

                        </>
                    }
                </DraftPopup>}
            </div>
            {[2, 3, 4, 5].includes(activeStep) &&
                <button type="button" className="open-draft-button" onClick={() => {
                    setIsOpenDraft(true);
                }} disabled={[0].includes(activeStep)}>Черновик
                </button>
            }
        </div>
    );
};