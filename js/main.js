(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _render_inspector = require('./modules/render_inspector.js');

var _load_styles = require('./modules/load_styles.js');

var _render_console = require('./modules/render_console.js');

var _console_listen = require('./modules/console_listen.js');

var _dt_console_api = require('./modules/dt_console_api.js');

var DTConsole = _interopRequireWildcard(_dt_console_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var body = document.body; /* main.js 0.1.0 27.03.2017 @ filip swinarski */

(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body);
(0, _render_console.renderConsole)(body);
// consoleListen();

window.DTConsole = DTConsole;

},{"./modules/console_listen.js":2,"./modules/dt_console_api.js":4,"./modules/load_styles.js":5,"./modules/render_console.js":6,"./modules/render_inspector.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.consoleListen = undefined;

var _render_console = require('./render_console.js');

var consoleListen = function consoleListen() {

	window.addEventListener('error', function (error) {

		var row = document.createElement('div');
		var errorMessage = document.createElement('span');
		var errorSource = document.createElement('span');
		var errorLineNo = document.createElement('span');
		var errorColumnNo = document.createElement('span');

		row.classList.add('console-row');
		errorMessage.classList.add('console-row');
		errorSource.classList.add('console-source');
		errorLineNo.classList.add('console-lineno');
		errorColumnNo.classList.add('console-columnno');

		errorMessage.innerHTML += error.message;
		errorSource.innerHTML += error.filename;
		errorLineNo.innerHTML += error.lineno;
		errorColumnNo.innerHTML += error.columnno;

		row.appendChild(errorMessage);
		row.appendChild(errorSource);
		row.appendChild(errorLineNo);
		row.appendChild(errorColumnNo);
		_render_console.consoleDisplay.appendChild(row);
	}, false);

	_render_console.consoleDisplay.addEventListener('log', function (e) {

		var row = document.createElement('div');
		var logMessage = document.createElement('span');

		logMessage.innerHTML += e.detail;

		row.classList.add('console-row');
		logMessage.classList.add('console-message');

		row.appendChild(logMessage);
		_render_console.consoleDisplay.appendChild(row);
	}, false);
}; /* console_listen.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

exports.consoleListen = consoleListen;

},{"./render_console.js":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.consoleLog = undefined;

var _render_console = require('./render_console.js');

var consoleLog = function consoleLog(msg) {

	var log = new CustomEvent('log', { detail: msg });

	_render_console.consoleDisplay.dispatchEvent(log);
}; /* console_log.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

exports.consoleLog = consoleLog;

},{"./render_console.js":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.log = undefined;

var _console_log = require('./console_log.js');

var log = function log(msg) {
	(0, _console_log.consoleLog)(msg);
}; /* dt_console_api.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

exports.log = log;

},{"./console_log.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* load _styles.js v. 0.1.0, 28.03.2017, @ filip-swinarski */

var loadStyles = function loadStyles() {

	var styles = document.createElement('link');

	styles.rel = 'stylesheet';
	styles.type = 'text/css';
	styles.media = 'screen';
	styles.href = './css/main.css';
	document.getElementsByTagName('head')[0].appendChild(styles);
};

exports.loadStyles = loadStyles;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var consoleDisplay = document.createElement('div'); /* render_console.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

consoleDisplay.classList.add('display');
consoleDisplay.id = 'console_display';

var renderConsole = function renderConsole(body) {

	body.appendChild(consoleDisplay);
	(0, _console_listen.consoleListen)();
};

exports.renderConsole = renderConsole;
exports.consoleDisplay = consoleDisplay;

},{"./console_listen":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_dom.js, v. 0.1.3, 28.03.2017, @ filip-swinarski */

var renderDOM = function renderDOM(elem, parentEl, level) {

	if (elem.id === 'inspector_display') return;

	var wrapper = document.createElement('div');
	var row1 = document.createElement('div');
	var row2 = elem.children.length ? document.createElement('div') : document.createElement('span');

	wrapper.style.marginLeft = '20px';
	row1.classList.add('row');
	row1.classList.add('opening');

	row2.classList.add('row');
	row2.classList.add('closing');

	var row1ElementTypeSpan = document.createElement('span');
	var row1OpenArrow = document.createElement('span');
	var row1CloseArrow = document.createElement('span');
	var row2ElementTypeSpan = document.createElement('span');
	var row2OpenArrow = document.createElement('span');
	var row2CloseArrow = document.createElement('span');

	row1ElementTypeSpan.classList.add('tag-name');
	row2ElementTypeSpan.classList.add('tag-name');
	row1OpenArrow.innerText = '<';
	row1CloseArrow.innerText = '>';
	row1ElementTypeSpan.innerText = elem.localName;
	row1.appendChild(row1OpenArrow);
	row1.appendChild(row1ElementTypeSpan);

	if (elem.attributes.length) {
		[].slice.call(elem.attributes).forEach(function (attr) {

			var attrNameSpan = document.createElement('span');
			var attrEqualSpan = document.createElement('span');
			var attrValueSpan = document.createElement('span');

			attrNameSpan.classList.add('attr-name');
			attrValueSpan.classList.add('attr-value');
			attrNameSpan.innerText = ' ' + attr.localName;
			attrEqualSpan.innerText = '=';
			attrValueSpan.innerText = '"' + attr.value + '"';
			row1.appendChild(attrNameSpan);
			row1.appendChild(attrEqualSpan);
			row1.appendChild(attrValueSpan);
		});
	}

	row1.appendChild(row1CloseArrow);
	wrapper.appendChild(row1);
	wrapper.classList.add('exp');

	if (elem.text && elem.text.length) {

		var textEl = document.createElement('div');

		textEl.style.marginLeft = '20px';
		textEl.classList.add('exp');
		textEl.innerText = elem.text.trim();
		wrapper.appendChild(textEl);

		if (level < 2) row1.classList.add('expanded');else row1.classList.add('collapsed');
	}

	if (elem.children.length) level += 1;
	[].slice.call(elem.children).forEach(function (el) {
		renderDOM(el, wrapper, level);

		if (level < 2) row1.classList.add('expanded');else row1.classList.add('collapsed');
	});

	row2OpenArrow.innerText = '</';
	row2CloseArrow.innerText = '>';
	row2ElementTypeSpan.innerText = elem.localName;
	row2.appendChild(row2OpenArrow);
	row2.appendChild(row2ElementTypeSpan);
	row2.appendChild(row2CloseArrow);

	if (elem.children.length || elem.text && elem.text.length) wrapper.appendChild(row2);else row1.appendChild(row2);

	row1.addEventListener('click', function (e) {
		e.preventDefault();
		row1.classList.toggle('expanded');
		row1.classList.toggle('collapsed');
	}, false);

	parentEl.appendChild(wrapper);
};
exports.renderDOM = renderDOM;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var renderInspector = function renderInspector(body) {

	var inspectorDisplay = document.createElement('div');
	var level = 0;

	inspectorDisplay.id = 'inspector_display';
	inspectorDisplay.classList.add('display');
	body.appendChild(inspectorDisplay);
	(0, _render_dom.renderDOM)(body, inspectorDisplay, level);
}; /* render_inspector.js, v. 0.1.2, 28.03.2017, @ filip-swinarski */

exports.renderInspector = renderInspector;

},{"./render_dom.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGxvYWRfc3R5bGVzLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2luc3BlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBQVksUzs7OztBQUVaLElBQU0sT0FBTyxTQUFTLElBQXRCLEMsQ0FSQTs7QUFVQTtBQUNBLHVDQUFnQixJQUFoQjtBQUNBLG1DQUFjLElBQWQ7QUFDQTs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsU0FBbkI7Ozs7Ozs7Ozs7QUNiQTs7QUFFQSxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixHQUFNOztBQUV6QixRQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQUMsS0FBRCxFQUFXOztBQUUzQyxNQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxNQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQW5CO0FBQ0EsTUFBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFsQjtBQUNBLE1BQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbEI7QUFDQSxNQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7O0FBRUEsTUFBSSxTQUFKLENB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U0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXpCO0FBQ0EsS0FBSSxRQUFRLENBQVo7O0FBRUEsa0JBQWlCLEVBQWpCLEdBQXNCLG1CQUF0QjtBQUNBLGtCQUFpQixTQUFqQixDQUEyQixHQUEzQixDQUErQixTQUEvQjtBQUNBLE1BQUssV0FBTCxDQUFpQixnQkFBakI7QUFDQSw0QkFBVSxJQUFWLEVBQWdCLGdCQUFoQixFQUFrQyxLQUFsQztBQUVBLENBVkQsQyxDQUpBOztRQWdCUSxlLEdBQUEsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS4wIDI3LjAzLjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7bG9hZFN0eWxlc30gZnJvbSAnLi9tb2R1bGVzL2xvYWRfc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzJztcbmltcG9ydCAqIGFzIERUQ29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHkpO1xucmVuZGVyQ29uc29sZShib2R5KTtcbi8vIGNvbnNvbGVMaXN0ZW4oKTtcblxud2luZG93LkRUQ29uc29sZSA9IERUQ29uc29sZTtcbiIsIi8qIGNvbnNvbGVfbGlzdGVuLmpzLCB2LiAwLjEuMCwgMjguMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTGlzdGVuID0gKCkgPT4ge1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXG5cdFx0bGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0bGV0IGVycm9yU291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGxldCBlcnJvckxpbmVObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRsZXQgZXJyb3JDb2x1bW5ObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuXHRcdHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlLXJvdycpO1xuXHRcdGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlLXJvdycpO1xuXHRcdGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUtc291cmNlJyk7XG5cdFx0ZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZS1saW5lbm8nKTtcblx0XHRlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUtY29sdW1ubm8nKTtcblxuXHRcdGVycm9yTWVzc2FnZS5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcblx0XHRlcnJvclNvdXJjZS5pbm5lckhUTUwgKz0gZXJyb3IuZmlsZW5hbWU7XG5cdFx0ZXJyb3JMaW5lTm8uaW5uZXJIVE1MICs9IGVycm9yLmxpbmVubztcblx0XHRlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuXHRcdHJvdy5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuXHRcdHJvdy5hcHBlbmRDaGlsZChlcnJvclNvdXJjZSk7XG5cdFx0cm93LmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcblx0XHRyb3cuYXBwZW5kQ2hpbGQoZXJyb3JDb2x1bW5Obyk7XG5cdFx0Y29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcblx0XG5cdH0sIGZhbHNlKTtcblxuXHRjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG5cdFx0bGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCBsb2dNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5cdFx0bG9nTWVzc2FnZS5pbm5lckhUTUwgKz0gZS5kZXRhaWw7XG5cblx0XHRyb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZS1yb3cnKTtcblx0XHRsb2dNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUtbWVzc2FnZScpO1xuXG5cdFx0cm93LmFwcGVuZENoaWxkKGxvZ01lc3NhZ2UpO1xuXHRcdGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG5cblx0fSwgZmFsc2UpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxpc3Rlbn07XG4iLCIvKiBjb25zb2xlX2xvZy5qcywgdi4gMC4xLjAsIDI4LjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5sZXQgY29uc29sZUxvZyA9IChtc2cpID0+IHtcblxuXHRsZXQgbG9nID0gbmV3IEN1c3RvbUV2ZW50KCdsb2cnLCB7ZGV0YWlsOiBtc2d9KTtcblxuXHRjb25zb2xlRGlzcGxheS5kaXNwYXRjaEV2ZW50KGxvZyk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTG9nfTtcbiIsIi8qIGR0X2NvbnNvbGVfYXBpLmpzLCB2LiAwLjEuMCwgMjguMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTG9nfSBmcm9tICcuL2NvbnNvbGVfbG9nLmpzJztcblxubGV0IGxvZyA9IChtc2cpID0+IHtcblx0Y29uc29sZUxvZyhtc2cpO1xufVxuXG5leHBvcnQge2xvZ307XG4iLCIvKiBsb2FkIF9zdHlsZXMuanMgdi4gMC4xLjAsIDI4LjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBsb2FkU3R5bGVzID0gKCkgPT4ge1xuXG5cdGxldCBzdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cblx0c3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0Jztcblx0c3R5bGVzLnR5cGUgPSAndGV4dC9jc3MnO1xuXHRzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcblx0c3R5bGVzLmhyZWYgPSAnLi9jc3MvbWFpbi5jc3MnO1xuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGUuanMsIHYuIDAuMS4wLCAyOC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vY29uc29sZV9saXN0ZW4nO1xuXG5jb25zdCBjb25zb2xlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5jb25zb2xlRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuXG5sZXQgcmVuZGVyQ29uc29sZSA9IChib2R5KSA9PiB7XG5cblx0Ym9keS5hcHBlbmRDaGlsZChjb25zb2xlRGlzcGxheSk7XG5cdGNvbnNvbGVMaXN0ZW4oKTtcblxufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGV9O1xuZXhwb3J0IHtjb25zb2xlRGlzcGxheX07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuMywgMjguMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuXHRpZiAoZWxlbS5pZCA9PT0gJ2luc3BlY3Rvcl9kaXNwbGF5Jylcblx0XHRyZXR1cm47XG5cblx0bGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IHJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IHJvdzIgPSBlbGVtLmNoaWxkcmVuLmxlbmd0aCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcblx0d3JhcHBlci5zdHlsZS5tYXJnaW5MZWZ0ID0gJzIwcHgnO1xuXHRyb3cxLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuXHRyb3cxLmNsYXNzTGlzdC5hZGQoJ29wZW5pbmcnKTtcblxuXHRyb3cyLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuXHRyb3cyLmNsYXNzTGlzdC5hZGQoJ2Nsb3NpbmcnKTtcblx0XG5cdGxldCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRsZXQgcm93MU9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0bGV0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRsZXQgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0bGV0IHJvdzJPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGxldCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XG5cdHJvdzFFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgndGFnLW5hbWUnKTtcblx0cm93MkVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCd0YWctbmFtZScpOyBcblx0cm93MU9wZW5BcnJvdy5pbm5lclRleHQgPSAgJzwnO1xuXHRyb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuXHRyb3cxRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuXHRyb3cxLmFwcGVuZENoaWxkKHJvdzFPcGVuQXJyb3cpO1xuXHRyb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuXHRcblx0aWYgKGVsZW0uYXR0cmlidXRlcy5sZW5ndGgpIHtcblx0XHRbXS5zbGljZS5jYWxsKGVsZW0uYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuXHRcdFx0XG5cdFx0XHRsZXQgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0bGV0IGF0dHJFcXVhbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRsZXQgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdFxuXHRcdFx0YXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2F0dHItbmFtZScpO1xuXHRcdFx0YXR0clZhbHVlU3Bhbi5jbGFzc0xpc3QuYWRkKCdhdHRyLXZhbHVlJyk7XG5cdFx0XHRhdHRyTmFtZVNwYW4uaW5uZXJUZXh0ID0gJyAnICsgYXR0ci5sb2NhbE5hbWU7XG5cdFx0XHRhdHRyRXF1YWxTcGFuLmlubmVyVGV4dCA9ICc9Jztcblx0XHRcdGF0dHJWYWx1ZVNwYW4uaW5uZXJUZXh0ID0gJ1wiJyArIGF0dHIudmFsdWUgKyAnXCInO1xuXHRcdFx0cm93MS5hcHBlbmRDaGlsZChhdHRyTmFtZVNwYW4pO1xuXHRcdFx0cm93MS5hcHBlbmRDaGlsZChhdHRyRXF1YWxTcGFuKTtcblx0XHRcdHJvdzEuYXBwZW5kQ2hpbGQoYXR0clZhbHVlU3Bhbik7XG5cdFx0fSk7XG5cdH1cdFxuXHRcblx0cm93MS5hcHBlbmRDaGlsZChyb3cxQ2xvc2VBcnJvdyk7XG5cdHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93MSk7XG5cdHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZXhwJyk7XG5cdFxuXHRpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcblx0XHRcblx0XHRsZXQgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XG5cdFx0dGV4dEVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnMjBweCc7XG5cdFx0dGV4dEVsLmNsYXNzTGlzdC5hZGQoJ2V4cCcpO1xuXHRcdHRleHRFbC5pbm5lclRleHQgPSBlbGVtLnRleHQudHJpbSgpO1xuXHRcdHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG5cdFx0aWYgKGxldmVsIDwgMilcblx0XHRcdHJvdzEuY2xhc3NMaXN0LmFkZCgnZXhwYW5kZWQnKTtcblx0XHRlbHNlXG5cdFx0XHRyb3cxLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuXHR9XG5cdFxuXHRpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpXG5cdFx0bGV2ZWwgKz0gMTtcblx0XHRbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRyZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuXHRcdFx0aWYgKGxldmVsIDwgMilcblx0XHRcdFx0cm93MS5jbGFzc0xpc3QuYWRkKCdleHBhbmRlZCcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyb3cxLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuXHRcdH0pO1xuXG5cdHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG5cdHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG5cdHJvdzJFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG5cdHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG5cdHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG5cdHJvdzIuYXBwZW5kQ2hpbGQocm93MkNsb3NlQXJyb3cpO1xuXHRcblx0aWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuXHRcdHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG5cdGVsc2Vcblx0XHRyb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuXHRcblx0cm93MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHJvdzEuY2xhc3NMaXN0LnRvZ2dsZSgnZXhwYW5kZWQnKVxuXHRcdHJvdzEuY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2VkJylcblx0fSwgZmFsc2UpO1xuXHRcblx0cGFyZW50RWwuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG59XG5leHBvcnQge3JlbmRlckRPTX07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuMiwgMjguMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5cbmxldCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSkgPT4ge1xuXG5cdGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IGxldmVsID0gMDtcblxuXHRpbnNwZWN0b3JEaXNwbGF5LmlkID0gJ2luc3BlY3Rvcl9kaXNwbGF5Jztcblx0aW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cdGJvZHkuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yRGlzcGxheSk7XG5cdHJlbmRlckRPTShib2R5LCBpbnNwZWN0b3JEaXNwbGF5LCBsZXZlbCk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yfTtcbiJdfQ==
