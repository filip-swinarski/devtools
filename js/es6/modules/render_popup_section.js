/* render_popup_section.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';
import {addButtonAction} from './add_button_action.js';
import {applyButtonAction} from './apply_button_action.js';


let renderPopupSection = (id, title, element, row, listWrapper) => {

	let list = document.createElement('ul');
	let header = document.createElement('div');
	let addBtn = document.createElement('button');
	let addApplyBtn = document.createElement('button');
	let nameInput = document.createElement('input');
	let valueInput = document.createElement('input');
	let nameInputLabel = document.createElement('label');
	let valueInputLabel = document.createElement('label');
	let arr;
	let sectionName = '';
	
	if (id === 'attr_list') {
		arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
		sectionName = 'attributes';
	} else {
		arr = [];
		sectionName = 'styles';
	}

	list.id = id;
	listWrapper.classList.add('popup__section');
	listWrapper.classList.add(`popup__section--${sectionName}`);
	listWrapper.innerHTML = `<span class="popup__headline">${title}</span>`;
	addBtn.innerText = '+';
	addBtn.classList.add('popup__add');
	addApplyBtn.innerText = 'Apply';
	addApplyBtn.id = `add_${id.replace('_list', '')}_btn`;
	addApplyBtn.classList.add('popup__apply');
	nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
	valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
	nameInput.type = 'text';
	nameInput.classList.add('popup__add-input');
	valueInput.type = 'text';
	valueInput.classList.add('popup__add-input');
	addApplyBtn.classList.add('popup__apply--collapsed');
	nameInputLabel.classList.add('popup__add-label--collapsed');
	valueInputLabel.classList.add('popup__add-label--collapsed');
	header.appendChild(addBtn);
	header.appendChild(addApplyBtn);
	nameInputLabel.appendChild(nameInput);
	valueInputLabel.appendChild(valueInput);
	header.appendChild(nameInputLabel);
	header.appendChild(valueInputLabel);
	header.classList.add('popup__header');
	list.classList.add('popup__list');
	listWrapper.appendChild(header);
	listWrapper.appendChild(list);

	if (id === 'style_list' && element.attributes && element.attributes.style) {
		arr = ''.split.call(element.attributes.style.value, '; ')
		arr = arr.map(rule => rule.replace(';', ''));
	}

	for (let item in arr) {
		
		let name;
		let value;

		if (id === 'style_list') {
			name = arr[item].split(': ')[0];
			value = arr[item].split(': ')[1];
		} else {
			name = arr[item].name;
			value = arr[item].value;
		}

		renderAttrInput(element, list, row, name, value);
	}

	addBtn.addEventListener('click', (e) => {
		addButtonAction(addApplyBtn, nameInputLabel, valueInputLabel);
	}, false);

	addApplyBtn.addEventListener('click', () => {
		applyButtonAction(element, addApplyBtn, valueInputLabel, nameInputLabel, arr, list, row);
	}, false);

};

export {renderPopupSection};
