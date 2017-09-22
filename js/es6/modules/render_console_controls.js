/* render_console_controls.js, v. 0.1.3, 22.09.2017, @ filip-swinarski */

import {consoleClear} from './console_clear.js';
import {globalEval} from './global_eval.js';

const consoleClearBtn = document.createElement('button');
const consoleLogBtn = document.createElement('button');
const consoleControlsPanel = document.createElement('div');

const renderConsoleControls = (container, input) => {

    container.appendChild(consoleControlsPanel);
    consoleControlsPanel.appendChild(consoleClearBtn);
    consoleControlsPanel.appendChild(consoleLogBtn);
	consoleControlsPanel.classList.add('console__controls');
	consoleClearBtn.classList.add('console__controls--btn');
	consoleClearBtn.classList.add('console__controls--clear-btn');
	consoleLogBtn.classList.add('console__controls--btn');
	consoleLogBtn.classList.add('console__controls--log-btn');
	consoleClearBtn.innerText = "Clear";
	consoleLogBtn.innerText = "Log";
	consoleClearBtn.addEventListener('click', () => consoleClear(), false);
	consoleLogBtn.addEventListener('click', () => {

		let value = globalEval(input.value);

		DT.console.log(value, input.value);	
		input.value = '';
	}, false);
}

export {renderConsoleControls};
