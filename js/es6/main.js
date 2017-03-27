/* main.js 0.1.0 27.03.2017 @ filip swinarski */

import {renderDOM} from './modules/render_dom.js';
import {loadStyles} from './modules/load_styles.js';

const body = document.body;
let level = 0;
const display = document.createElement('div');

display.classList.add('display');
display.id = 'display';
body.appendChild(display);
loadStyles();
renderDOM(body, display, level);
