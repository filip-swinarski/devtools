/* main.js 0.1.0 27.03.2017 @ filip swinarski */

import {renderInspector} from './modules/render_inspector.js';
import {loadStyles} from './modules/load_styles.js';
import {renderConsole} from './modules/render_console.js';
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

window.DTConsole = DTConsole;
