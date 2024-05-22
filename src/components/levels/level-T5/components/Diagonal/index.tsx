import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import { useIMask } from 'react-imask';

export function Diagonal({ name, answer, onChangeCorrectState, isIncorrect: isIncorrect }: any) {
    const [isCorrect, setCorrect] = useState('empty');
    const uuid = useMemo(() => {
        return '_' + Date.now() + name + Math.random();
    }, []);
    const [opts, setOpts] = useState({ mask: answer });
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
        if (value != '' && answer === value) {
            newIsCorrect = isIncorrect ? 'incorrect' : 'correct';
        } else if (value != '') {

        }
        if (isCorrect != newIsCorrect) {
            onChangeCorrectState?.(newIsCorrect);
            setCorrect(newIsCorrect);
        }
    }, [value, answer]);

    return (
        <div className="expression-wrapper-diagonal" onClick={() => {
            const current = ref.current as HTMLInputElement;
            setValue(value === answer ? '' : answer);
            current.blur();
        }}>
            <label htmlFor={uuid} className={`expression-label-diagonal expression-field  ${{
                'empty': '',
                'correct': 'expression-field--correct',
                'incorrect': 'expression-field--incorrect',
            }[isCorrect]}`}>
                <input ref={ref as LegacyRef<HTMLInputElement>} id={uuid} className="expression-field-diagonal"
                       type="text"
                       onChange={(evt) => setValue(evt.target.value)}
                       onBlur={() => {
                           if (value !== '' && answer !== value && isCorrect != 'incorrect') {
                               onChangeCorrectState?.('incorrect');
                               setCorrect('incorrect');
                           }
                       }} />
            </label>
        </div>
    );
}