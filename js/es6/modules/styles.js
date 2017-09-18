/* styles.js, v. 0.1.0, 18.09.2017, @ filip-swinarski */

const rules = [];

/* base v. 0.1.6 01.04.2017 @ filip-swinarski */

rules.push(`.body {
	width: 100%;
	height: 100%;
}`);

rules.push(`.tools {
	font-size: 14px;
	font-family: 'Space Mono', monospace;
	background-color: #fff;
}`);

rules.push(`.tools__panel {
	position: relative;
}`);

/* inspector v. 0.1.6 21.04.2017 @ filip-swinarski */

rules.push(`.inspector__header {
	border: 1px solid #bcbcbc;
	padding: 10px;
	cursor: pointer;
}`);

rules.push(`.inspector__display {
	position: relative;
	overflow: auto;
}`);

rules.push(`.inspector__display > .inspector__exp {
	display: block;
}`);

rules.push(`.inspector__display--expanded {
	border-left: 1px solid #bcbcbc;
	border-right: 1px solid #bcbcbc;
	border-bottom: 1px solid #bcbcbc;
	height: 400px;
	transition: height .5s;
}`);

rules.push(`.inspector__display--collapsed {
	height: 0;
	transition: height .5s;
	padding: 0;
	margin: 0;
	border-left: 0 none transparent;
	border-right: 0 none transparent;
}`);

rules.push(`.inspector__row {
	white-space: nowrap; color: #444;
}`);

rules.push(`.inspector__row:hover::before {
	content: '';
	width: 100%;
	height: 20px;
	background-color: #efefef;
	position: absolute;
	left: 0;
	z-index: -1;
}`);

rules.push(`.inspector__row--opening {
	cursor: pointer;
}`);

rules.push(`.inspector__row--expanded ~ .inspector__exp {
	display: block;
}`);

rules.push(`.inspector__exp {
	display: none;
	margin-left: 20px;
}`);

rules.push(`.inspector__tag-open {
	position: relative;
}`);

rules.push(`.inspector__tag-open::after {
	content: '';
	display: none;
	border-left: 6px solid #bbb;
	border-top: 4px solid transparent;
	border-bottom: 4px solid transparent;
	position: absolute;
	top: 5px;
	left: -8px;
}`);

rules.push(`.inspector__tag-open--collapsed::after {
	display: block;
	transform: rotate(0);
	transition: transform .5s;
}`);

rules.push(`.inspector__tag-open--expanded::after {
	display: block;
	transform: rotate(90deg);
	transition: transform .5s;
}`);

rules.push(`.inspector__tag-close:last-child {
	padding-right: 10px;
}`);

rules.push(`.inspector__tag-name {
	color: #800080;
}`);

rules.push(`.inspector__attr-name {
	color: #000;
	padding-left: 5px;
}`);

rules.push(`.inspector__attr-value {
	color: #00f;
}`);

/* console v. 0.1.6 21.04.2017 @ filip-swinarski */

rules.push(`.console__header {
	border-left: 1px solid #bcbcbc;
	border-right: 1px solid #bcbcbc;
	padding: 10px;
	cursor: pointer;
}`);

rules.push(`.console__display {
	overflow: auto;
}`);

rules.push(`.console__display--expanded {
	border-left: 1px solid #bcbcbc;
	border-right: 1px solid #bcbcbc;
	border-top: 1px solid #bcbcbc;
	height: 400px;
	transition: height .5s;
}`);

rules.push(`.console__display--collapsed {
	height: 0;
	transition: height .5s;
	padding: 0;
	margin: 0;
	border-left: 0 none transparent;
	border-right: 0 none transparent;
}`);

rules.push(`.console__input {
	width: calc(100% - 2px);
	height: 30px;
	margin: 0;
	padding: 0;
	text-indent: 30px;
	border-bottom: 0 none transparent;
	border-top: 1px solid #bcbcbc;
}`);

rules.push(`.console__input--expanded {
	display: block;
	border-left: 1px solid #bcbcbc;
	border-right: 1px solid #bcbcbc;
	height: 30px;
}`);

rules.push(`.console__input--collapsed {
	display: none;
	padding: 0;
	margin: 0;
	border--left: 0 none transparent;
	border--right: 0 none transparent;
}`);

rules.push(`.console__prompt {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 30px;
	height: 30px;
}`);

rules.push(`.console__prompt::before {
	content: '>>';
	display: block;
	position: absolute;
	top: 3px;
	left: 5px;
	height: 10px;
	color: #acacac;
}`);

rules.push(`.console__prompt--expanded {
	display: block;
}`);

rules.push(`.console__prompt--collapsed {
	display: none;
}`);

rules.push(`.console__msg-i {
	color: #acacac;
	padding: 5px 5px 5px 25px;
}`);

rules.push(`.console__msg-r {
	color: #000;
	padding: 5px 5px 5px 25px;
}`);

rules.push(`.console__msg-r--err {
	color: #a93226;
	background-color: #fadbd8;
}`);

rules.push(`.console__msg-rprompt {
	width: 25px;
	position: relative;
	color: #acacac;
}`);

rules.push(`.console__msg-rprompt::before {
	content: '<=';
	display: block;
	position: absolute;
	left: -20px;
	top: 3px;
	font-size: 12px;
}`);

rules.push(`.console__msg-iprompt {
	width: 25px; position: relative;
}`);

rules.push(`.console__msg-iprompt::before {
	content: '>>';
	display: block;
	position: absolute;
	left: -20px;
	font-size: 12px;
}`);

