/* console_log.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

const consoleLog = (str, value) => {

    const log = new CustomEvent('log', {detail: [str, value]});

    consoleDisplay.dispatchEvent(log);

}

export {consoleLog};
