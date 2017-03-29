/* render_inspector.js, v. 0.1.2, 28.03.2017, @ filip-swinarski */

import {renderDOM} from './render_dom.js';

let renderInspector = (body) => {

	const inspectorDisplay = document.createElement('div');
	let level = 0;

	inspectorDisplay.id = 'inspector_display';
	inspectorDisplay.classList.add('display');
	body.appendChild(inspectorDisplay);
	renderDOM(body, inspectorDisplay, level);

};

export {renderInspector};
