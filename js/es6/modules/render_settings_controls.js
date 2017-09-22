/* render_settings_controls.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

import {stealConsoleAction} from './steal_console_action.js';

const renderSettingsControls = (container) => {

	const stealConsoleRow = document.createElement('div');
	const stealConsoleLabel = document.createElement('label');
	const stealConsoleInput = document.createElement('input');

	stealConsoleRow.classList.add('settings_display__row');
	stealConsoleLabel.classList.add('settings_display__label');
	stealConsoleInput.classList.add('settings_display__input');
	stealConsoleInput.type = 'checkbox';
	stealConsoleInput.id = 'steal_browser_console';
	stealConsoleLabel.innerText = 'Steal browser console';
	stealConsoleRow.appendChild(stealConsoleLabel);
	stealConsoleLabel.appendChild(stealConsoleInput);
	container.appendChild(stealConsoleRow);
	stealConsoleInput.addEventListener('change', () => stealConsoleAction(stealConsoleInput), false);
};

export {renderSettingsControls};
