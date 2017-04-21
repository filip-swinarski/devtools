/* dt_console_api.js, v. 0.1.3, 21.04.2017, @ filip-swinarski */

import {consoleLog} from './console_log.js';
import {consoleClear} from './console_clear.js';

let log = (value, str = '') => {
    consoleLog(str, value);
}

let clear = consoleClear;

export {log};
export {clear};
