/* console_clear.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

const consoleClear = () => {
    consoleDisplay.innerHTML = '';
}

export {consoleClear};
