/* render_dom.js, v. 0.1.0 @ filip-swinarski */

let renderDOM = (elem, parentEl, level) => {

	if (elem.id === 'display')
		return;

	let wrapper = document.createElement('div');
	let row1 = document.createElement('div');
	let row2 = elem.children.length ? document.createElement('div') : document.createElement('span');
	
	wrapper.style.marginLeft = '20px';
	wrapper.classList.add('exp');
	row1.classList.add('row');
	row1.classList.add('opening');
	
	if (level < 2)
		row1.classList.add('expanded');
	
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
	
	if (elem.text && elem.text.length) {
		
		let textEl = document.createElement('div');
		
		textEl.style.marginLeft = '20px';
		textEl.innerText = elem.text.trim();
		wrapper.appendChild(textEl)
	}
	
	if (elem.children.length)
		level += 1;
		[].slice.call(elem.children).forEach((el) => {
			renderDOM(el, wrapper, level);
		});

	row2OpenArrow.innerText =  '</';
	row2CloseArrow.innerText =  '>';
	row2ElementTypeSpan.innerText = elem.localName;
	row2.appendChild(row2OpenArrow);
	row2.appendChild(row2ElementTypeSpan);
	row2.appendChild(row2CloseArrow);
	
	if (elem.children.length)
		wrapper.appendChild(row2);
	else
		row1.appendChild(row2);
	
	row1.addEventListener('click', (e) => {
		e.preventDefault();
		row1.classList.toggle('expanded')
	}, false);
	
	parentEl.appendChild(wrapper);
}
export {renderDOM};
