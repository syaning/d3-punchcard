const d3 = require('d3')

/**
 * Default options.
 */
const defaults = {
  target: '#chart',
  width: 600,
  height: 400,
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 100
  }
}

exports = module.exports = Punchcard
exports.punchcard = Punchcard

/**
 * Punchcard chart.
 *
 * @param {Object} options
 * @public
 */
function Punchcard(options) {
  if (!(this instanceof Punchcard)) {
    return new Punchcard(options)
  }

  Object.assign(this, defaults, options)
  this._init()
}

/**
 * Punchcard prototype.
 */
var proto = Punchcard.prototype

var xTicks = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a',
  '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p',
  '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'
]

var yTicks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Initialize the chart.
 *
 * @private
 */
proto._init = function() {
  var width = this.width
  var height = this.height
  var margin = this.margin

  var innerWidth = width - margin.left - margin.right
  var innerHeight = height - margin.top - margin.bottom

  this.innerWidth = innerWidth
  this.innerHeight = innerHeight

  this.unitWidth = innerWidth / 24
  this.unitHeight = innerHeight / 7
  this.unitSize = Math.min(this.unitWidth, this.unitHeight)

  this.chart = d3.select(this.target)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  this.x = d3.scale.linear()
    .domain([0, 23])
    .range([this.unitWidth / 2, innerWidth - this.unitWidth / 2])

  this.y = d3.scale.linear()
    .domain([0, 6])
    .range([this.unitHeight / 2, innerHeight - this.unitHeight / 2])

  this.xAxis = d3.svg.axis()
    .orient('bottom')
    .scale(this.x)
    .ticks(24)
    .tickFormat((d, i) => xTicks[i])

  this.yAxis = d3.svg.axis()
    .orient('left')
    .scale(this.y)
    .ticks(7)
    .tickFormat((d, i) => yTicks[i])

  this.chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(this.xAxis)

  this.chart.append('g')
    .attr('class', 'y axis')
    .call(this.yAxis)
}

/**
 * Render punchcard.
 *
 * @param  {Array} data
 * @public
 */
proto.render = function(data) {
  if (!data || !data.length) {
    this.data = []
    this.clear()
    return
  }

  var maxVal = d3.max(data, d => d[2])

  this.data = data

  this._renderAxis()

  this.r = d3.scale.sqrt()
    .domain([0, maxVal])
    .range([0, this.unitSize / 2])

  this.chart.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => this.x(d[1]))
    .attr('cy', d => this.y(d[0]))
    .attr('r', d => this.r(d[2]))
    .style('fill', '#444')
}

/**
 * Render axis.
 *
 * @private
 */
proto._renderAxis = function() {

}

proto.clear = function() {

}
