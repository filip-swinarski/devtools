(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _load_styles = require('./modules/load_styles.js');

var _render_inspector = require('./modules/render_inspector.js');

var _render_console = require('./modules/render_console.js');

var _render_browser_info = require('./modules/render_browser_info.js');

var _console_listen = require('./modules/console_listen.js');

var _dt_console_api = require('./modules/dt_console_api.js');

var DTConsole = _interopRequireWildcard(_dt_console_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* main.js 0.1.1 30.03.2017 @ filip swinarski */

var body = document.body;
var container = document.createElement('div');

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body, container);
(0, _render_console.renderConsole)(container);
(0, _render_browser_info.renderBrowserInfo)(container);

window.DTConsole = DTConsole;

},{"./modules/console_listen.js":2,"./modules/dt_console_api.js":4,"./modules/load_styles.js":6,"./modules/render_browser_info.js":7,"./modules/render_console.js":8,"./modules/render_inspector.js":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleListen = undefined;

var _render_console = require('./render_console.js');

var _render_console_message = require('./render_console_message.js');

var _global_eval = require('./global_eval.js');

/* console_listen.js, v. 0.1.4, 31.03.2017, @ filip-swinarski */

var consoleListen = function consoleListen() {

    window.addEventListener('error', function (error) {

        var row = document.createElement('div');
        var errorMessage = document.createElement('div');
        var errorMessageMsg = document.createElement('span');
        var errorSource = document.createElement('span');
        var errorLineNo = document.createElement('span');
        var errorColumnNo = document.createElement('span');
        var errorPrompt = document.createElement('span');

        row.classList.add('console__row');
        errorPrompt.classList.add('console__err-prompt');
        errorMessage.classList.add('console__msg-r');
        errorMessage.classList.add('console__msg-r--err');
        errorMessageMsg.classList.add('console__err-msg');
        errorSource.classList.add('console__err-src');
        errorLineNo.classList.add('console__err-lineno');
        errorColumnNo.classList.add('console__err-columnno');

        errorMessageMsg.innerHTML += error.message;
        errorSource.innerHTML += error.filename;
        errorLineNo.innerHTML += error.lineno;
        errorColumnNo.innerHTML += error.columnno;

        errorMessage.appendChild(errorPrompt);
        errorMessage.appendChild(errorMessageMsg);
        errorMessage.appendChild(errorSource);
        errorMessage.appendChild(errorLineNo);
        errorMessage.appendChild(errorColumnNo);
        row.appendChild(errorMessage);
        _render_console.consoleDisplay.appendChild(row);
    }, false);

    _render_console.consoleDisplay.addEventListener('log', function (e) {

        var row = document.createElement('div');

        row.innerHTML = (0, _render_console_message.renderConsoleMessage)(e.detail);
        row.classList.add('console__row');
        _render_console.consoleDisplay.appendChild(row);
    }, false);

    _render_console.consoleInput.addEventListener('keypress', function (e) {

        if (e.keyCode === 13) {

            // let value = window.eval(consoleInput.value); // window.eval to work only in global scope
            var value = (0, _global_eval.globalEval)(_render_console.consoleInput.value);

            DTConsole.log(value, _render_console.consoleInput.value);
            _render_console.consoleInput.value = '';
        }
    });
};

exports.consoleListen = consoleListen;

},{"./global_eval.js":5,"./render_console.js":8,"./render_console_message.js":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleLog = undefined;

var _render_console = require('./render_console.js');

var consoleLog = function consoleLog(str, value) {

    var log = new CustomEvent('log', { detail: [str, value] });

    _render_console.consoleDisplay.dispatchEvent(log);
}; /* console_log.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

exports.consoleLog = consoleLog;

},{"./render_console.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;

var _console_log = require('./console_log.js');

var log = function log(value) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    (0, _console_log.consoleLog)(str, value);
}; /* dt_console_api.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

exports.log = log;

},{"./console_log.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* global_eval.js, v. 0.1.0, 31.03.2017, @ filip-swinarski */

// eval - runs block scope declarations via script injection
// otherwise standard eval used 
// - think if not use injection exclusively
// returns value
var globalEval = function globalEval(str) {

    'use strict'; // prevent creating local variables with standard eval

    if (str.startsWith('let ') || str.startsWith('const ')) {
        // code for script insertion

        var script = void 0;

        if (document.getElementById('dt_script')) {
            document.getElementById('dt_script').remove();
        }

        script = document.createElement('script');
        script.id = 'dt_script';
        script.innerText = str;
        document.head.appendChild(script);
        return undefined; // returns undefined when declaring block scoped variable
    } else {
        //standard eval
        return (1, eval)(str); // indirect call to access global scope
    }
};

exports.globalEval = globalEval;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* load _styles.js v. 0.1.0, 28.03.2017, @ filip-swinarski */

var loadStyles = function loadStyles() {

    var styles = document.createElement('link');
    var googleFont = document.createElement('link');

    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = './css/main.css';
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = 'https://googleapis.com/css?family=Spacs+Mono:400,700&amp;subset=latin-ext';
    document.getElementsByTagName('head')[0].appendChild(googleFont);
    document.getElementsByTagName('head')[0].appendChild(styles);
};

exports.loadStyles = loadStyles;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_browser_info.js, v. 0.1.0, 29.03.2017, @ filip-swinarski */

var renderBrowserInfo = function renderBrowserInfo(panel) {

    var browserInfoDisplay = document.createElement('div');
    var browserInfoContainer = document.createElement('div');

    browserInfoContainer.classList.add('browser');
    browserInfoContainer.classList.add('browser__panel');
    browserInfoDisplay.classList.add('browser__display');
    browserInfoDisplay.id = 'browser_display';
    browserInfoContainer.appendChild(browserInfoDisplay);
    panel.appendChild(browserInfoContainer);

    browserInfoDisplay.innerHTML += '<div>App name: ' + navigator.appCodeName + '</div>';
    browserInfoDisplay.innerHTML += '<div>App version: ' + navigator.appVersion + '</div>';
    browserInfoDisplay.innerHTML += '<div>Platform: ' + navigator.platform + '</div>';
    browserInfoDisplay.innerHTML += '<div>User agent: ' + navigator.userAgent + '</div>';
};

exports.renderBrowserInfo = renderBrowserInfo;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleInput = exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var consoleDisplay = document.createElement('div'); /* render_console.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

var consoleInput = document.createElement('input');
var consoleContainer = document.createElement('div');
var consoleInputPrompt = document.createElement('span');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.id = 'console_input';
consoleInput.type = 'text';
consoleInputPrompt.classList.add('console__prompt');

var renderConsole = function renderConsole(panel) {

    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    (0, _console_listen.consoleListen)();
};

exports.renderConsole = renderConsole;
exports.consoleDisplay = consoleDisplay;
exports.consoleInput = consoleInput;

},{"./console_listen":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_console_message.js, v. 0.1.0, 30.03.2017, @ filip-swinarski */

var renderConsoleMessage = function renderConsoleMessage(msgArray) {

    var html = "";

    if (msgArray[0]) html += "<div class=\"console__msg-i\"><span class=\"console__msg-iprompt\"></span>" + msgArray[0] + " </div>";

    html += "<div class=\"console__msg-r\"><span class=\"console__msg-rprompt\"></span>" + msgArray[1] + "</div>";

    return html;
};

exports.renderConsoleMessage = renderConsoleMessage;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_dom.js, v. 0.1.4, 29.03.2017, @ filip-swinarski */

var renderDOM = function renderDOM(elem, parentEl, level) {

    if (elem.id === 'inspector_display') return;

    var wrapper = document.createElement('div');
    var row1 = document.createElement('div');
    var row2 = elem.children.length ? document.createElement('div') : document.createElement('span');

    row1.classList.add('inspector__row');
    row1.classList.add('inspector__row--opening');
    row2.classList.add('inspector__row');
    row2.classList.add('inspector__row--closing');

    var row1ElementTypeSpan = document.createElement('span');
    var row1OpenArrow = document.createElement('span');
    var row1CloseArrow = document.createElement('span');
    var row2ElementTypeSpan = document.createElement('span');
    var row2OpenArrow = document.createElement('span');
    var row2CloseArrow = document.createElement('span');

    row1ElementTypeSpan.classList.add('inspector__tag-name');
    row2ElementTypeSpan.classList.add('inspector__tag-name');
    row1OpenArrow.classList.add('inspector__tag-open');
    row1CloseArrow.classList.add('inspector__tag-close');
    row2OpenArrow.classList.add('inspector__tag-open');
    row2CloseArrow.classList.add('inspector__tag-close');
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

            attrNameSpan.classList.add('inspector__attr-name');
            attrValueSpan.classList.add('inspector__attr-value');
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
    wrapper.classList.add('inspector__exp');

    if (elem.text && elem.text.length) {

        var textEl = document.createElement('div');

        textEl.classList.add('inspector__exp');
        textEl.innerText = elem.text.trim();
        wrapper.appendChild(textEl);

        if (level < 2) {
            row1.classList.add('inspector__row--expanded');
            row1OpenArrow.classList.add('inspector__tag-open--expanded');
        } else {
            row1.classList.add('inspector__row--collapsed');
            row1OpenArrow.classList.add('inspector__tag-open--collapsed');
        }
    }

    if (elem.children.length) level += 1;
    [].slice.call(elem.children).forEach(function (el) {
        renderDOM(el, wrapper, level);

        if (level < 2) {
            row1.classList.add('inspector__row--expanded');
            row1OpenArrow.classList.add('inspector__tag-open--expanded');
        } else {
            row1.classList.add('inspector__row--collapsed');
            row1OpenArrow.classList.add('inspector__tag-open--collapsed');
        }
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
        row1.classList.toggle('inspector__row--expanded');
        row1.classList.toggle('inspector__row--collapsed');
        row1OpenArrow.classList.toggle('inspector__tag-open--expanded');
        row1OpenArrow.classList.toggle('inspector__tag-open--collapsed');
    }, false);

    parentEl.appendChild(wrapper);
};
exports.renderDOM = renderDOM;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var renderInspector = function renderInspector(body, panel) {

    var inspectorDisplay = document.createElement('div');
    var inspectorContainer = document.createElement('div');
    var level = 0;

    inspectorContainer.classList.add('inspector');
    inspectorContainer.classList.add('tools__panel');
    inspectorDisplay.classList.add('inspector__display');
    inspectorDisplay.id = 'inspector_display';
    inspectorContainer.appendChild(inspectorDisplay);
    panel.appendChild(inspectorContainer);
    (0, _render_dom.renderDOM)(body, inspectorDisplay, level);
}; /* render_inspector.js, v. 0.1.4, 29.03.2017, @ filip-swinarski */

exports.renderInspector = renderInspector;

},{"./render_dom.js":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvbWFpbi5qcyIsImpzL2VzNi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzIiwianMvZXM2L21vZHVsZXMvY29uc29sZV9sb2cuanMiLCJqcy9lczYvbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyIsImpzL2VzNi9tb2R1bGVzL2dsb2JhbF9ldmFsLmpzIiwianMvZXM2L21vZHVsZXMvbG9hZF9zdHlsZXMuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2RvbS5qcyIsImpzL2VzNi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsU0FBbkI7Ozs7Ozs7Ozs7QUNsQkE7O0FBRUE7O0FBQ0E7O0FBTEE7O0FBT0EsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsR0FBTTs7QUFFdEIsV0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDLEtBQUQsRUFBVzs7QUFFeEMs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e2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS4xIDMwLjAzLjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzJztcbmltcG9ydCAqIGFzIERUQ29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5jb250YWluZXIuaWQgPSAnZGV2X3Rvb2xzJztcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29scycpO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHksIGNvbnRhaW5lcik7XG5yZW5kZXJDb25zb2xlKGNvbnRhaW5lcik7XG5yZW5kZXJCcm93c2VySW5mbyhjb250YWluZXIpO1xuXG53aW5kb3cuRFRDb25zb2xlID0gRFRDb25zb2xlO1xuIiwiLyogY29uc29sZV9saXN0ZW4uanMsIHYuIDAuMS40LCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7Y29uc29sZUlucHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5sZXQgY29uc29sZUxpc3RlbiA9ICgpID0+IHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvckxpbmVObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yQ29sdW1uTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICByb3cuaW5uZXJIVE1MID0gcmVuZGVyQ29uc29sZU1lc3NhZ2UoZS5kZXRhaWwpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgLy8gbGV0IHZhbHVlID0gd2luZG93LmV2YWwoY29uc29sZUlucHV0LnZhbHVlKTsgLy8gd2luZG93LmV2YWwgdG8gd29yayBvbmx5IGluIGdsb2JhbCBzY29wZVxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGxldCBsb2cgPSBuZXcgQ3VzdG9tRXZlbnQoJ2xvZycsIHtkZXRhaWw6IFtzdHIsIHZhbHVlXX0pO1xuXG4gICAgY29uc29sZURpc3BsYXkuZGlzcGF0Y2hFdmVudChsb2cpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxvZ307XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5cbmxldCBsb2cgPSAodmFsdWUsIHN0ciA9ICcnKSA9PiB7XG4gICAgY29uc29sZUxvZyhzdHIsIHZhbHVlKTtcbn1cblxuZXhwb3J0IHtsb2d9O1xuIiwiLyogZ2xvYmFsX2V2YWwuanMsIHYuIDAuMS4wLCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG4vLyBldmFsIC0gcnVucyBibG9jayBzY29wZSBkZWNsYXJhdGlvbnMgdmlhIHNjcmlwdCBpbmplY3Rpb25cbi8vIG90aGVyd2lzZSBzdGFuZGFyZCBldmFsIHVzZWQgXG4vLyAtIHRoaW5rIGlmIG5vdCB1c2UgaW5qZWN0aW9uIGV4Y2x1c2l2ZWx5XG4vLyByZXR1cm5zIHZhbHVlXG5jb25zdCBnbG9iYWxFdmFsID0gKHN0cikgPT4ge1xuXG4gICAgJ3VzZSBzdHJpY3QnOyAvLyBwcmV2ZW50IGNyZWF0aW5nIGxvY2FsIHZhcmlhYmxlcyB3aXRoIHN0YW5kYXJkIGV2YWxcbiAgICBcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ2xldCAnKSB8fCBzdHIuc3RhcnRzV2l0aCgnY29uc3QgJykpIHsgLy8gY29kZSBmb3Igc2NyaXB0IGluc2VydGlvblxuXG4gICAgICAgIGxldCBzY3JpcHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4wLCAyOC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGxldCBzdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGV0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICcuL2Nzcy9tYWluLmNzcyc7XG4gICAgc3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBzdHlsZXMudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVzLm1lZGlhID0gJ3NjcmVlbic7XG4gICAgc3R5bGVzLmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNzK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2Jyb3dzZXJfaW5mby5qcywgdi4gMC4xLjAsIDI5LjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCByZW5kZXJCcm93c2VySW5mbyA9IChwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgYnJvd3NlckluZm9EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYnJvd3NlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXInKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19wYW5lbCcpO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5Jyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlkID0gJ2Jyb3dzZXJfZGlzcGxheSc7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9EaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChicm93c2VySW5mb0NvbnRhaW5lcik7XG4gICAgXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgbmFtZTogJyArIG5hdmlnYXRvci5hcHBDb2RlTmFtZSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+QXBwIHZlcnNpb246ICcgKyBuYXZpZ2F0b3IuYXBwVmVyc2lvbiArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+UGxhdGZvcm06ICcgKyBuYXZpZ2F0b3IucGxhdGZvcm0gKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PlVzZXIgYWdlbnQ6ICcgKyBuYXZpZ2F0b3IudXNlckFnZW50ICsgJzwvZGl2Pic7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVyQnJvd3NlckluZm99O1xuIiwiLyogcmVuZGVyX2NvbnNvbGUuanMsIHYuIDAuMS4yLCAzMC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vY29uc29sZV9saXN0ZW4nO1xuXG5jb25zdCBjb25zb2xlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbmNvbnN0IGNvbnNvbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dFByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb25zb2xlJyk7XG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheScpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmlkID0gJ2NvbnNvbGVfaW5wdXQnO1xuY29uc29sZUlucHV0LnR5cGUgPSAndGV4dCc7XG5jb25zb2xlSW5wdXRQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcHJvbXB0Jyk7XG5cbmxldCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dFByb21wdCk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlRGlzcGxheSk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlSW5wdXQpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDb250YWluZXIpO1xuICAgIGNvbnNvbGVMaXN0ZW4oKTtcblxufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGV9O1xuZXhwb3J0IHtjb25zb2xlRGlzcGxheX07XG5leHBvcnQge2NvbnNvbGVJbnB1dH07XG4iLCIvKiByZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzLCB2LiAwLjEuMCwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBsZXQgaHRtbCA9IGBgO1xuXG4gICAgaWYgKG1zZ0FycmF5WzBdKVxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImNvbnNvbGVfX21zZy1pXCI+PHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctaXByb21wdFwiPjwvc3Bhbj4ke21zZ0FycmF5WzBdfSA8L2Rpdj5gO1xuICAgIFxuICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJjb25zb2xlX19tc2ctclwiPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLXJwcm9tcHRcIj48L3NwYW4+JHttc2dBcnJheVsxXX08L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGh0bWw7XG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjQsIDI5LjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCByZW5kZXJET00gPSAoZWxlbSwgcGFyZW50RWwsIGxldmVsKSA9PiB7XG5cbiAgICBpZiAoZWxlbS5pZCA9PT0gJ2luc3BlY3Rvcl9kaXNwbGF5JylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgcm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tb3BlbmluZycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jbG9zaW5nJyk7XG4gICAgXG4gICAgbGV0IHJvdzFFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzFPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgbGV0IGF0dHJFcXVhbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9ICcgJyArIGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgIGxldmVsICs9IDE7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIHJlbmRlckRPTShlbCwgd3JhcHBlciwgbGV2ZWwpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPCAyKSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcbiAgICByb3cxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByb3cxLmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpXG4gICAgICAgIHJvdzEuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpXG4gICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgcGFyZW50RWwuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG59XG5leHBvcnQge3JlbmRlckRPTX07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuNCwgMjkuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5cbmxldCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSwgcGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShib2R5LCBpbnNwZWN0b3JEaXNwbGF5LCBsZXZlbCk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yfTtcbiJdfQ==
