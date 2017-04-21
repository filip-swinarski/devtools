/* console_clear.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

let consoleClear = () => {
    consoleDisplay.innerHTML = '';
}

export {consoleClear};
