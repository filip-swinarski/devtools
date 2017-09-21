/* highlight_box_action.js, v. 0.1.2, 21.09.2017, @ filip-swinarski */

const highlightBoxAction = (element, row) => {

	const regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	const regexp2 = new RegExp(/background-color: \#adf \!important/);
	const attrName = 'data-highlight';
	let backgroundColor = element.style.backgroundColor;

	if (element.style.cssText.match(regexp1)) {
		element.style.cssText = element.style.cssText.replace(regexp1, '');

		if (row.getAttribute(attrName) !== 'no-background')
			element.style.backgroundColor = row.getAttribute(attrName);
		else
			element.removeAttribute('style');

		row.removeAttribute(attrName);
	} else if (element.style.cssText.match(regexp2)) {
		element.style.cssText = element.style.cssText.replace(regexp2, '');

		if (row.getAttribute(attrName) !== 'no-background')
			element.style.backgroundColor = row.getAttribute('data-highlight');
		else
			element.removeAttribute('style');

		row.removeAttribute(attrName);
	} else {
		element.style.cssText += 'background-color: #adf !important';
		row.setAttribute(attrName, backgroundColor ? backgroundColor : 'no-background');
	}

};

export {highlightBoxAction};

