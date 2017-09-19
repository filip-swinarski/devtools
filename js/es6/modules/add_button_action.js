/* add_button_action.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

const addButtonAction = (applyBtn, cancelBtn, nameLabel, valueLabel, header) => {
	applyBtn.classList.remove('popup__apply--collapsed');
	cancelBtn.classList.remove('popup__cancel--collapsed');
	nameLabel.classList.remove('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--collapsed');
	applyBtn.classList.add('popup__apply--expanded');
	cancelBtn.classList.add('popup__cancel--expanded');
	nameLabel.classList.add('popup__add-label--expanded');
	valueLabel.classList.add('popup__add-label--expanded');
	header.classList.add('popup__header--expanded');
};

export {addButtonAction};

