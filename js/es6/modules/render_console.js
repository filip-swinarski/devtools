/* render_console.js, v. 0.1.4, 19.09.2017, @ filip-swinarski */

import {consoleListen} from './console_listen';
import {renderHeader} from './render_header.js';
import {renderConsoleControls} from './render_console_controls.js';

const consoleDisplay = document.createElement('div');
const consoleInput = document.createElement('input');
const consoleContainer = document.createElement('div');
const consoleInputPrompt = document.createElement('span');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.classList.add('console__display--collapsed');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.classList.add('console__input--collapsed');
consoleInput.id = 'console_input';
consoleInput.type = 'text';
consoleInputPrompt.classList.add('console__prompt');
consoleContainer.id = 'console';
consoleInputPrompt.classList.add('console__prompt--collapsed');

const renderConsole = (panel) => {

    renderHeader(consoleContainer, false);
    renderConsoleControls(consoleContainer);
    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    consoleListen();

}

export {renderConsole};
export {consoleDisplay};
export {consoleInput};
