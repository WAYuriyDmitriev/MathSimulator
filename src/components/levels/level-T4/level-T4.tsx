import React, { useState } from 'react';
import { DraftDivide, DraftMul, DraftSumm } from '../../steps/draft/draft';
import { DraftPopup } from '../../draftPopup/draftPopup';
import Step0 from './step0';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step5 from './step5';
import Step6 from './step6';
import '../level.scss';
import './level-T4.scss';
import { Crib } from '../../crib/crib';
import { ILevelProps } from '../models/ILevelProps';

export default function Level({ onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
    const [activeSubStep, setActiveSubStep] = useState(0);
    const steps = [Step0, Step1, Step2, Step3, Step5, Step6];

    const [activeStep, setActiveStep] = useState(1);
    const [isOpenDraft, setIsOpenDraft] = useState(false);
    return (
        <div className="level">
            <Crib />
            <div className="full-expression-wrapper">
                <div className="full-expression">
                    {
                        steps.map((Step, stepIndex) => {
                            return (
                                stepIndex <= activeStep &&
                                <Step key={stepIndex} stepIndex={stepIndex} activeStep={activeStep}
                                      onCompleteStep={(index) => {
                                          const nextStep = Math.max(index + 1, activeStep);
                                          setActiveSubStep(0);

                                          setActiveStep(last => Math.max(index + 1, last));
                                          onCompleteStep(nextStep, steps.length);
                                          if ([4, 5].includes(nextStep)) {
                                              setIsOpenDraft(true);
                                          }
                                          if (nextStep == steps.length) {
                                              onCompleteLevel();
                                          }
                                      }}
                                      onCompleteSubStep={(index, subStepIndex) => {
                                          if (subStepIndex == 2 && index == 3) {
                                              setIsOpenDraft(true);
                                          }
                                          setActiveSubStep(subStepIndex);
                                      }}
                                      onChangeCorrectStepState={(index, isCorrect) => {
                                          onChangeCorrectStepState(activeStep, isCorrect);
                                      }} />
                            );
                        })
                    }
                </div>
            </div>
            <button type="button" className="open-draft-button" onClick={() => {
                setIsOpenDraft(true);
            }} disabled={!((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2))}>Черновик
            </button>
            {<DraftPopup isOpen={isOpenDraft} onClose={() => {
                setIsOpenDraft(false);
            }}>
                {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[29, 7]} />}
                {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[31, 9]} />}
                {activeStep >= 4 && <DraftSumm inputValues={[203, 279]} />}
                {activeStep >= 5 && <DraftDivide didivend={482} divisor={63} />}
            </DraftPopup>}
        </div>
    );
};