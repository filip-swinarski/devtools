/* find_element_index.js, v. 0.1.0, 29.09.2017, @ filip-swinarski */

const findElementIndex = (element) => {

	const elements = document.querySelectorAll('*')
	const siteElements = [];

	for (let i = 0; i <= elements.length; i++) {
		
		if (elements[i].id === 'dev_tools')
			break;
		
		siteElements.push(elements[i]);
	}

	return siteElements.indexOf(element)

};

export {findElementIndex};
