/* highlight_box_action.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

const highlightBoxAction = (element, row) => {

	const regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	const regexp2 = new RegExp(/background-color: \#adf \!important/);

	if (element.style.cssText.match(regexp1)) {
		element.style.cssText = element.style.cssText.replace(regexp1, '');
		row.removeAttribute('data-highlight');
	} else if (element.style.cssText.match(regexp2)) {
		element.style.cssText = element.style.cssText.replace(regexp2, '');
		row.removeAttribute('data-highlight');
	} else {
		element.style.cssText += 'background-color: #adf !important';
		row.setAttribute('data-highlight', true);
	}

};

export {highlightBoxAction};

