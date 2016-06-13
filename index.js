const d3 = require('d3')

/**
 * Default options.
 */
const defaults = {
  target: '#chart',
  width: 600,
  height: 400,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}

module.exports = Punchcard

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
  this.unitSize = Math.max(this.unitWidth, this.unitHeight)

  this.chart = d3.select(this.target)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `trasnlate(${margin.left}, ${margin.top})`)

  this.x = d3.scale.linear()
    .domain([0, 23])
    .range([0, innerWidth])

  this.y = d3.scale.linear()
    .domain([0, 6])
    .range([0, innerHeight])

  this.xAxis = d3.svg.axis()
    .orient('bottom')
    .scale(this.x)
    .ticks(24)

  this.yAxis = d3.svg.axis()
    .orient('left')
    .scale(this.y)
    .ticks(7)

  this.chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${innerHeight})`)

  this.chart.append('g')
    .attr('class', 'y axis')
}

proto.render = function(data) {
  if (!data || !data.length) {
    this.data = []
    this.clear()
    return
  }

  this.data = data
}

proto.clear = function() {

}
