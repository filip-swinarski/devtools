// render popup test

const assert = chai.assert;
const mockEl = document.createElement('div');
const devTools = document.getElementById('dev_tools');

let renderPopup = (element) => {

    let popup = document.createElement('div');
    let filteredAttributes = [].filter.call(element.attributes, attr => attr.name !== 'style');
    let inlineStyles = ''.split.call(element.attributes.style.value, '; ');
    let attributeList = [].map.call(filteredAttributes, attr => `<li>
        <span>${attr.name}</span><span>:</span><span> ${attr.value}</span>
    </li>`).join('');
    let inlineStyleList = [].map.call(inlineStyles, rule => `<li>${rule}</li>`).join('');
    let template = `<div class="popup__section popup__section--attributes">
        <div class="popup__headline">Attributes</div>
        <ul>
            ${attributeList}
        </ul>
    </div>
    <div class="popup__section popup__section--styles">
        <div class="popup__headline">Styles</div>
        <div class="popup__stylestype">Inline styles</div>
        <ul>
            ${inlineStyleList}
        </ul>
    </div>`;

    popup.classList.add('popup');
    popup.innerHTML = template;
    devTools.appendChild(popup);
};

mockEl.id = 'test';
mockEl.style = 'width: 20px; background-color: #f00;';
mockEl.className = 'test__test test_-test--test'
document.body.appendChild(mockEl);
renderPopup(mockEl);

describe('Render a popup window', () => {

    it('should render element', () => {
        let children = devTools.children;
        assert(children.length !== 0, 'did not render an element');
    });

    it('should render element should be a div', () => {
        let children = devTools.children;
        assert(children[0].localName === 'div', 'did not render a div');
    });

    it('should render element should have class "popup"', () => {
        let classList = devTools.children[0].classList;
        assert(classList[0] === 'popup', 'did not render a .popup');
    });

});

describe('Render a popup window content - attributes section', () => {

    let popup = devTools.children[0];

    it('should render content element', () => {
        let children = popup.children;
        assert(children[0].length !== 0, 'did not render any element');
    });

    it('should render .popup__section element', () => {
        let classList = popup.children[0].classList;
        assert(classList[0] === 'popup__section', 'did not render a .popup_-section');
    });

    it('should render .popup__section--attributes element', () => {
        let classList = popup.children[0].classList;
        assert(classList[1] === 'popup__section--attributes', 'did not render a .popup__section--attributes');
    });

});

describe('Render a list of element attributes', () => {

    let attributeSection = devTools.children[0].children[0];

    it('should render an element', () => {
        let children = attributeSection.children;
        assert(children.length !== 0, 'did not render any element');
    });

    it('should render a list', () => {
        let children = attributeSection.children;
        assert(children[1].localName === 'ul', 'did not render a list');
    });

    it('should render certain amount of attributes', () => {
        let numberOfAttributes = mockEl.attributes.length;
        let filteredAttributes = [].filter.call(mockEl.attributes, attr => attr.name !== 'style');
        let list = attributeSection.children[1].children;
        if (filteredAttributes.length)
            numberOfAttributes -= 1;
        assert(list.length === numberOfAttributes, 'different number of list elements');
    });

    it('should not render style attribute inside attribute section', () => {
        let list = attributeSection.children[1].children;
        let filteredElements = [].filter.call(list, el => el.children[0].innerText.match(/style/));
        assert(filteredElements.length === 0, 'rendered style attribute');
    });

});

describe('Render a popup window content - styles section', () => {

    let popup = devTools.children[0];

    it('should render content element', () => {
        let children = popup.children;
        assert(children[1].length !== 0, 'did not render any element');
    });

    it('should render .popup__section element', () => {
        let classList = popup.children[1].classList;
        assert(classList[0] === 'popup__section', 'did not render a .popup_-section');
    });

    it('should render .popup__section--attributes element', () => {
        let classList = popup.children[1].classList;
        assert(classList[1] === 'popup__section--styles', 'did not render a .popup__section--styles');
    });

});

describe('Render a list of element style rules', () => {

    let styleSection = devTools.children[0].children[0];

    it('should render an element', () => {
        let children = styleSection.children;
        assert(children.length !== 0, 'did not render any element');
    });

    it('should render a list', () => {
        let children = styleSection.children;
        assert(children[1].localName === 'ul', 'did not render a list');
    });


});
