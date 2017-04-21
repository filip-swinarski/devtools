/* add_button_action.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

let addButtonAction = (btn, nameLabel, valueLabel) => {
	btn.classList.remove('popup__apply--collapsed');
	nameLabel.classList.remove('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--collapsed');
	btn.classList.add('popup__apply--expanded');
	nameLabel.classList.add('popup__add-label--expanded');
	valueLabel.classList.add('popup__add-label--expanded');
};

export {addButtonAction};

