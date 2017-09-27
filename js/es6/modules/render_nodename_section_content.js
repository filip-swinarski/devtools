/* render_nodename_section_content.js, v. 0.1.0, 27.09.2017, @ filip-swinarski */

const renderNodenameSectionContent = (element, header, prefix, list, listWrapper, sectionName) => {

	const nodeNameContainer = document.createElement('span');

	nodeNameContainer.innerText = element.nodeName.toLowerCase();
	nodeNameContainer.classList.add(`${prefix}__node-name`);
	header.appendChild(nodeNameContainer);
};

export {renderNodenameSectionContent};
