/* render_section.js, v. 0.1.5, 27.09.2017, @ filip-swinarski */

import {renderListSectionContent} from './render_list_section_content.js';
import {renderHighlightSectionContent} from './render_highlight_section_content.js';
import {renderDimensionsSectionContent} from './render_dimensions_section_content.js';
import {renderNodenameSectionContent} from './render_nodename_section_content.js';

const renderSection = (id, prefix, title, element, row, listWrapper) => {

	const list = document.createElement('ul');
	const header = document.createElement('div');
	const regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	const regexp2 = new RegExp(/background-color: \#adf \!important/);
	let sectionName = '';

	header.innerHTML = `<span class="${prefix}__headline">${title}</span>`;
	listWrapper.appendChild(header);
	list.classList.add(`${prefix}__list`);

	if (id === 'attr_list' || id === 'style_list')
		renderListSectionContent(id, element, prefix, row, header, list, listWrapper, sectionName, regexp1, regexp2);

	if (id === 'highlight_section')
		renderHighlightSectionContent(element, header, row, prefix, list, listWrapper, sectionName, regexp1, regexp2);

	if (id === 'dimensions_section')
		renderDimensionsSectionContent(element, header, prefix, list, listWrapper, sectionName);

	if (id === 'node_name')
		renderNodenameSectionContent(element, header, prefix, list, listWrapper, sectionName);

	header.classList.add(`${prefix}__header`);
	listWrapper.classList.add(`${prefix}__section`);
	listWrapper.classList.add(`${prefix}__section--${sectionName}`);
};

export {renderSection};
