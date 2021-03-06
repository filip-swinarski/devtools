/* find_element_position.js, v. 0.1.1, 27.09.2017, @ filip-swinarski */

const findElementPosition = (x, y) => {

	let elements = document.querySelectorAll('body, body *');

    elements = Array.from(elements).filter(element => {

        const el = element.getBoundingClientRect();

        return x >= el.x && x <= el.x + el.width && y >= el.y
            && y <= el.y + el.height
            && !element.classList.contains('tools_overlay');
    });
    return elements[elements.length - 1];
};

export {findElementPosition};
