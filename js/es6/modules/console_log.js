/* console_log.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

let consoleLog = (str, value) => {

    let log = new CustomEvent('log', {detail: [str, value]});

    consoleDisplay.dispatchEvent(log);

}

export {consoleLog};
