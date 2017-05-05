/* render_attribute_input.js, v. 0.1.1, 05.05.2017, @ filip-swinarski */

let renderAttrInput = (el, display, row, name, value) => {
   
	let input = document.createElement('input');
	let label = document.createElement('label');
	let separator = document.createElement('span');
	let applyBtn = document.createElement('button');
	let listElement = document.createElement('li');
   
	input.type = 'text';
	input.value = value;

	if (display.id == 'style_list')
		input.value += ';';

	label.innerText = name;
	applyBtn.innerText = 'Apply';
	separator.innerText = ':';
	listElement.classList.add('popup__list-element');
	label.classList.add('popup__list-label');
	input.classList.add('popup__list-input');
	applyBtn.classList.add('popup__list-btn');
	applyBtn.classList.add('popup__list-btn--collapsed');
	separator.classList.add('popup__list-separator');
   
	label.appendChild(separator);
	label.appendChild(input);
	label.appendChild(applyBtn);
	listElement.appendChild(label);
	display.appendChild(listElement);
   
	input.addEventListener('keypress', (e) => {
   
		if (e.keyCode === 13) {

			let rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
			let rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

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

			applyBtn.classList.remove('popup__list-btn--expanded');
			applyBtn.classList.add('popup__list-btn--collapsed');
		}

	}, false);

	input.addEventListener('focus', (e) => {
		applyBtn.classList.add('popup__list-btn--expanded');
		applyBtn.classList.remove('popup__list-btn--collapsed');
	});

	input.addEventListener('blur', (e) => {
		applyBtn.classList.remove('popup__list-btn--expanded');
		applyBtn.classList.add('popup__list-btn--collapsed');
	});

	applyBtn.addEventListener('click', (e) => {
   
		let rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
		let rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

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

		applyBtn.classList.remove('popup__list-btn--expanded');
		applyBtn.classList.add('popup__list-btn--collapsed');

	}, false);
};

export {renderAttrInput};
