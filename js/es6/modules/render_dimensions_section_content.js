/* render_dimensions_section_content.js, v. 0.1.0, 27.09.2017, @ filip-swinarski */

const renderDimensionsSectionContent = (element, header, prefix, list, listWrapper, sectionName) => {

	const widthRow = document.createElement('div');
	const heightRow = document.createElement('div');

	sectionName = 'dimensions';
	widthRow.classList.add(`${prefix}__dimensions-row`);
	heightRow.classList.add(`${prefix}__dimensions-row`);
	widthRow.innerHTML = `<span class="${prefix}__key">width: </span>
		<span class="${prefix}__value">${element.clientWidth}px</span>`;
	heightRow.innerHTML = `<span class="${prefix}__key">height: </span>
		<span class="${prefix}__value">${element.clientHeight}px</span>`;
	listWrapper.appendChild(widthRow);
	listWrapper.appendChild(heightRow);
};

export {renderDimensionsSectionContent};
