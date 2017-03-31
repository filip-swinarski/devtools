/* render_console.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

import {consoleListen} from './console_listen';

const consoleDisplay = document.createElement('div');
const consoleInput = document.createElement('input');
const consoleContainer = document.createElement('div');
const consoleInputPrompt = document.createElement('span');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.id = 'console_input';
consoleInput.type = 'text';
consoleInputPrompt.classList.add('console__prompt');

let renderConsole = (panel) => {

    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    consoleListen();

}

export {renderConsole};
export {consoleDisplay};
export {consoleInput};
