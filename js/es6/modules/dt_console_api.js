/* dt_console_api.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

import {consoleLog} from './console_log.js';

let log = (value, str = '') => {
	consoleLog(str, value);
}

export {log};
