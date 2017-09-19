/* cancel_button_action.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

const cancelButtonAction = (applyBtn, cancelBtn, valueLabel, nameLabel, header) => {

	const valueInput = valueLabel.querySelector('input');
	const nameInput = nameLabel.querySelector('input');

	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	header.classList.remove('popup__header--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	applyBtn.classList.add('popup__apply--collapsed');
	applyBtn.classList.remove('popup__apply--expanded');
	cancelBtn.classList.add('popup__cancel--collapsed');
	cancelBtn.classList.remove('popup__cancel--expanded');

};

export {cancelButtonAction};
