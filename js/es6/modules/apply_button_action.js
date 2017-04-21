/* apply_button_action.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';

let applyButtonAction = (element, btn, valueLabel, nameLabel, arr, list, row) => {

	let separator = document.createElement('span');
	let valueInput = valueLabel.querySelector('input');
	let nameInput = nameLabel.querySelector('input');
	let value = valueInput.value;
	let name = nameInput.value;
	let attrValueElem;
	let attrNameElem;

	list.innerHTML = '';

	if (btn.id === 'add_attr_btn') {
		attrNameElem = document.createElement('span');
		attrValueElem = document.createElement('span');
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
		[].forEach.call(arr, (attr) => {
			renderAttrInput(element, list, row, attr.name, attr.value);
		});
		attrNameElem.classList.add('inspector__attr-name');
		attrValueElem.classList.add('inspector__attr-value');
		attrNameElem.innerText = name;
		attrValueElem.innerText = `"${value}"`;
		separator.innerText = '=';
		row.insertBefore(attrNameElem, row.lastChild);
		row.insertBefore(separator, row.lastChild);
		row.insertBefore(attrValueElem, row.lastChild);
	}

	if (btn.id === 'add_style_btn') {

		let styleElem = [].filter.call(document.querySelectorAll('.inspector__attr-name'), (el) => el.innerText === 'style')[0];

		attrNameElem = document.createElement('span'); 
		attrValueElem = styleElem.nextSibling.nextSibling;
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

	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	btn.classList.add('popup__apply--collapsed');
	btn.classList.remove('popup__apply--expanded');

};

export {applyButtonAction};
