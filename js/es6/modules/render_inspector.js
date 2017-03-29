/* render_inspector.js, v. 0.1.4, 29.03.2017, @ filip-swinarski */

import {renderDOM} from './render_dom.js';

let renderInspector = (body, panel) => {

	const inspectorDisplay = document.createElement('div');
	const inspectorContainer = document.createElement('div');
	let level = 0;

	inspectorContainer.classList.add('inspector');
	inspectorContainer.classList.add('tools__panel');
	inspectorDisplay.classList.add('inspector__display');
	inspectorDisplay.id = 'inspector_display';
	inspectorContainer.appendChild(inspectorDisplay);
	panel.appendChild(inspectorContainer);
	renderDOM(body, inspectorDisplay, level);

};

export {renderInspector};
