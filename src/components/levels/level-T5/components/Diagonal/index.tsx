import React, { useEffect, useMemo, useState } from 'react';

export function Diagonal({ name, answer, onChangeCorrectState }: any) {
    const [value, setValue] = useState('');
    const [isCorrect, setCorrect] = useState('empty');
    const uuid = useMemo(() => {
        return '_' + Date.now() + name + Math.random();
    }, []);

    useEffect(() => {
        let newIsCorrect = 'empty';
        if (value != '' && answer === value) {
            newIsCorrect = 'correct';
        } else if (value != '') {

        }
        if (isCorrect != newIsCorrect) {
            onChangeCorrectState?.(newIsCorrect);
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
                           if (value !== '' && answer !== value && isCorrect != 'incorrect') {
                               onChangeCorrectState?.('incorrect');
                               setCorrect('incorrect');
                           }
                       }} />
            </label>
        </div>
    );
}