import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import './expression.scss';
import './expressionPassive.scss';
import ExpressionDot from './expression-dot';
import LeftBrackets from './left-bracket';
import RightBracket from './right-bracket';
import { useIMask } from 'react-imask';

export interface IExpressionField {
    name?: string,
    answer: number,
    onChangeCorrectState?: (isCorrect: string) => void;
    isShowCrib?: boolean;
    cribLabel?: string;
    newValue?: number
}

export function ExpressionField({
                                    name,
                                    answer,
                                    onChangeCorrectState,
                                    isShowCrib,
                                    cribLabel,
                                    newValue,
                                }: IExpressionField) {
    const [isCorrect, setCorrect] = useState('empty');
    const [opts, setOpts] = useState({ mask: Number, max: 10000 });
    const [isActive, setIsActive] = useState(false);
    const {
        ref,
        maskRef,
        value,
        setValue,
        unmaskedValue,
        setUnmaskedValue,
        typedValue,
        setTypedValue,
    } = useIMask(opts /* optional {
     onAccept,
     onComplete,
     ref,
     defaultValue,
     defaultUnmaskedValue,
     defaultTypedValue,
     } */);

    useEffect(() => {
        let newIsCorrect = 'empty';
        if (value !== '' && answer === Number(value)) {
            newIsCorrect = 'correct';
        } else if (value !== '') {

        }
        if (isCorrect != newIsCorrect) {
            onChangeCorrectState?.(newIsCorrect);
            setCorrect(newIsCorrect);
        }
    }, [value, answer]);

    useEffect(() => {
        if (!!newValue) {
            setValue(newValue.toString());
        }
    }, [newValue]);

    return (
        <>
            <div className="expression-field-container" onFocus={() => setIsActive(true)}>
                {isShowCrib && !value && !isActive &&
                    <div className="expression-field-container__crib"
                         onClick={() => (ref.current as HTMLInputElement)?.focus()}>{cribLabel}</div>}
                <input
                    ref={ref as LegacyRef<HTMLInputElement>}
                    type="text"
                    onChange={(evt) => setValue(evt.target.value)}
                    className={`expression-field  ${{
                        'empty': '',
                        'correct': 'expression-field--correct',
                        'incorrect': 'expression-field--incorrect',
                    }[isCorrect]}`}
                    onBlur={() => {
                        setIsActive(false);
                        if (value !== '' && answer != Number(value) && isCorrect != 'incorrect') {
                            onChangeCorrectState?.('incorrect');
                            setCorrect('incorrect');
                        }
                    }} />
            </div>
        </>
    );
};

export function ExpressionFieldDiagonal({ name, answer, onChangeCorrectState }: IExpressionField) {
    const [value, setValue] = useState('');
    const [isCorrect, setCorrect] = useState('empty');
    const uuid = useMemo(() => {
        return '_' + Date.now() + name + Math.random();
    }, []);

    useEffect(() => {
        let newIsCorrect = 'empty';
        if (value != '' && answer === Number(value)) {
            newIsCorrect = 'correct';
        } else if (value != '') {

        }
        if (isCorrect != newIsCorrect) {
            onChangeCorrectState(newIsCorrect);
            setCorrect(newIsCorrect);
        }
    }, [value, answer]);

    return (
        <div className="expression-wrapper-diagonal">
            <label htmlFor={uuid} className={`expression-label-diagonal expression-field  ${{
                'empty': '',
                'correct': 'expression-field--correct',
                'incorrect': 'expression-field--incorrect',
            }[isCorrect]}`}>
                <input id={uuid} className="expression-field-diagonal" type="text"
                       onChange={(evt) => setValue(evt.target.value)}
                       onBlur={() => {
                           if (value !== '' && answer != Number(value) && isCorrect != 'incorrect') {
                               onChangeCorrectState('incorrect');
                               setCorrect('incorrect');
                           }
                       }} />
            </label>
        </div>
    );
}

interface IExpressionSign {
    sign: string;
}

export function ExpressionSign({ sign }: IExpressionSign) {
    const mapComponents = new Map([
        ['**', ExpressionDot],
        ['(', LeftBrackets],
        [')', RightBracket],
    ]);
    const SignComponent = mapComponents.get(sign);
    return (
        <div
            className={`expression-sign ${sign === '(' ? 'brackets--left' : sign === ')' ? 'brackets--right' : ''}`}
        >
            {SignComponent
                ? <SignComponent />
                : sign}
        </div>
    );
}

