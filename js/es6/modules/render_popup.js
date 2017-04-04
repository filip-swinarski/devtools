/* render_popup.js, v. 0.1.0, 04.04.2017, @ filip-swinarski */

let renderPopup = (element) => {

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

    if (element.attributes && element.attributes.style)
        inlineStyles = ''.split.call(element.attributes.style.value, '; ');

    for (let attr in filteredAttributes) {
        
        let listElement = document.createElement('li');
        let name = filteredAttributes[attr].name;
        let value = filteredAttributes[attr].value;

        listElement.innerHTML = `<span>${name}</span><span>:</span><span> ${value}</span>`;
        attributeList.appendChild(listElement);
    }

    for (let rule in inlineStyles) {
    
        let listElement = document.createElement('li');
        let property = inlineStyles[rule].split(': ')[0];
        let value = inlineStyles[rule].split(': ')[1];

        listElement.innerHTML = `<span>${property}</span><span>:</span><span> ${value}</span>`;
        styleList.appendChild(listElement);
    }

    popup.classList.add('popup');
    attributeListWrapper.classList.add('popup__section');
    attributeListWrapper.classList.add('popup__section--attributes');
    styleListWrapper.classList.add('popup__section');
    styleListWrapper.classList.add('popup__section--styles');
    closeBtn.classList.add('popup__close');
    attributeListHeader.innerHTML = 'Attributes';
    styleListHeader.innerHTML = 'Styles';
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', () => {
        popup.remove();
    }, false);

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
