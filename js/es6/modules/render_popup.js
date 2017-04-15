/* render_popup.js, v. 0.1.1, 15.04.2017, @ filip-swinarski */

let renderPopup = (element, row) => {

    let container = document.querySelector('#dev_tools');
    let popup = document.createElement('div');
    let attributeListWrapper = document.createElement('div');
    let styleListWrapper = document.createElement('div');
    let attributeList = document.createElement('ul');
    let styleList = document.createElement('ul');
    let closeBtn =  document.createElement('div');
    let attributeListHeader = document.createElement('div');
    let styleListHeader = document.createElement('div');
    let filteredAttributes = [].filter.call(element.attributes, attr => attr.name !== 'style');
    let inlineStyles = [];
    let addAttrBtn = document.createElement('button');
    let addAttrApplyBtn = document.createElement('button');
    let attrNameInput = document.createElement('input');
    let attrValueInput = document.createElement('input');
    let attrNameInputLabel = document.createElement('label');
    let attrValueInputLabel = document.createElement('label');
    let addStyleBtn = document.createElement('button');
    let addStyleApplyBtn = document.createElement('button');
    let styleNameInput = document.createElement('input');
    let styleValueInput = document.createElement('input');
    let styleNameInputLabel = document.createElement('label');
    let styleValueInputLabel = document.createElement('label');

    let renderAttrInput = (el, display, row, name, value) => {
       
        let input = document.createElement('input');
        let label = document.createElement('label');
        let separator = document.createElement('span');
        let applyBtn = document.createElement('button');
        let listElement = document.createElement('li');
       
        input.type = 'text';
        input.value = value;
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

                if (display.id == 'attr_list')
                    el.attributes[name].value = input.value;

                if (display.id == 'style_list')
                    el.style[name] = input.value.replace(';', '');

                let rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
                let rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

                [].forEach.call(rowAttrNameElems, (attrNameEl, i) => {
                    
                    if (attrNameEl.innerText === name) {
                        rowAttrValueElems[i].innerText = input.value;
                        attrNameEl.innerText = name;
                    }

                });
            }

        }, false);

        input.addEventListener('focus', (e) => {
            applyBtn.classList.add('popup__list-btn--expanded');
            applyBtn.classList.remove('popup__list-btn--collapsed');
        });

        applyBtn.addEventListener('click', (e) => {
       
            if (display.id == 'attr_list')
                el.attributes[name].value = input.value;

            if (display.id == 'style_list')
                el.style[name] = input.value.replace(';', '');

            let rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
            let rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

            applyBtn.classList.remove('popup__list-btn--expanded');
            applyBtn.classList.add('popup__list-btn--collapsed');
            [].forEach.call(rowAttrNameElems, (attrNameEl, i) => {
                
                if (attrNameEl.innerText === name) {
                    rowAttrValueElems[i].innerText = input.value;
                    attrNameEl.innerText = name;
                }

            });

        }, false);
    };

    styleList.id = 'style_list';
    attributeList.id = 'attr_list';
    popup.classList.add('popup');
    attributeListWrapper.classList.add('popup__section');
    attributeListWrapper.classList.add('popup__section--attributes');
    styleListWrapper.classList.add('popup__section');
    styleListWrapper.classList.add('popup__section--styles');
    closeBtn.classList.add('popup__close');
    attributeListHeader.innerHTML = '<span class="popup__headline">Attributes</span>';
    styleListHeader.innerHTML = '<span class="popup__headline">Inline styles</span>';
    closeBtn.innerHTML = 'x';

    addAttrBtn.innerText = '+';
    addAttrBtn.classList.add("popup__add");
    addAttrApplyBtn.innerText = 'Apply';
    attrNameInputLabel.innerText = 'attribute name ';
    attrValueInputLabel.innerText = 'attribute value ';
    addAttrApplyBtn.classList.add('popup__apply');
    attrNameInput.type = 'text';
    attrNameInput.classList.add('popup__add-input');
    attrValueInput.type = 'text';
    attrValueInput.classList.add('popup__add-input');
    addAttrApplyBtn.classList.add('popup__apply--collapsed');
    attrNameInputLabel.classList.add('popup__add-label--collapsed');
    attrValueInputLabel.classList.add('popup__add-label--collapsed');
    attributeListHeader.appendChild(addAttrBtn);
    attributeListHeader.appendChild(addAttrApplyBtn);
    attrValueInputLabel.appendChild(attrValueInput);
    attrNameInputLabel.appendChild(attrNameInput);
    attributeListHeader.appendChild(attrNameInputLabel);
    attributeListHeader.appendChild(attrValueInputLabel);

    addStyleBtn.innerText = '+';
    addStyleBtn.classList.add('popup__add');
    addStyleApplyBtn.innerText = 'Apply';
    addStyleApplyBtn.classList.add('popup__apply');
    styleNameInputLabel.innerText = 'property name ';
    styleValueInputLabel.innerText = 'property value ';
    styleNameInput.type = 'text';
    styleNameInput.classList.add('popup__add-input');
    styleValueInput.type = 'text';
    styleValueInput.classList.add('popup__add-input');
    addStyleApplyBtn.classList.add('popup__apply--collapsed');
    styleNameInputLabel.classList.add('popup__add-label--collapsed');
    styleValueInputLabel.classList.add('popup__add-label--collapsed');
    styleListHeader.appendChild(addStyleBtn);
    styleListHeader.appendChild(addStyleApplyBtn);
    styleNameInputLabel.appendChild(styleNameInput);
    styleValueInputLabel.appendChild(styleValueInput);
    styleListHeader.appendChild(styleNameInputLabel);
    styleListHeader.appendChild(styleValueInputLabel);

    if (element.attributes && element.attributes.style)
        inlineStyles = ''.split.call(element.attributes.style.value, '; ');

    for (let attr in filteredAttributes) {
        
        let name = filteredAttributes[attr].name;
        let value = filteredAttributes[attr].value;

        renderAttrInput(element, attributeList, row, name, value);
    }

    for (let rule in inlineStyles) {
    
        let name = inlineStyles[rule].split(': ')[0];
        let value = inlineStyles[rule].split(': ')[1];

        renderAttrInput(element, styleList, row, name, value);
    }

    closeBtn.addEventListener('click', () => {
        popup.remove();
    }, false);

    addAttrBtn.addEventListener('click', (e) => {
        addAttrApplyBtn.classList.remove('popup__apply--collapsed');
        attrNameInputLabel.classList.remove('popup__add-label--collapsed');
        attrValueInputLabel.classList.remove('popup__add-label--collapsed');
        addAttrApplyBtn.classList.add('popup__apply--expanded');
        attrNameInputLabel.classList.add('popup__add-label--expanded');
        attrValueInputLabel.classList.add('popup__add-label--expanded');
    }, false);

    addStyleBtn.addEventListener('click', (e) => {
        addStyleApplyBtn.classList.remove('popup__apply--collapsed');
        styleNameInputLabel.classList.remove('popup__add-label--collapsed');
        styleValueInputLabel.classList.remove('popup__add-label--collapsed');
        addStyleApplyBtn.classList.add('popup__apply--expanded');
        styleNameInputLabel.classList.add('popup__add-label--expanded');
        styleValueInputLabel.classList.add('popup__add-label--expanded');
    }, false);

    addAttrApplyBtn.addEventListener('click', () => {
       
        let value = attrValueInput.value;
        let name = attrNameInput.value;
       
        element.setAttribute(name, value);
        filteredAttributes = [].filter.call(element.attributes, attr => attr.name !== 'style');
        attributeList.innerHTML = '';
        attrNameInputLabel.classList.add('popup__add-label--collapsed');
        attrNameInputLabel.classList.remove('popup__add-label--expanded');
        attrValueInputLabel.classList.add('popup__add-label--collapsed');
        attrValueInputLabel.classList.remove('popup__add-label--expanded');
        attrNameInput.value = '';
        attrValueInput.value = '';
        addAttrApplyBtn.classList.add('popup__apply--collapsed');
        addAttrApplyBtn.classList.remove('popup__apply--expanded');
        [].forEach.call(filteredAttributes, (attr) => {
            renderAttrInput(element, attributeList, row, attr.name, attr.value);
        });
    }, false);

    addStyleApplyBtn.addEventListener('click', () => {
       
        let value = styleValueInput.value;
        let name = styleNameInput.value;
        
        inlineStyles.push(`${name}: ${value};`);
        element.style[name] = value;
        styleList.innerHTML = '';
        styleNameInputLabel.classList.add('popup__add-label--collapsed');
        styleNameInputLabel.classList.remove('popup__add-label--expanded');
        styleValueInputLabel.classList.add('popup__add-label--collapsed');
        styleValueInputLabel.classList.remove('popup__add-label--expanded');
        styleNameInput.value = '';
        styleValueInput.value = '';
        addStyleApplyBtn.classList.add('popup__apply--collapsed');
        addStyleApplyBtn.classList.remove('popup__apply--expanded');
        [].forEach.call(inlineStyles, (rule) => {
            renderAttrInput(element, styleList, row, rule.split(': ')[0], rule.split(': ')[1]);
        });
    }, false);

    attributeListHeader.classList.add('popup__header');
    styleListHeader.classList.add('popup__header');
    attributeList.classList.add('popup__list');
    styleList.classList.add('popup__list');
    attributeListWrapper.appendChild(attributeListHeader);
    attributeListWrapper.appendChild(attributeList);
    styleListWrapper.appendChild(styleListHeader);
    styleListWrapper.appendChild(styleList);
    popup.appendChild(closeBtn);
    popup.appendChild(attributeListWrapper);
    popup.appendChild(styleListWrapper);
    container.appendChild(popup);
};

export {renderPopup};
