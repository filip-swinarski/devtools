/* console_listen.js, v. 0.1.4, 31.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';
import {consoleInput} from './render_console.js';
import {renderConsoleMessage} from './render_console_message.js';
import {globalEval} from './global_eval.js';

let consoleListen = () => {

    window.addEventListener('error', (error) => {

        let row = document.createElement('div');
        let errorMessage = document.createElement('div');
        let errorMessageMsg = document.createElement('span');
        let errorSource = document.createElement('span');
        let errorLineNo = document.createElement('span');
        let errorColumnNo = document.createElement('span');
        let errorPrompt = document.createElement('span');

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

        let row = document.createElement('div');

        row.innerHTML = renderConsoleMessage(e.detail);
        row.classList.add('console__row');
        consoleDisplay.appendChild(row);
    }, false);

    consoleInput.addEventListener('keypress', (e) => {
    
        if (e.keyCode === 13) {

            // let value = window.eval(consoleInput.value); // window.eval to work only in global scope
            let value = globalEval(consoleInput.value);

            DTConsole.log(value, consoleInput.value);	
            consoleInput.value = '';
        }

    });

}

export {consoleListen};