rules.push(`.console__err-prompt {
	width: 25px;
	position: relative;
}`);

rules.push(`.console__err-prompt::before {
	content: 'x';
	display: block;
	position: absolute;
	left: -17px;
	top: 0;
	font-size: 12px;
}`);

rules.push(`.console__undefined {
	color: #adadad;
}`);

rules.push(`.console__number {
	color: #0000cc;
}`);

rules.push(`.console__string {
	color: #cc6600;
}`);

rules.push(`.console__boolean {
	color: #800000;
}`);

rules.push(`.console__null {
	color: #800000;
}`);

rules.push(`.console__key {
	color: #800000;
}`);

rules.push(`.console__key::after {
	content: ': ';
}`);

rules.push(`.console__index {
	display: none;
}`);

rules.push(`.console__value:not(:last-child)::after {
	content: ', ';
}`);

rules.push(`.console__array::after {
	content: ']';
}`);

rules.push(`.console__array::before {
	content: '[';
}`);

rules.push(`.console__object::after {
	content: '}';
}`);

rules.push(`.console__object::before {
	content: '{';
}`);

rules.push(`.console__f-name {
	color: #0099ff;
}`);

rules.push(`.console__f-key {
	color: #800000;
}`);

/* browser_info v. 0.1.2 15.04.2017 @ filip-swinarski */

rules.push(`.browser__header {
	border: 1px solid #bcbcbc;
	padding: 10px;
	cursor: pointer;
}`);

rules.push(`.browser__display {
	padding: 10px; overflow: hidden;
}`);

rules.push(`.browser__display--expanded {
	border-left: 1px solid #bcbcbc;
	border-right: 1px solid #bcbcbc;
	height: 400px;
	transition: height padding-top padding-bottom .5s;
}`);

rules.push(`.browser__display--collapsed {
	height: 0;
	transition: height pading-top padding-bottom .5s;
	padding-top: 0;
	padding-bottom: 0;
	border-left: 0 none transparent;
	border-right: 0 none transparent;
}`);

/* popup v. 0.1.2 05.05.2017 @ filip-swinarski */

rules.push(`.popup {
	position: fixed;
	background-color: #fff;
	border: 1px solid #bcbcbc;
	width: calc(100% - 20px);
	height: auto;
	top: 50%;
	transform: translate(0, -50%);
	padding-bottom: 10px;
}`);

rules.push(`.popup__close {
	position: absolute;
	top: 0;
	right: 0;
	background-color: #fff;
	border-bottom: 1px solid #bcbcbc;
	border-left: 1px solid #bcbcbc;
	padding: 2px 6px;
	cursor: pointer;
	font-size: 20px;
}`);

rules.push(`.popup__wrapper {
	height: calc(100vh - 54px);
	overflow-x: hidden;
	overflow-y: scroll;
	margin-top: 29px;
	position: relative;
}`);

rules.push(`.popup__header {
	padding: 10px;
	position: relative;
}`);

rules.push(`.popup__header--expanded {
	padding-bottom: 40px;
}`);

rules.push(`.popup__headline {
	display: block;
	padding-bottom: 5px;
}`);

rules.push(`.popup__add {
	position: absolute;
	-moz-appearance: none;
	background-color: transparent;
	box-shadow: none;
	border: 0 none transparent;
	padding: 0;
	right: 5px;
	top: 5px;
	font-size: 20px;
}`);

rules.push(`.popup__add-input {
	-moz-appearance: none;
	border: 1px solid #bcbcbc;
	position: absolute;
	right: 9px;
}`);

rules.push(`.popup__add-label--collapsed {
	display: none;
}`);

rules.push(`.popup__add-label--expanded {
	display: block;
	padding-top: 5px;
	padding-left: 10px;
	padding-bottom: 5px;
}`);

rules.push(`.popup__apply {
	position: absolute;
	right: 10px;
	top: 94px;
	border: 0 none transparent;
	background-color: #a93226;
	-moz-appearance: none;
	color: #fff;
	padding: 0 10px 4px;
}`);

rules.push(`.popup__apply--collapsed {
	display: none;
}`);

rules.push(`.popup__apply--expanded {
	display: inline-block;
}`);

rules.push(`.popup__cancel {
	position: absolute;
	right: 65px;
	top: 94px;
	border: 0 none transparent;
	background-color: #acacac;
	-moz-appearance: none;
	color: #444;
	padding: 0 10px 4px;
}`);

rules.push(`.popup__cancel--collapsed {
	display: none;
}`);

rules.push(`.popup__cancel--expanded {
	display: inline-block;
}`);

rules.push(`.popup__list {
	list-style: none;
	margin-top: 0;
	margin-bottom: 0;
	padding-left: 20px;
}`);

rules.push(`.popup__list-element {
	position: relative;
}`);

rules.push(`.popup__list-label {
	display: block;
}`);

rules.push(`.popup__list-separator {
	padding-right: 5px;
}`);

rules.push(`.popup__list-input {
	-moz-appearance: none; border: 1px solid #fff;
}`);

rules.push(`.popup__list-input:focus {
	border: 1px solid #bcbcbc;
}`);

rules.push(`.popup__list-btn {
	position: absolute;
	right: 10px;
	border: 0 none transparent;
	background-color: #a93226;
	-moz-appearance: none;
	top: 0;
	color: #fff;
	padding: 0 10px 4px;
}`);

rules.push(`.popup__list-btn--expanded {
	visibility: visible;
}`);

rules.push(`.popup__list-btn--collapsed {
	visibility: hidden;
}`);

export {rules};