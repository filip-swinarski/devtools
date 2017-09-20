/* add_button_action.js, v. 0.1.2, 20.09.2017, @ filip-swinarski */

const addButtonAction = (applyBtn, cancelBtn, nameLabel, valueLabel, header, prefix) => {
	applyBtn.classList.remove(`${prefix}__apply--collapsed`);
	cancelBtn.classList.remove(`${prefix}__cancel--collapsed`);
	nameLabel.classList.remove(`${prefix}__add-label--collapsed`);
	valueLabel.classList.remove(`${prefix}__add-label--collapsed`);
	applyBtn.classList.add(`${prefix}__apply--expanded`);
	cancelBtn.classList.add(`${prefix}__cancel--expanded`);
	nameLabel.classList.add(`${prefix}__add-label--expanded`);
	valueLabel.classList.add(`${prefix}__add-label--expanded`);
	header.classList.add(`${prefix}__header--expanded`);
};

export {addButtonAction};

