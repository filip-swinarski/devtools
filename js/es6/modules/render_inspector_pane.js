/* render_inspector_pane.js, v. 0.1.6, 27.09.2017, @ filip-swinarski */

import {renderSection} from './render_section.js';

const renderInspectorPane = (element, row, container) => {

	const id = container.id
    const inspectorPane = document.createElement('div');
	const attributeListWrapper = document.createElement('div');
	const styleListWrapper = document.createElement('div');
	const inspectorPaneWrapper = document.createElement('div');
	const highlightWrapper = document.createElement('div');
	const dimensionsWrapper = document.createElement('div');

    inspectorPane.classList.add(`${id}-pane`);
	inspectorPaneWrapper.classList.add(`${id}-pane__wrapper`);

	if (id === 'inspector') {

		const closeBtn =  document.createElement('div');

		closeBtn.classList.add(`${id}-pane__close`);
		closeBtn.innerHTML = 'x';
		inspectorPane.appendChild(closeBtn);
		closeBtn.addEventListener('click', () => {
			inspectorPane.remove();
		}, false);
	}
	
	if (id === 'tools_popup')
		renderSection('node_name', `${id}-pane`, 'Node name', element, row, attributeListWrapper);

	renderSection('attr_list', `${id}-pane`, 'Attributes', element, row, attributeListWrapper);
	renderSection('style_list', `${id}-pane`, 'Inline styles', element, row, styleListWrapper);

	if (id === 'inspector')
		renderSection('highlight_section', `${id}-pane`, 'Highlight element', element, row, highlightWrapper);

	renderSection('dimensions_section', `${id}-pane`, 'Dimensions', element, row, dimensionsWrapper);
    inspectorPaneWrapper.appendChild(attributeListWrapper);
    inspectorPaneWrapper.appendChild(styleListWrapper);
    inspectorPaneWrapper.appendChild(highlightWrapper);
    inspectorPaneWrapper.appendChild(dimensionsWrapper);
    inspectorPane.appendChild(inspectorPaneWrapper);
    container.appendChild(inspectorPane);
};

export {renderInspectorPane};
