/* render_console.js, v. 0.1.1, 29.03.2017, @ filip-swinarski */

import {consoleListen} from './console_listen';

const consoleDisplay = document.createElement('div');
const consoleInput = document.createElement('input');
const consoleContainer = document.createElement('div');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.id = 'console_input';
consoleInput.type = 'text';

let renderConsole = (panel) => {

	consoleContainer.appendChild(consoleDisplay);
	consoleContainer.appendChild(consoleInput);
	panel.appendChild(consoleContainer);
	consoleListen();

}

export {renderConsole};
export {consoleDisplay};
export {consoleInput};
