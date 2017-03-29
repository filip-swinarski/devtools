/* render_dom.js, v. 0.1.3, 28.03.2017, @ filip-swinarski */

let renderDOM = (elem, parentEl, level) => {

	if (elem.id === 'inspector_display')
		return;

	let wrapper = document.createElement('div');
	let row1 = document.createElement('div');
	let row2 = elem.children.length ? document.createElement('div') : document.createElement('span');
	
	wrapper.style.marginLeft = '20px';
	row1.classList.add('row');
	row1.classList.add('opening');

	row2.classList.add('row');
	row2.classList.add('closing');
	
	let row1ElementTypeSpan = document.createElement('span');
	let row1OpenArrow = document.createElement('span');
	let row1CloseArrow = document.createElement('span');
	let row2ElementTypeSpan = document.createElement('span');
	let row2OpenArrow = document.createElement('span');
	let row2CloseArrow = document.createElement('span');
	
	row1ElementTypeSpan.classList.add('tag-name');
	row2ElementTypeSpan.classList.add('tag-name'); 
	row1OpenArrow.innerText =  '<';
	row1CloseArrow.innerText =  '>';
	row1ElementTypeSpan.innerText = elem.localName;
	row1.appendChild(row1OpenArrow);
	row1.appendChild(row1ElementTypeSpan);
	
	if (elem.attributes.length) {
		[].slice.call(elem.attributes).forEach((attr) => {
			
			let attrNameSpan = document.createElement('span');
			let attrEqualSpan = document.createElement('span');
			let attrValueSpan = document.createElement('span');
			
			attrNameSpan.classList.add('attr-name');
			attrValueSpan.classList.add('attr-value');
			attrNameSpan.innerText = ' ' + attr.localName;
			attrEqualSpan.innerText = '=';
			attrValueSpan.innerText = '"' + attr.value + '"';
			row1.appendChild(attrNameSpan);
			row1.appendChild(attrEqualSpan);
			row1.appendChild(attrValueSpan);
		});
	}	
	
	row1.appendChild(row1CloseArrow);
	wrapper.appendChild(row1);
	wrapper.classList.add('exp');
	
	if (elem.text && elem.text.length) {
		
		let textEl = document.createElement('div');
		
		textEl.style.marginLeft = '20px';
		textEl.classList.add('exp');
		textEl.innerText = elem.text.trim();
		wrapper.appendChild(textEl)

		if (level < 2)
			row1.classList.add('expanded');
		else
			row1.classList.add('collapsed');
	}
	
	if (elem.children.length)
		level += 1;
		[].slice.call(elem.children).forEach((el) => {
			renderDOM(el, wrapper, level);

			if (level < 2)
				row1.classList.add('expanded');
			else
				row1.classList.add('collapsed');
		});

	row2OpenArrow.innerText =  '</';
	row2CloseArrow.innerText =  '>';
	row2ElementTypeSpan.innerText = elem.localName;
	row2.appendChild(row2OpenArrow);
	row2.appendChild(row2ElementTypeSpan);
	row2.appendChild(row2CloseArrow);
	
	if (elem.children.length || elem.text && elem.text.length)
		wrapper.appendChild(row2);
	else
		row1.appendChild(row2);
	
	row1.addEventListener('click', (e) => {
		e.preventDefault();
		row1.classList.toggle('expanded')
		row1.classList.toggle('collapsed')
	}, false);
	
	parentEl.appendChild(wrapper);
}
export {renderDOM};