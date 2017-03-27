(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _foo = require('./modules/foo.js');

var _bar = require('./modules/bar.js');

console.log((0, _foo.foo)());
console.log((0, _bar.bar)());

},{"./modules/bar.js":2,"./modules/foo.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var bar = function bar() {
	return 'bar';
};

exports.bar = bar;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var foo = function foo() {
	return 'foo';
};

exports.foo = foo;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvbWFpbi5qcyIsImpzL2VzNi9tb2R1bGVzL2Jhci5qcyIsImpzL2VzNi9tb2R1bGVzL2Zvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBRUEsUUFBUSxHQUFSLENBQVksZUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLGVBQVo7Ozs7Ozs7O0FDSkEsSUFBSSxNQUFNLFNBQU4sR0FBTSxHQUFNO0FBQ2YsUUFBTyxLQUFQO0FBQ0EsQ0FGRDs7UUFJUSxHLEdBQUEsRzs7Ozs7Ozs7QUNKUixJQUFJLE1BQU0sU0FBTixHQUFNLEdBQU07QUFDZixRQUFPLEtBQVA7QUFDQSxDQUZEOztRQUlRLEcsR0FBQSxHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7Zm9vfSBmcm9tICcuL21vZHVsZXMvZm9vLmpzJztcbmltcG9ydCB7YmFyfSBmcm9tICcuL21vZHVsZXMvYmFyLmpzJztcblxuY29uc29sZS5sb2coZm9vKCkpO1xuY29uc29sZS5sb2coYmFyKCkpO1xuIiwibGV0IGJhciA9ICgpID0+IHtcblx0cmV0dXJuICdiYXInO1xufVxuXG5leHBvcnQge2Jhcn07XG4iLCJsZXQgZm9vID0gKCkgPT4ge1xuXHRyZXR1cm4gJ2Zvbyc7XG59XG5cbmV4cG9ydCB7Zm9vfTtcbiJdfQ==
