/* render_settings.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

import {renderHeader} from './render_header.js';
import {renderSettingsControls} from './render_settings_controls.js';

const renderSettings = (panel) => {

    const settingsDisplay = document.createElement('div');
    const settingsContainer = document.createElement('div');

    settingsContainer.id = 'settings';
    settingsContainer.classList.add('settings');
    settingsContainer.classList.add('settings__panel');
    settingsDisplay.classList.add('settings__display');
    settingsDisplay.id = 'settings_display';
    settingsDisplay.classList.add('settings__display--collapsed');
    renderHeader(settingsContainer, false);
    settingsContainer.appendChild(settingsDisplay);
	renderSettingsControls(settingsDisplay);
    panel.appendChild(settingsContainer);
};

export {renderSettings};
