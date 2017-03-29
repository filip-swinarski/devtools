/* console_log.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

let consoleLog = (msg) => {

	let log = new CustomEvent('log', {detail: msg});

	consoleDisplay.dispatchEvent(log);

}

export {consoleLog};
