/* main.js 0.1.3 22.09.2017 @ filip swinarski */

import {loadStyles} from './modules/load_styles.js';
import {renderInspector} from './modules/render_inspector.js';
import {renderConsole} from './modules/render_console.js';
import {renderBrowserInfo} from './modules/render_browser_info.js';
import {renderSettings} from './modules/render_settings.js';
import {consoleListen} from './modules/console_listen.js';
import * as console from './modules/dt_console_api.js';

const body = document.body;
const container = document.createElement('div');
let stealBrowserConsole = false;

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
loadStyles();
renderInspector(body, container);
renderConsole(container);
renderBrowserInfo(container);
renderSettings(container);

if (localStorage[document.domain])
	stealBrowserConsole = JSON.parse(localStorage[document.domain]).stealBrowserConsole

window.DT = {
	console,
	stealBrowserConsole
};

if (stealBrowserConsole) {
	DT.backup = window.console;
	window.console = DT.console;
}
