/* render_section.js, v. 0.1.5, 27.09.2017, @ filip-swinarski */

import {highlightBoxAction} from './highlight_box_action.js';

const renderHighlightSectionContent = (element, header, row, prefix, list, listWrapper, sectionName, regexp1, regexp2) => {

	const highlightCheckbox = document.createElement('input');

	sectionName = 'highlight';
	highlightCheckbox.type = 'checkbox';
	highlightCheckbox.classList.add(`${prefix}__highlight`);
	header.appendChild(highlightCheckbox);

	if (element.style.cssText.match(regexp1) || element.style.cssText.match(regexp2))
		highlightCheckbox.checked = true;

	highlightCheckbox.addEventListener('change', () => {
		highlightBoxAction(element, row);
	}, false);
};

export {renderHighlightSectionContent};
