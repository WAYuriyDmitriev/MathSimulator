function parseFunc(funcExpression: string) {
    let funcName = '';
    let funcProps: Array<string> = [];
    funcName = funcExpression.slice(funcExpression.indexOf('$') + 1, funcExpression.indexOf('('));
    const funcPropsString = funcExpression.trim().slice(funcExpression.indexOf('(') + 1, -1);

    let funcIncludesCount = 0;
    let buffer = '';

    funcPropsString.split('').forEach(it => {
        if (it == '$') {
            funcIncludesCount++;
            buffer += it;
        } else if (it == ')') {
            funcIncludesCount--;
            buffer += it;
        } else if (funcIncludesCount == 0 && it == ',') {
            funcProps.push(buffer.trim());
            buffer = '';
        } else {
            buffer += it;
        }
    });
    funcProps.push(buffer.trim());
    return {
        name: funcName,
        arguments: funcProps.map(it => parseExpression(it)),
    };
}

export function parseExpression(expression: string) {
    let currentLine: string = '';
    let currentType: string = '';
    let funcIncludesCount = 0;
    const result: Array<{ type: string, value: any }> = [];

    expression.split('').forEach(it => {

        if (currentType == 'func' && !(/^[$]$/.test(it))) {
            currentLine += it;
            if (/^[)]$/.test(it)) {
                if (funcIncludesCount == 1) {
                    currentType = '';
                    const funcRecord = parseFunc(currentLine);
                    result.push({ type: funcRecord.name, value: funcRecord.arguments });
                    currentLine = '';
                } else {

                }
                funcIncludesCount--;
            }
        } else if (/^-?[0-9_]*$/.test(it)) {
            if (currentType == '') {
                currentType = 'number';
            } else if (currentType == 'number') {

            } else if (currentType == 'field') {

            } else {
                currentType = 'number';
                result.push({ type: 'number', value: currentLine.trim() });
                currentLine = '';
            }

            currentLine += it;

        } else if (/^[-+*/]$/.test(it)) {
            if (currentType == '') {

            } else if (currentType == 'sign') {

            } else {
                result.push(({ type: 'sign', value: currentLine.trim() }));
                currentLine = '';
            }
            currentType = 'sign';
            currentLine += it;

        } else if (/^[a-zA-Z@]*$/.test(it)) {
            if (currentType == '') {

            } else if (currentType == 'field') {

            } else {
                result.push(({ type: 'field', value: currentLine.trim() }));
                currentLine = '';
            }
            currentType = 'field';
            currentLine += it;

        } else if (/^[$]$/.test(it)) {
            currentType = 'func';
            currentLine += it;
            funcIncludesCount++;

        } else {
            if (currentLine) {
                if (currentType == 'field') {
                    const [name, answer] = currentLine.trim().split('@');
                    result.push(({ type: currentType, value: { name, answer: Number(answer) } }));
                } else {
                    result.push(({ type: currentType, value: currentLine.trim() }));
                }

            }
            currentType = '';
            currentLine = '';
        }
    });
    if (currentLine) {
        if (currentType == 'field') {
            const [name, answer] = currentLine.trim().split('@');
            result.push(({ type: currentType, value: { name, answer: Number(answer) } }));
        } else {
            result.push(({ type: currentType, value: currentLine.trim() }));
        }
    }
    return result;
}