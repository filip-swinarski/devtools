// render_console_output.js, v. 0.1.0, 06.04.2017 @ filip-swinarski

let renderConsoleOutput = (val, element = document.body) => {

    let output = document.createElement('span');
    let checkStr = Object.prototype.toString.call(val).split(' ')[1];
    let html = '';

    checkStr = checkStr.substring(0, checkStr.length-1).toLowerCase();
    output.classList.add(`console__${checkStr}`);

     if (checkStr === 'string' ||
        checkStr === 'number' ||
        checkStr === 'undefined' ||
        checkStr === 'null' ||
        checkStr === 'symbol' ||
        checkStr === 'boolean') {
        html += val;
        output.innerHTML += html;
    } else {
       
        for (let item in val) {
           
            let keyClass = checkStr === 'array' ? 'index' : 'key';
            let checkStr2 = Object.prototype.toString.call(val[item]).split(' ')[1];
           
            checkStr2 = checkStr2.substring(0, checkStr2.length-1).toLowerCase();

            if (checkStr2 === 'string' ||
                checkStr2 === 'number' ||
                checkStr2 === 'undefined' ||
                checkStr2 === 'null' ||
                checkStr2 === 'symbol' ||
                checkStr2 === 'boolean') {
                html += `<span class="console__${keyClass}">${item}</span>`;
                html += `<span class="console__value">${val[item]}</span>`;
            } else {
                renderConsoleOutput(val[item], output);
            }

        }
        output.innerHTML += html;
    }
    element.appendChild(output);
};

export {renderConsoleOutput};
