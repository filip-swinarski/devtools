/* render_popup_section.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';
import {addButtonAction} from './add_button_action.js';
import {applyButtonAction} from './apply_button_action.js';
import {cancelButtonAction} from './cancel_button_action.js';
import {highlightBoxAction} from './highlight_box_action.js';

const renderPopupSection = (id, title, element, row, listWrapper) => {

	const list = document.createElement('ul');
	const header = document.createElement('div');
	const regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	const regexp2 = new RegExp(/background-color: \#adf \!important/);
	let sectionName = '';

	header.innerHTML = `<span class="popup__headline">${title}</span>`;

	if (id === 'attr_list' || id === 'style_list') {

		const addBtn = document.createElement('button');
		const addApplyBtn = document.createElement('button');
		const addCancelBtn = document.createElement('button');
		const nameInput = document.createElement('input');
		const valueInput = document.createElement('input');
		const nameInputLabel = document.createElement('label');
		const valueInputLabel = document.createElement('label');
		let arr;
		
		if (id === 'attr_list') {
			arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
			sectionName = 'attributes';
		} else {
			arr = [];
			sectionName = 'styles';
		}

		list.id = id;
		addBtn.innerText = '+';
		addBtn.classList.add('popup__add');
		addApplyBtn.innerText = 'Apply';
		addCancelBtn.innerText = 'Cancel';
		addApplyBtn.id = `add_${id.replace('_list', '')}_btn`;
		addApplyBtn.classList.add('popup__apply');
		addCancelBtn.classList.add('popup__cancel');
		nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
		valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
		nameInput.type = 'text';
		nameInput.classList.add('popup__add-input');
		valueInput.type = 'text';
		valueInput.classList.add('popup__add-input');
		addApplyBtn.classList.add('popup__apply--collapsed');
		addCancelBtn.classList.add('popup__cancel--collapsed');
		nameInputLabel.classList.add('popup__add-label--collapsed');
		valueInputLabel.classList.add('popup__add-label--collapsed');
		header.appendChild(addBtn);
		header.appendChild(addCancelBtn);
		header.appendChild(addApplyBtn);
		nameInputLabel.appendChild(nameInput);
		valueInputLabel.appendChild(valueInput);
		header.appendChild(nameInputLabel);
		header.appendChild(valueInputLabel);
		listWrapper.appendChild(list);

		if (id === 'style_list' && element.attributes && element.attributes.style) {
			arr = ''.split.call(element.attributes.style.value, '; ')
			arr = arr.map(rule => rule.replace(';', ''));

			if (row.hasAttribute('data-highlight'))
				arr = arr.filter(rule => !rule.match(regexp1) && !rule.match(regexp2));

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
			addButtonAction(addApplyBtn, addCancelBtn, nameInputLabel, valueInputLabel, header);
		}, false);
		addApplyBtn.addEventListener('click', () => {
			applyButtonAction(element, addApplyBtn, valueInputLabel, nameInputLabel, arr, list, row, header);
		}, false);
		addCancelBtn.addEventListener('click', () => {
			cancelButtonAction(addApplyBtn, addCancelBtn, valueInputLabel, nameInputLabel, header);
		}, false);
	} else if (id === 'highlight_section') {

		const highlightCheckbox = document.createElement('input');

		sectionName = 'highlight';
		highlightCheckbox.type = 'checkbox';
		highlightCheckbox.classList.add('popup__highlight');
		header.appendChild(highlightCheckbox);

		if (element.style.cssText.match(regexp1) || element.style.cssText.match(regexp2))
			highlightCheckbox.checked = true;

		highlightCheckbox.addEventListener('change', () => {
			highlightBoxAction(element, row);
		}, false);
	}

	header.classList.add('popup__header');
	listWrapper.appendChild(header);
	listWrapper.classList.add('popup__section');
	listWrapper.classList.add(`popup__section--${sectionName}`);
};

export {renderPopupSection};
