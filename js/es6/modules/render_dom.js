/* render_dom.js, v. 0.1.9, 19.09.2017, @ filip-swinarski */

import {domElementListen} from './dom_element_listen.js';

const renderDOM = (elem, parentEl, level) => {

    if (elem.id === 'dev_tools')
        return;

    const wrapper = document.createElement('div');
    const row1 = document.createElement('div');
    const row2 = elem.children.length ? document.createElement('div') : document.createElement('span');
    const row1ElementTypeSpan = document.createElement('span');
    const row1OpenArrow = document.createElement('span');
    const row1CloseArrow = document.createElement('span');
    const row2ElementTypeSpan = document.createElement('span');
    const row2OpenArrow = document.createElement('span');
    const row2CloseArrow = document.createElement('span');
    
    row1.classList.add('inspector__row');
    row1.classList.add('inspector__row--opening');
    row2.classList.add('inspector__row');
    row2.classList.add('inspector__row--closing');
    
    row1ElementTypeSpan.classList.add('inspector__tag-name');
    row2ElementTypeSpan.classList.add('inspector__tag-name'); 
    row1OpenArrow.classList.add('inspector__tag-open');
    row1CloseArrow.classList.add('inspector__tag-close');
    row2OpenArrow.classList.add('inspector__tag-open');
    row2CloseArrow.classList.add('inspector__tag-close');
    row1OpenArrow.innerText =  '<';
    row1CloseArrow.innerText =  '>';
    row1ElementTypeSpan.innerText = elem.localName;
    row1.appendChild(row1OpenArrow);
    row1.appendChild(row1ElementTypeSpan);
    
    if (elem.attributes.length) {
        [].slice.call(elem.attributes).forEach((attr) => {
                
            const attrNameSpan = document.createElement('span');
            const attrEqualSpan = document.createElement('span');
            const attrValueSpan = document.createElement('span');
            
            attrNameSpan.classList.add('inspector__attr-name');
            attrValueSpan.classList.add('inspector__attr-value');
            attrNameSpan.innerText = attr.localName;
            attrEqualSpan.innerText = '=';
            attrValueSpan.innerText = '"' + attr.value + '"';
            row1.appendChild(attrNameSpan);
            row1.appendChild(attrEqualSpan);
            row1.appendChild(attrValueSpan);
        });
    }	
    
    row1.appendChild(row1CloseArrow);
    wrapper.appendChild(row1);
    wrapper.classList.add('inspector__exp');
    
    if (elem.text && elem.text.length) {
            
        const textEl = document.createElement('div');
        
        textEl.classList.add('inspector__exp');
        textEl.innerText = elem.text.trim();
        wrapper.appendChild(textEl)

        if (level < 2) {
            row1.classList.add('inspector__row--expanded');
            row1OpenArrow.classList.add('inspector__tag-open--expanded');
        } else {
            row1.classList.add('inspector__row--collapsed');
            row1OpenArrow.classList.add('inspector__tag-open--collapsed');
        }

    }
    
    if (elem.children.length) {
        level += 1;
        [].slice.call(elem.children).forEach((el) => {
            renderDOM(el, wrapper, level);

            if (level < 2) {
                row1.classList.add('inspector__row--expanded');
                row1OpenArrow.classList.add('inspector__tag-open--expanded');
            } else {
                row1.classList.add('inspector__row--collapsed');
                row1OpenArrow.classList.add('inspector__tag-open--collapsed');
            }

        });
    }

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
    
	domElementListen(elem, row1, row1OpenArrow);
    parentEl.appendChild(wrapper);
}
export {renderDOM};
