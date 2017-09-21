/* apply_button_action.js, v. 0.1.4, 21.09.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';

const applyButtonAction = (element, addBtn, cancelBtn, valueLabel, nameLabel, arr, list, row, header, prefix) => {

	const separator = document.createElement('span');
	const valueInput = valueLabel.querySelector('input');
	const nameInput = nameLabel.querySelector('input');
	const value = valueInput.value;
	const name = nameInput.value;
	let attrValueElem;
	let attrNameElem;

	list.innerHTML = '';
	separator.innerText = '=';

	if (addBtn.id === 'add_attr_btn')
		attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), (el) => el.innerText === name)[0];

	if (addBtn.id === 'add_style_btn')
		attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), (el) => el.innerText === 'style')[0];

	if (attrValueElem) {
		attrValueElem = attrNameElem.nextSibling.nextSibling;
	} else {
		attrValueElem = document.createElement('span');
		attrNameElem = document.createElement('span');
		row.insertBefore(attrNameElem, row.lastChild);
		row.insertBefore(separator, row.lastChild);
		row.insertBefore(attrValueElem, row.lastChild);
	}

	if (addBtn.id === 'add_attr_btn') {
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
		[].forEach.call(arr, (attr) => {
			renderAttrInput(element, list, row, attr.name, attr.value, prefix);
		});
		attrNameElem.innerText = name;
		attrValueElem.innerText = `"${value}"`;
	}

	if (addBtn.id === 'add_style_btn') {
		attrNameElem.innerText = 'style';
		element.style[name] = value;
		arr.push(`${name}: ${value};`);
		attrValueElem.innerText = '"';
		[].forEach.call(arr, (rule, i) => {
			renderAttrInput(element, list, row, rule.split(': ')[0], rule.split(': ')[1].replace(';', ''), prefix);

			if(i !== 0)
				attrValueElem.innerText += ' ';

			attrValueElem.innerText += `${rule.split(': ')[0]}: ${rule.split(': ')[1]}`;

			if (i < arr.length - 1)
				attrValueElem.innerText += ';';
				
		});
		attrValueElem.innerText += '"';
	}

	attrNameElem.classList.add('inspector__attr-name');
	attrValueElem.classList.add('inspector__attr-value');
	nameLabel.classList.add(`${prefix}__add-label--collapsed`);
	nameLabel.classList.remove(`${prefix}__add-label--expanded`);
	header.classList.remove(`${prefix}__header--expanded`);
	valueLabel.classList.add(`${prefix}__add-label--collapsed`);
	valueLabel.classList.remove(`${prefix}__add-label--expanded`);
	nameInput.value = '';
	valueInput.value = '';
	addBtn.classList.add(`${prefix}__apply--collapsed`);
	addBtn.classList.remove(`${prefix}__apply--expanded`);
	cancelBtn.classList.add(`${prefix}__cancel--collapsed`);
	cancelBtn.classList.remove(`${prefix}__cancel--expanded`);
};

export {applyButtonAction};
