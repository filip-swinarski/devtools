/* render_console_controls.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

import {consoleClear} from './console_clear.js';

const consoleClearBtn = document.createElement('button');
const consoleControlsPanel = document.createElement('div');

const renderConsoleControls = (container) => {

    container.appendChild(consoleControlsPanel);
    consoleControlsPanel.appendChild(consoleClearBtn);
	consoleControlsPanel.classList.add('console__controls');
	consoleClearBtn.classList.add('console__controls--clear-btn');
	consoleClearBtn.innerText = "Clear";
	consoleClearBtn.addEventListener('click', () => consoleClear(), false);
}

export {renderConsoleControls};
