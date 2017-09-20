/* render_inspector_pane.js, v. 0.1.4, 18.09.2017, @ filip-swinarski */

import {renderSection} from './render_section.js';

const renderInspectorPane = (element, row) => {

    const container = document.querySelector('#inspector');
    const inspectorPane = document.createElement('div');
    const closeBtn =  document.createElement('div');
	const attributeListWrapper = document.createElement('div');
	const styleListWrapper = document.createElement('div');
	const inspectorPaneWrapper = document.createElement('div');
	const highlightWrapper = document.createElement('div');

    inspectorPane.classList.add('inspector-pane');
	inspectorPaneWrapper.classList.add('inspector-pane__wrapper');
    closeBtn.classList.add('inspector-pane__close');
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', () => {
        inspectorPane.remove();
    }, false);

	renderSection('attr_list', 'inspector-pane', 'Attributes', element, row, attributeListWrapper);
	renderSection('style_list', 'inspector-pane', 'Inline styles', element, row, styleListWrapper);
	renderSection('highlight_section', 'inspector-pane', 'Highlight element', element, row, highlightWrapper);

    inspectorPane.appendChild(closeBtn);
    inspectorPaneWrapper.appendChild(attributeListWrapper);
    inspectorPaneWrapper.appendChild(styleListWrapper);
    inspectorPaneWrapper.appendChild(highlightWrapper);
    inspectorPane.appendChild(inspectorPaneWrapper);
    container.appendChild(inspectorPane);
};

export {renderInspectorPane};
