/* highlight_box_action.js, v. 0.1.0, 18.09.2017, @ filip-swinarski */

let highlightBoxAction = element => {

	if (element.style.cssText.match(/background-color: rgb\(170, 221, 255\) \!important/)) {
		element.style.cssText = 
			element.style.cssText.replace(/background-color: rgb\(170, 221, 255\) \!important/, '');
	} else if (element.style.cssText.match(/background-color: \#adf \!important/)) {
		element.style.cssText = 
			element.style.cssText.replace(/background-color: \#adf \!important/, '');
	} else {
		element.style.cssText += 'background-color: #adf !important';
	}

};

export {highlightBoxAction};

