/* render_inspector.js, v. 0.1.6, 21.04.2017, @ filip-swinarski */

import {renderDOM} from './render_dom.js';
import {renderHeader} from './render_header.js';

let renderInspector = (body, panel) => {

    const inspectorDisplay = document.createElement('div');
    const inspectorContainer = document.createElement('div');
	const htmlElem = document.querySelector('html');
    let level = 0;

    inspectorContainer.id = 'inspector';
    inspectorContainer.classList.add('inspector');
    inspectorContainer.classList.add('tools__panel');
    inspectorDisplay.classList.add('inspector__display');
    inspectorDisplay.id = 'inspector_display';
    renderHeader(inspectorContainer, true);
    inspectorDisplay.classList.add('inspector__display--expanded');
    inspectorContainer.appendChild(inspectorDisplay);
    panel.appendChild(inspectorContainer);
    renderDOM(htmlElem, inspectorDisplay, level);

};

export {renderInspector};
