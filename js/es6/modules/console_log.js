/* console_log.js, v. 0.1.1, 29.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

let consoleLog = (msg, type = 'log') => {

	let log = new CustomEvent('log', {detail: [msg, type]});

	consoleDisplay.dispatchEvent(log);

}

export {consoleLog};
