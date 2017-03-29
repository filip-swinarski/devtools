/* console_listen.js, v. 0.1.2, 29.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';
import {consoleInput} from './render_console.js';

let consoleListen = () => {

    window.addEventListener('error', (error) => {

        let row = document.createElement('div');
        let errorMessage = document.createElement('span');
        let errorSource = document.createElement('span');
        let errorLineNo = document.createElement('span');
        let errorColumnNo = document.createElement('span');

        row.classList.add('console__row');
        errorMessage.classList.add('console__message');
        errorSource.classList.add('console__source');
        errorLineNo.classList.add('console__lineno');
        errorColumnNo.classList.add('console__columnno');

        errorMessage.innerHTML += error.message;
        errorSource.innerHTML += error.filename;
        errorLineNo.innerHTML += error.lineno;
        errorColumnNo.innerHTML += error.columnno;

        row.appendChild(errorMessage);
        row.appendChild(errorSource);
        row.appendChild(errorLineNo);
        row.appendChild(errorColumnNo);
        consoleDisplay.appendChild(row);
    
    }, false);

    consoleDisplay.addEventListener('log', (e) => {

        let row = document.createElement('div');
        let logMessage = document.createElement('span');

        logMessage.innerHTML += e.detail[0];

        row.classList.add('console__row');
        logMessage.classList.add('console__message');

        row.appendChild(logMessage);
        consoleDisplay.appendChild(row);

    }, false);

    consoleInput.addEventListener('keypress', (e) => {
    
        let log = val => [val, 'log'];
        let dir = val => [val, 'dir'];
        let error = val => [new Error(val), 'err'];

        if (e.keyCode === 13) {

            let value;

            if (consoleInput.value.startsWith('log(') ||
                consoleInput.value.startsWith('dir(') ||
                consoleInput.value.startsWith('error(')) {
                value = eval(consoleInput.value);
            } else {
                value = log(consoleInput.value);
            }

            DTConsole.log(value[0], value[1]);	
            consoleInput.value = '';
        }

    });

}

export {consoleListen};
