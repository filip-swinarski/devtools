/* main.js 0.1.2 19.09.2017 @ filip swinarski */

import {loadStyles} from './modules/load_styles.js';
import {renderInspector} from './modules/render_inspector.js';
import {renderConsole} from './modules/render_console.js';
import {renderBrowserInfo} from './modules/render_browser_info.js';
import {consoleListen} from './modules/console_listen.js';
import * as DTConsole from './modules/dt_console_api.js';

const body = document.body;
const container = document.createElement('div');

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
loadStyles();
renderInspector(body, container);
renderConsole(container);
renderBrowserInfo(container);

if (window.console)
	window.DTConsole = DTConsole;
else
	window.console = DTConsole;
