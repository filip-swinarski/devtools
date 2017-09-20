/* render_section.js, v. 0.1.1, 20.09.2017, @ filip-swinarski */

import {renderAttrInput} from './render_attribute_input.js';
import {addButtonAction} from './add_button_action.js';
import {applyButtonAction} from './apply_button_action.js';
import {cancelButtonAction} from './cancel_button_action.js';
import {highlightBoxAction} from './highlight_box_action.js';

const renderSection = (id, prefix, title, element, row, listWrapper) => {

	const list = document.createElement('ul');
	const header = document.createElement('div');
	const regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	const regexp2 = new RegExp(/background-color: \#adf \!important/);
	let sectionName = '';

	header.innerHTML = `<span class="${prefix}__headline">${title}</span>`;
	listWrapper.appendChild(header);
	list.classList.add(`${prefix}__list`);

	if (id === 'attr_list' || id === 'style_list') {

		const addBtn = document.createElement('button');
		const addApplyBtn = document.createElement('button');
		const addCancelBtn = document.createElement('button');
		const nameInput = document.createElement('input');
		const valueInput = document.createElement('input');
		const nameInputLabel = document.createElement('label');
		const valueInputLabel = document.createElement('label');
		let arr;
		
		listWrapper.appendChild(list);

		if (id === 'attr_list') {
			arr = [].filter.call(element.attributes, attr => attr.name !== 'style');
			sectionName = 'attributes';
		} else {
			arr = [];
			sectionName = 'styles';
		}

		list.id = id;
		addBtn.innerText = '+';
		addBtn.classList.add(`${prefix}__add`);
		addApplyBtn.innerText = 'Apply';
		addCancelBtn.innerText = 'Cancel';
		addApplyBtn.id = `add_${id.replace('_list', '')}_btn`;
		addApplyBtn.classList.add(`${prefix}__apply`);
		addCancelBtn.classList.add(`${prefix}__cancel`);
		nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
		valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
		nameInput.type = 'text';
		nameInput.classList.add(`${prefix}__add-input`);
		valueInput.type = 'text';
		valueInput.classList.add(`${prefix}__add-input`);
		addApplyBtn.classList.add(`${prefix}__apply--collapsed`);
		addCancelBtn.classList.add(`${prefix}__cancel--collapsed`);
		nameInputLabel.classList.add(`${prefix}__add-label--collapsed`);
		valueInputLabel.classList.add(`${prefix}__add-label--collapsed`);
		header.appendChild(addBtn);
		header.appendChild(addCancelBtn);
		header.appendChild(addApplyBtn);
		nameInputLabel.appendChild(nameInput);
		valueInputLabel.appendChild(valueInput);
		header.appendChild(nameInputLabel);
		header.appendChild(valueInputLabel);

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

			renderAttrInput(element, list, row, name, value, prefix);
		}

		addBtn.addEventListener('click', (e) => {
			addButtonAction(addApplyBtn, addCancelBtn, nameInputLabel, valueInputLabel, header, prefix);
		}, false);
		addApplyBtn.addEventListener('click', () => {
			applyButtonAction(element, addApplyBtn, valueInputLabel, nameInputLabel, arr, list, row, header, prefix);
		}, false);
		addCancelBtn.addEventListener('click', () => {
			cancelButtonAction(addApplyBtn, addCancelBtn, valueInputLabel, nameInputLabel, header, prefix);
		}, false);
	} else if (id === 'highlight_section') {

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
	}

	header.classList.add(`${prefix}__header`);
	listWrapper.classList.add(`${prefix}__section`);
	listWrapper.classList.add(`${prefix}__section--${sectionName}`);
};

export {renderSection};
