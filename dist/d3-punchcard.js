(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3")) : factory(root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d3 = __webpack_require__(1);

	/**
	 * Default options.
	 */
	var defaults = {
	  target: '#chart',
	  width: 600,
	  height: 400,
	  margin: {
	    top: 20,
	    right: 20,
	    bottom: 40,
	    left: 100
	  },
	  color: '#444',
	  xticks: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'],
	  yticks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};

	exports = module.exports = Punchcard;
	exports.punchcard = Punchcard;

	/**
	 * Punchcard chart.
	 *
	 * @param {Object} options
	 * @public
	 */
	function Punchcard(options) {
	  if (!(this instanceof Punchcard)) {
	    return new Punchcard(options);
	  }

	  Object.assign(this, defaults, options);
	  this._init();
	}

	/**
	 * Punchcard prototype.
	 */
	var proto = Punchcard.prototype;

	/**
	 * Initialize the chart.
	 *
	 * @private
	 */
	proto._init = function () {
	  var _this = this;

	  var width = this.width;
	  var height = this.height;
	  var margin = this.margin;

	  var innerWidth = this.innerWidth = width - margin.left - margin.right;
	  var innerHeight = this.innerHeight = height - margin.top - margin.bottom;
	  var unitWidth = this.unitWidth = innerWidth / 24;
	  var unitHeight = this.unitHeight = innerHeight / 7;

	  this.unitSize = Math.min(unitWidth, unitHeight);

	  this.chart = d3.select(this.target).append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	  this.x = d3.scale.linear().domain([0, 23]).range([unitWidth / 2, innerWidth - unitWidth / 2]);

	  this.y = d3.scale.linear().domain([0, 6]).range([unitHeight / 2, innerHeight - unitHeight / 2]);

	  this.xAxis = d3.svg.axis().orient('bottom').scale(this.x).ticks(24).tickFormat(function (d, i) {
	    return _this.xticks[i];
	  });

	  this.yAxis = d3.svg.axis().orient('left').scale(this.y).ticks(7).tickFormat(function (d, i) {
	    return _this.yticks[i];
	  });

	  this._renderAxis();
	};

	/**
	 * Render punchcard.
	 *
	 * @param  {Array} data
	 * @public
	 */
	proto.render = function (data) {
	  data = (data || []).filter(function (d) {
	    return Array.isArray(d) && d.length === 3 && d[0] >= 0 && d[0] <= 6 && d[1] >= 0 && d[1] <= 23;
	  });

	  this.data = data;
	  this._renderCard();
	};

	/**
	 * Render axis.
	 *
	 * @private
	 */
	proto._renderAxis = function () {
	  this.chart.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + this.innerHeight + ')').call(this.xAxis);

	  this.chart.append('g').attr('class', 'y axis').call(this.yAxis);
	};

	/**
	 * Render card.
	 *
	 * @private
	 */
	proto._renderCard = function () {
	  var _this2 = this;

	  var data = this.data;
	  var maxVal = d3.max(data, function (d) {
	    return d[2];
	  });

	  this.r = d3.scale.sqrt().domain([0, maxVal]).range([0, this.unitSize / 2]);

	  var circles = this.chart.selectAll('circle').data(data);

	  var updates = [circles, circles.enter().append('circle')];
	  updates.forEach(function (group) {
	    group.attr('cx', function (d) {
	      return _this2.x(d[1]);
	    }).attr('cy', function (d) {
	      return _this2.y(d[0]);
	    }).attr('r', function (d) {
	      return _this2.r(d[2]);
	    }).style('fill', _this2.color);
	  });

	  circles.exit().remove();
	};

	proto.clear = function () {
	  this.chart.selectAll('*').remove();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;