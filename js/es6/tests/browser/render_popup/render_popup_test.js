// render popup test

const assert = chai.assert;
const mockEl = document.createElement('div');
const devTools = document.getElementById('dev_tools');

let renderPopup = (element) => {

    let popup = document.createElement('div');
    let attributeListWrapper = document.createElement('div');
    let styleListWrapper = document.createElement('div');
    let attributeList = document.createElement('ul');
    let styleList = document.createElement('ul');
    let closeBtn =  document.createElement('div');
    let attributeListHeader = document.createElement('div');
    let styleListHeader = document.createElement('div');
    let filteredAttributes = [].filter.call(element.attributes, attr => attr.name !== 'style');
    let inlineStyles = ''.split.call(element.attributes.style.value, '; ');

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
    devTools.appendChild(popup);
};

mockEl.id = 'test';
mockEl.style = 'width: 20px; background-color: #f00;';
mockEl.className = 'test__test test_-test--test'
document.body.appendChild(mockEl);
renderPopup(mockEl);

describe('Render a popup window', () => {

    let children = devTools.children;
    let classList = devTools.children[0].classList;

    it('should render element', () => {
        assert(children.length !== 0, 'did not render an element');
    });

    it('should render element should be a div', () => {
        assert(children[0].localName === 'div', 'did not render a div');
    });

    it('should render element should have class "popup"', () => {
        assert(classList[0] === 'popup', 'did not render a .popup');
    });

});

describe('Render a popup window content - attributes section', () => {

    let popup = document.querySelector('.popup');
    let section = popup.querySelectorAll('.popup__section')[0];
    let classList = section.classList;
    let children = popup.children;

    it('should render content element', () => {
        assert(children[0].length !== 0, 'did not render any element');
    });

    it('should render .popup__section element', () => {
        assert(classList[0] === 'popup__section', 'did not render a .popup_-section');
    });

    it('should render .popup__section--attributes element', () => {
        assert(classList[1] === 'popup__section--attributes', 'did not render a .popup__section--attributes');
    });

});

describe('Render a list of element attributes', () => {

    let popup = document.querySelector('.popup');
    let attributeSection = popup.querySelectorAll('.popup__section')[1];
    let classList = attributeSection.classList;
    let children = attributeSection.children;
    let numberOfAttributes = mockEl.attributes.length;
    let filteredAttributes = [].filter.call(mockEl.attributes, attr => attr.name !== 'style');
    let attributeList = attributeSection.children[1].children;
    let attributeListChildren = attributeSection.children[1].children;
    let filteredElements = [].filter.call(attributeListChildren, el => el.children[0].innerText.match(/style/));

    it('should render an element', () => {
        assert(children.length !== 0, 'did not render any element');
    });

    it('should render a list', () => {
        assert(children[1].localName === 'ul', 'did not render a list');
    });

    it('should render certain amount of attributes', () => {
        if (filteredAttributes.length)
            numberOfAttributes -= 1;
        assert(attributeList.length === numberOfAttributes, 'different number of list elements');
    });

    it('should not render style attribute inside attribute section', () => {
        assert(filteredElements.length === 0, 'rendered style attribute');
    });

});

describe('Render a popup window content - styles section', () => {

    let popup = document.querySelector('.popup');
    let section = popup.querySelectorAll('.popup__section')[1];
    let classList = section.classList;
    let children = popup.children;

    it('should render content element', () => {
        assert(children[1].length !== 0, 'did not render any element');
    });

    it('should render .popup__section element', () => {
        assert(classList[0] === 'popup__section', 'did not render a .popup_-section');
    });

    it('should render .popup__section--attributes element', () => {
        assert(classList[1] === 'popup__section--styles', 'did not render a .popup__section--styles');
    });

});

describe('Render a list of element style rules', () => {

    let popup = document.querySelector('.popup');
    let styleSection = popup.querySelectorAll('.popup__section')[1];
    let children = styleSection.children;

    it('should render an element', () => {
        assert(children.length !== 0, 'did not render any element');
    });

    it('should render a list', () => {
        assert(children[1].localName === 'ul', 'did not render a list');
    });

});

describe('Render close button', () => {
    
    let popup = document.querySelector('.popup');
    let closeBtn = popup.querySelector('.popup__close');
    let classList = closeBtn.classList;

    it('should render an element', () => {
        assert(closeBtn.length !== 0, 'did not render any element');
    });

    it('should render a div', () => {
        assert(closeBtn.localName === 'div', 'did not render a list');
    });

    it('should render .popup__close element', () => {
        assert(classList[0] === 'popup__close', 'did not render a .popup__close');
    });

});
