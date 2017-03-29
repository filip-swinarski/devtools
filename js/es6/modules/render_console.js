/* render_console.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

import {consoleListen} from './console_listen';

const consoleDisplay = document.createElement('div');

consoleDisplay.classList.add('display');
consoleDisplay.id = 'console_display';

let renderConsole = (body) => {

	body.appendChild(consoleDisplay);
	consoleListen();

}

export {renderConsole};
export {consoleDisplay};
