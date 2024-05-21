import React from 'react';
import { ExpressionField, ExpressionNumber, ExpressionSign } from '../expression/expression';
import './draft.css';

interface IDraftSumm {
    inputValues: Array<number>;
}

export function DraftSumm({ inputValues }: IDraftSumm) {
    return (
        <div className="draft-summ">
            {inputValues.map((value, argumentIndex) => (
                    <React.Fragment key={argumentIndex}>
                        <div className="draft-summ__argument">
                            {value.toString().split('').map((it, index) => (
                                <ExpressionNumber key={index} value={Number(it)} />
                            ))}
                        </div>
                        {argumentIndex != inputValues.length - 1 &&
                            <div className="draft-summ__sign"><ExpressionSign sign={'+'} /></div>}
                    </React.Fragment>
                ),
            )}
            <div className="draft-summ__slash slash"></div>
            <div className="draft-summ__argument">
                {inputValues.reduce((acc, value) => acc + value, 0).toString().split('').map((it, index) => (
                    <ExpressionField key={index} name={index.toString()} answer={Number(it)}
                                     onChangeCorrectState={() => {
                                     }} />
                ))}
            </div>
        </div>
    );
}

interface IDraftEDivideProps {
    didivend: number,
    divisor: number
}

export function DraftDivide({ didivend, divisor }: IDraftEDivideProps) {
    return (
        <div className="draft-divide-wrapper">
            <div className="draft-operation draft-divide">
                {[didivend, Math.floor(didivend / divisor) * divisor].map((value, argumentIndex) => (
                        <React.Fragment key={argumentIndex}>
                            <div className="draft-operation__argument">
                                {value.toString().split('').map((it, index) => (
                                    <ExpressionNumber key={index} value={Number(it)} />
                                ))}
                            </div>
                            {argumentIndex != 1 &&
                                <div className="draft-operation__sign"><ExpressionSign sign={'-'} /></div>}
                        </React.Fragment>
                    ),
                )}
                <div className="draft-operation__slash slash"></div>
                <div className="draft-operation__argument">
                    {Math.floor(didivend % divisor).toString().split('').map((it, index) => (
                        <ExpressionField key={index} name={index.toString()} answer={Number(it)}
                                         onChangeCorrectState={() => {
                                         }} />
                    ))}
                </div>
            </div>
            <div className="vertical-slash"></div>
            <div className="draft-operation draft-divisor">
                <div className="draft-operation__argument">
                    {divisor.toString().split('').map((it, index) => (
                        <ExpressionNumber key={index} value={Number(it)} />
                    ))}
                </div>
                <div className="draft-operation__slash slash"></div>
                <div className="draft-operation__argument">
                    {Math.floor(didivend / divisor).toString().split('').map((it, index) => (
                        <ExpressionField key={index} name={index.toString()} answer={Number(it)}
                                         onChangeCorrectState={() => {
                                         }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface IDraftMul {
    inputValues: Array<number>;
}

export function DraftMul({ inputValues }: IDraftMul) {
    return (
        <div className="draft-summ">
            <div className="draft-summ-arguments">
                {inputValues.map((value, argumentIndex) => (
                        <React.Fragment key={argumentIndex}>
                            <div className="draft-summ__argument">
                                {value.toString().split('').map((it, index) => (
                                    <ExpressionNumber key={index} value={Number(it)} />
                                ))}
                            </div>
                            {argumentIndex != inputValues.length - 1 &&
                                <div className="draft-summ__sign"><ExpressionSign sign={'x'} /></div>}
                        </React.Fragment>
                    ),
                )}
                <div className="draft-summ__slash slash"></div>
            </div>
            <div className="draft-summ__argument">
                {inputValues.reduce((acc, value) => acc * value, 1).toString().split('').map((it, index) => (
                    <ExpressionField key={index} name={index.toString()} answer={Number(it)}
                                     onChangeCorrectState={() => {
                                     }} />
                ))}
            </div>
        </div>
    );
}
