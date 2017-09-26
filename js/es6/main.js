/* main.js 0.1.4 26.09.2017 @ filip swinarski */

import {loadStyles} from './modules/load_styles.js';
import {renderInspector} from './modules/render_inspector.js';
import {renderConsole} from './modules/render_console.js';
import {renderBrowserInfo} from './modules/render_browser_info.js';
import {renderSettings} from './modules/render_settings.js';
import {consoleListen} from './modules/console_listen.js';
import * as console from './modules/dt_console_api.js';
import {renderLiveOverlay} from './modules/render_live_overlay.js';

const body = document.body;
const container = document.createElement('div');
let stealBrowserConsole = false;
let liveMode = false;

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
loadStyles();
renderInspector(body, container);
renderConsole(container);
renderBrowserInfo(container);
renderSettings(container);

if (localStorage[document.domain]) {

	if (JSON.parse(localStorage[document.domain]).stealBrowserConsole)
		stealBrowserConsole = JSON.parse(localStorage[document.domain]).stealBrowserConsole

	if (JSON.parse(localStorage[document.domain]).liveMode)
		liveMode = JSON.parse(localStorage[document.domain]).liveMode

}

window.DT = {
	console,
	stealBrowserConsole,
	liveMode
};

if (stealBrowserConsole) {
	DT.backup = window.console;
	window.console = DT.console;
}

if (liveMode)
	renderLiveOverlay();
