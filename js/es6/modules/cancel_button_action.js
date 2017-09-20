/* cancel_button_action.js, v. 0.1.1, 20.09.2017, @ filip-swinarski */

const cancelButtonAction = (applyBtn, cancelBtn, valueLabel, nameLabel, header, prefix) => {

	const valueInput = valueLabel.querySelector('input');
	const nameInput = nameLabel.querySelector('input');

	nameLabel.classList.add(`${prefix}__add-label--collapsed`);
	nameLabel.classList.remove(`${prefix}__add-label--expanded`);
	header.classList.remove(`${prefix}__header--expanded`);
	valueLabel.classList.add(`${prefix}__add-label--collapsed`);
	valueLabel.classList.remove(`${prefix}__add-label--expanded`);
	nameInput.value = '';
	valueInput.value = '';
	applyBtn.classList.add(`${prefix}__apply--collapsed`);
	applyBtn.classList.remove(`${prefix}__apply--expanded`);
	cancelBtn.classList.add(`${prefix}__cancel--collapsed`);
	cancelBtn.classList.remove(`${prefix}__cancel--expanded`);

};

export {cancelButtonAction};
