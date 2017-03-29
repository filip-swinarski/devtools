/* main.js 0.1.0 27.03.2017 @ filip swinarski */

import {renderInspector} from './modules/render_inspector.js';
import {loadStyles} from './modules/load_styles.js';
import {renderConsole} from './modules/render_console.js';
import {consoleListen} from './modules/console_listen.js';
import * as DTConsole from './modules/dt_console_api.js';

const body = document.body;

loadStyles();
renderInspector(body);
renderConsole(body);
// consoleListen();

window.DTConsole = DTConsole;
