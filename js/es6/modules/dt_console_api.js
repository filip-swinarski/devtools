/* dt_console_api.js, v. 0.1.1, 29.03.2017, @ filip-swinarski */

import {consoleLog} from './console_log.js';

let log = (msg, type) => {
	consoleLog(msg, type);
}

export {log};
