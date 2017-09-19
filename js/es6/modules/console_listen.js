/* console_listen.js, v. 0.1.5, 19.09.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';
import {consoleInput} from './render_console.js';
import {renderConsoleMessage} from './render_console_message.js';
import {globalEval} from './global_eval.js';

const consoleListen = () => {

    window.addEventListener('error', (error) => {

        const row = document.createElement('div');
        const errorMessage = document.createElement('div');
        const errorMessageMsg = document.createElement('span');
        const errorSource = document.createElement('span');
        const errorLineNo = document.createElement('span');
        const errorColumnNo = document.createElement('span');
        const errorPrompt = document.createElement('span');

        row.classList.add('console__row');
        errorPrompt.classList.add('console__err-prompt');
        errorMessage.classList.add('console__msg-r');
        errorMessage.classList.add('console__msg-r--err');
        errorMessageMsg.classList.add('console__err-msg');
        errorSource.classList.add('console__err-src');
        errorLineNo.classList.add('console__err-lineno');
        errorColumnNo.classList.add('console__err-columnno');

        errorMessageMsg.innerHTML += error.message;
        errorSource.innerHTML += error.filename;
        errorLineNo.innerHTML += error.lineno;
        errorColumnNo.innerHTML += error.columnno;

        errorMessage.appendChild(errorPrompt);
        errorMessage.appendChild(errorMessageMsg);
        errorMessage.appendChild(errorSource);
        errorMessage.appendChild(errorLineNo);
        errorMessage.appendChild(errorColumnNo);
        row.appendChild(errorMessage);
        consoleDisplay.appendChild(row);
    
    }, false);

    consoleDisplay.addEventListener('log', (e) => {

        const row = renderConsoleMessage(e.detail);

        row.classList.add('console__row');
        consoleDisplay.appendChild(row);
    }, false);

    consoleInput.addEventListener('keypress', (e) => {
    
        if (e.keyCode === 13) {

            let value = globalEval(consoleInput.value);

            DTConsole.log(value, consoleInput.value);	
            consoleInput.value = '';
        }

    });

}

export {consoleListen};