interface IExpressionNumber {
    value: number;
    withoutBorder?: boolean;
}

export function ExpressionNumber({ value, withoutBorder }: IExpressionNumber) {
    return (
        <div
            className={`expression-number ${withoutBorder && 'expression-number__without-border'}`}>{Number.isNaN(value) ? '' : value}</div>
    );
}

interface IExpressionFraction {
    numerator: Array<{ type: string, value: any }>,
    denominator: Array<{ type: string, value: any }>,
    onChangeCorrectState?: (isCorrect: string) => void
}

function ExpressionFraction({ numerator, denominator, onChangeCorrectState }: IExpressionFraction) {
    const [correctFields, setCorrectFields] = useState<Record<string, string>>({
        numerator: 'empty',
        denominator: 'empty',
    });
    const [isCorrect, setCorrect] = useState('empty');

    useEffect(() => {
        let newIsCorrect = 'empty';
        if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
            newIsCorrect = 'correct';
        } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
            newIsCorrect = 'incorrect';
        }

        if (isCorrect != newIsCorrect) {
            onChangeCorrectState?.(newIsCorrect);
            setCorrect(newIsCorrect);
        }
    }, [correctFields]);
    return (
        <div className="fraction">
            <div className="numerator"><Expression expression={numerator}
                                                   onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({
                                                       ...last,
                                                       numerator: isCorrect,
                                                   }))} /></div>
            <div className="slash"></div>
            <div className="denominator"><Expression expression={denominator}
                                                     onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({
                                                         ...last,
                                                         denominator: isCorrect,
                                                     }))} /></div>
        </div>
    );
}

interface IExpression {
    expression: Array<{ type: string, value: any }>,
    onChangeCorrectState?: (isCorrect: string) => void,
    isPassive?: boolean
}

export function Expression({ expression, onChangeCorrectState, isPassive }: IExpression) {
    // const expression = '((a * b + c) / 5) * ((d * e + f) / 6)';
    // const expression = 'a * b + c + 5 + d * e + f';
    // const parsedExpression = parseExpression(expression);
    const fields: Record<string, string> = {};
    const iterateExpression = (expression: Array<{ type: string, value: any }>) => {
        expression.forEach((it, index) => {
            if (it.type == 'field') {
                fields[it.value.name] = 'empty';
            } else if (it.type != 'number' && it.type != 'sign') {
                fields[index.toString()] = 'empty';
            }
        });
    };
    iterateExpression(expression);

    const [correctFields, setCorrectFields] = useState<Record<string, string>>(fields);
    const [isCorrect, setCorrect] = useState('empty');

    // const isCorrect: string = useMemo(() => {
    useEffect(() => {
        let newIsCorrect = 'empty';
        if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
            newIsCorrect = 'correct';
        } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
            newIsCorrect = 'incorrect';
        }

        if (isCorrect != newIsCorrect) {
            onChangeCorrectState?.(newIsCorrect);
            setCorrect(newIsCorrect);
        }
    }, [correctFields]);

    const hints = [
        {
            text: 'умножаем',
            fields: ['a', 'e'],
        },
    ];
    return (
        <div className={`expression-wrapper ${isPassive ? 'expression-passive' : ''}`}>
            {expression.map((it, index) => {
                if (it.type == 'number') {
                    return <ExpressionNumber key={index} value={Number(it.value)} />;
                } else if (it.type == 'sign') {
                    return <ExpressionSign key={index} sign={it.value} />;
                } else if (it.type == 'field') {
                    return <ExpressionField key={index} name={it.value.name} answer={it.value.answer}
                                            onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({
                                                ...last,
                                                [it.value.name]: isCorrect,
                                            }))} />;
                } else if (it.type == 'frac') {
                    return <ExpressionFraction key={index} numerator={it.value[0]} denominator={it.value[1]}
                                               onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({
                                                   ...last,
                                                   [index.toString()]: isCorrect,
                                               }))} />;
                } else {
                    throw new Error('Invalid expression!');
                }
            })}
        </div>
    );
}
