/* render_attribute_input.js, v. 0.1.2, 20.09.2017, @ filip-swinarski */

const renderAttrInput = (el, display, row, name, value, prefix) => {
   
	const input = document.createElement('input');
	const label = document.createElement('label');
	const separator = document.createElement('span');
	const applyBtn = document.createElement('button');
	const listElement = document.createElement('li');
   
	input.type = 'text';
	input.value = value;

	if (display.id == 'style_list')
		input.value += ';';

	label.innerText = name;
	applyBtn.innerText = 'Apply';
	separator.innerText = ':';
	listElement.classList.add(`${prefix}__list-element`);
	label.classList.add(`${prefix}__list-label`);
	input.classList.add(`${prefix}__list-input`);
	applyBtn.classList.add(`${prefix}__list-btn`);
	applyBtn.classList.add(`${prefix}__list-btn--collapsed`);
	separator.classList.add(`${prefix}__list-separator`);
   
	label.appendChild(separator);
	label.appendChild(input);
	label.appendChild(applyBtn);
	listElement.appendChild(label);
	display.appendChild(listElement);
   
	input.addEventListener('keypress', (e) => {
   
		if (e.keyCode === 13) {

			const rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
			const rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

			if (display.id == 'attr_list')
				el.attributes[name].value = input.value;

			if (display.id == 'style_list')
				el.style[name] = input.value.replace(';', '');

			[].forEach.call(rowAttrNameElems, (attrNameEl, i) => {
				
				if (attrNameEl.innerText === name && display.id == 'attr_list') {
					rowAttrValueElems[i].innerText = `"${input.value}"`;
					attrNameEl.innerText = name;
				}

				if (attrNameEl.innerText === 'style' && display.id == 'style_list') {

					const labels = display.querySelectorAll('label');
					let value = '';

					[].forEach.call(labels, (label, i) => {
						value += label.firstChild.data;
						value += ': ';
						value += label.querySelector('input').value;

						if (i < labels.length - 1)
							value += ' ';
					});
					rowAttrValueElems[i].innerText = `"${value}"`;
				}

			});

			applyBtn.classList.remove(`${prefix}__list-btn--expanded`);
			applyBtn.classList.add(`${prefix}__list-btn--collapsed`);
		}

	}, false);

	input.addEventListener('focus', (e) => {
		applyBtn.classList.add(`${prefix}__list-btn--expanded`);
		applyBtn.classList.remove(`${prefix}__list-btn--collapsed`);
	});

	input.addEventListener('blur', (e) => {
		applyBtn.classList.remove(`${prefix}__list-btn--expanded`);
		applyBtn.classList.add(`${prefix}__list-btn--collapsed`);
	});

	applyBtn.addEventListener('touchstart', (e) => {
   
		const rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
		const rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

		if (display.id == 'attr_list')
			el.attributes[name].value = input.value;

		if (display.id == 'style_list')
			el.style[name] = input.value.replace(';', '');

		[].forEach.call(rowAttrNameElems, (attrNameEl, i) => {
			
			if (attrNameEl.innerText === name && display.id == 'attr_list') {
				rowAttrValueElems[i].innerText = `"${input.value}"`;
				attrNameEl.innerText = name;
			}

			if (attrNameEl.innerText === 'style' && display.id == 'style_list') {

				let labels = display.querySelectorAll('label');
				let value = '';

				[].forEach.call(labels, (label, i) => {
					value += label.firstChild.data;
					value += ': ';
					value += label.querySelector('input').value;

					if (i < labels.length - 1)
						value += ' ';
				});
				rowAttrValueElems[i].innerText = `"${value}"`;
			}

		});

		applyBtn.classList.remove(`${prefix}__list-btn--expanded`);
		applyBtn.classList.add(`${prefix}__list-btn--collapsed`);

	}, false);
};

export {renderAttrInput};
