/* apply_button_action.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';

const applyButtonAction = (element, btn, valueLabel, nameLabel, arr, list, row, header) => {

	const separator = document.createElement('span');
	const valueInput = valueLabel.querySelector('input');
	const nameInput = nameLabel.querySelector('input');
	const value = valueInput.value;
	const name = nameInput.value;
	let attrValueElem;
	let attrNameElem;

	list.innerHTML = '';
	separator.innerText = '=';

	if (btn.id === 'add_attr_btn')
		attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), (el) => el.innerText === name)[0];

	if (btn.id === 'add_style_btn')
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

	if (btn.id === 'add_attr_btn') {
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
		[].forEach.call(arr, (attr) => {
			renderAttrInput(element, list, row, attr.name, attr.value);
		});
		attrNameElem.innerText = name;
		attrValueElem.innerText = `"${value}"`;
	}

	if (btn.id === 'add_style_btn') {
		attrNameElem.innerText = 'style';
		element.style[name] = value;
		arr.push(`${name}: ${value};`);
		attrValueElem.innerText = '"';
		[].forEach.call(arr, (rule, i) => {
			renderAttrInput(element, list, row, rule.split(': ')[0], rule.split(': ')[1].replace(';', ''));

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
	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	header.classList.remove('popup__header--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	btn.classList.add('popup__apply--collapsed');
	btn.classList.remove('popup__apply--expanded');
};

export {applyButtonAction};
