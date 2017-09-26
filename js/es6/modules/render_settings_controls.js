/* render_settings_controls.js, v. 0.1.1, 26.09.2017, @ filip-swinarski */

import {stealConsoleAction} from './steal_console_action.js';
import {liveModeAction} from './live_mode_action.js';

const renderSettingsControls = (container) => {

	const stealConsoleRow = document.createElement('div');
	const stealConsoleLabel = document.createElement('label');
	const stealConsoleInput = document.createElement('input');
	const liveModeRow = document.createElement('div');
	const liveModeLabel = document.createElement('label');
	const liveModeInput = document.createElement('input');
	let storage = localStorage[document.domain] 
		? JSON.parse(localStorage[document.domain]) : false;

	stealConsoleRow.classList.add('settings_display__row');
	stealConsoleLabel.classList.add('settings_display__label');
	stealConsoleInput.classList.add('settings_display__input');
	stealConsoleInput.type = 'checkbox';
	stealConsoleInput.id = 'steal_browser_console_input';
	stealConsoleLabel.innerText = 'Steal browser console';
	stealConsoleRow.appendChild(stealConsoleLabel);
	stealConsoleLabel.appendChild(stealConsoleInput);
	container.appendChild(stealConsoleRow);

	if (storage && storage.stealBrowserConsole)
		stealConsoleInput.setAttribute('checked', true);
	else
		stealConsoleInput.removeAttribute('checked')

	stealConsoleInput.addEventListener('change', () =>
		stealConsoleAction(stealConsoleInput), false);

	liveModeRow.classList.add('settings_display__row');
	liveModeLabel.classList.add('settings_display__label');
	liveModeInput.classList.add('settings_display__input');
	liveModeInput.type = 'checkbox';
	liveModeInput.id = 'live_mode_input';
	liveModeLabel.innerText = 'Live mode';
	liveModeRow.appendChild(liveModeLabel);
	liveModeLabel.appendChild(liveModeInput);
	container.appendChild(liveModeRow);

	if (storage && storage.liveMode)
		liveModeInput.setAttribute('checked', true);
	else
		liveModeInput.removeAttribute('checked')

	liveModeInput.addEventListener('change', () => 
		liveModeAction(liveModeInput), false);
};

export {renderSettingsControls};
