/* dt_console_api.js, v. 0.1.3, 19.09.2017, @ filip-swinarski */

import {consoleLog} from './console_log.js';
import {consoleClear} from './console_clear.js';

const log = (value, str = '') => {
    consoleLog(str, value);
}

const clear = consoleClear;

export {log};
export {clear};
