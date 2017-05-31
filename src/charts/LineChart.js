/**
 * Created by zizhangai on 5/27/17.
 */
import deepmerge from 'deepmerge';
import * as d3 from 'd3';
const DEFAULT_MIN_EXTENT = 24 * 3600 * 1e3; // milliseconds in one day;
const DEFAULT_Y_DOMAIN = [0, 1];
const constants = {
  height       : null,
  width        : window.innerWidth,
  colors       : null,
  data         : null,
  margin       : {top: 50, right: 50, bottom: 50, left: 50},
  yDomain      : [0, 1],
  xAccessor    : 'date',
  yAccessor    : null, // either string or array
  range        : null
};

export default function generateChart (props) {
  const myProps = deepmerge(constants, props);
  // should I check if all date is timestamp?
  myProps.data = myProps.data.map(d => {
    if (Object.prototype.toString.call(d[props.xAccessor]) === '[object Date]') {
      d[props.xAccessor] = +d[props.xAccessor];
    }
    return d;
  });
  // need to sort the data, convert the xAccessor to timestamp;
  myProps.data = myProps.data.sort((a, b) => a[props.xAccessor] - b[props.xAccessor]);
  return Object.keys(myProps).reduce((acc, key) => acc[key].call(null, myProps[key]), drawLine());
}

function drawLine() {
  var props = Object.keys(constants).reduce((acc, key) => {
    acc[key] = void 0;
    return acc;
  }, {});
  // define internal variables
  var updateWidth, updateData;
  var x, y, xAxis, yAxis, svg;
  var line = d3.line();
  var main;

  // <editor-fold desc="Define methods for drawLine">
  Object.keys(props).forEach(key => {
    drawChart[key] = function (value) {
      if (!arguments.length) return props[key];
      props[key] = value;
      return drawChart;
    };
  });
  drawChart.data = function (value) {
    if (!arguments.length) return props.data;
    props.data = value;
    if (typeof updateData=== 'function') {
      updateData(value);
    }
    return drawChart;
  };
  drawChart.width = function (value) {
    if (!arguments.length) return props.width;
    props.width = value;
    if (typeof updateWidth === 'function') updateWidth();
    return drawChart;
  };
  // </editor-fold>

  function drawChart(selection) {
    // let {height, width, data, margin, yDomain, xAccessor, yAccessor, range} = props;
    // props.range = findRange(props.data, props.xAccessor, props.range);
    props.width = props.width - props.margin.left - props.margin.right;
    props.yDomain = findYExtent(props.data, props.yAccessor);
    x = d3.scaleTime()
      // .domain(props.range)
      .range([0, props.width]);
    y = d3.scaleLinear()
      .domain(props.yDomain)
      .range([props.height, 0]);
    xAxis = d3.axisBottom(x);
    yAxis = d3.axisLeft(y);
    svg = selection
      .append('svg')
      .attr('height', props.height + props.margin.top + props.margin.bottom)
      .attr('width', props.width + props.margin.left + props.margin.right)
      .append('g')
      .attr('transform', `translate(${props.margin.left}, ${props.margin.top})`);
    // <editor-fold desc="Draw Axis">
    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${props.height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis);

    main = svg
      .append('g')
      .attr('class', 'main');
    // </editor-fold >
    // <editor-fold desc="Update Data">
    updateData = function (newData) {
      let {yDomain, xAccessor, yAccessor, range, colors, height, margin} = props;
      range = findRange(newData, xAccessor, range);
      yAccessor = yAccessor.constructor === Array? yAccessor : [yAccessor];
      yDomain = findYExtent(newData, yAccessor);
      x.domain(range).nice();
      y.domain(yDomain).nice().range([height, 0]);
      const t = d3
        .transition('hello')
        .duration(1000)
        .on('start', function() {
          // this problem doesn't seem to occur any more.
          svg
            .selectAll('circle.dot')
            .attr('pointer-events', 'none');
        })
        .on('end', function() {
          svg
            .selectAll('circle.dot')
            .attr('pointer-events', null);
        });
      d3.select(svg.node().parentNode)
        .transition(t)
        .attr('height', height + margin.top + margin.bottom);

      svg.select('.axis.axis--x')
        .transition(t)
        .attr('transform', `translate(0, ${props.height})`)
        .call(xAxis);
      svg.select('.axis.axis--y')
        .transition(t)
        .call(yAxis);

      const mainGroups = main
        .selectAll('g.line-dots')
        .data(yAccessor);

      // UPDATE
      // ENTER + UPDATE
      const allGroups = mainGroups
        .enter().append('g')
        .merge(mainGroups)
        .attr('class', d => d + ' line-dots');
      // EXIT
      mainGroups.exit().remove();

      const lineDots = allGroups
        .selectAll('g')
        .data(['line', 'dots']);

      const allLineDots = lineDots.enter().append('g')
        .merge(lineDots)
        .attr('class', d => d);

      lineDots.exit().remove();

      const a = allLineDots.filter(function() { return d3.select(this).classed('line') });
      const lines = a
        .selectAll('path')
        .data([newData]);

      lines.enter().append('path')
        .merge(lines)
        .transition(t)
        .attr('d', function(d, i) {
          const group = d3.select(this.parentNode.parentNode).datum()
          return line.x(s => x(s[xAccessor])).y(s => y(s[group]))(newData)
        })
        .attr('stroke', function (d, i) {
          const group = d3.select(this.parentNode.parentNode).datum()
          return colors[yAccessor.indexOf(group)]
        })
        .attr('stroke-width', '2px')
        .attr('fill', 'none');


      const b = allLineDots.filter(function() { return d3.select(this).classed('dots')});
      const dots = b
        .selectAll('circle')
        .data(newData);

      newData.forEach(function(d, i) { d.nodes = []; });
      dots.enter().append('circle')
        .merge(dots)
        .attr('class', 'dot')
        .each(function(d) {
          d.nodes.push(this);
        })
        .transition(t)
        .attr('r', 3)
        .attr('cx', (d, i) => x(d[xAccessor]))
        .attr('cy', function(d) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return y(d[group]);
        })
        .attr('fill', 'white')
        .attr('stroke', function(d) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return colors[yAccessor.indexOf(group)];
        })
        .attr('stroke-width', '2px');

      dots.exit().remove();
      svg
        .selectAll('circle.dot')
        .on('mouseover', function(d){
          d3.select(this.parentNode.parentNode).raise();
          d3.selectAll(d.nodes)
            .raise()
            .transition()
            .attr('r', 6);
        })
        .on('mouseout', function(d) {
          d3.selectAll(d.nodes)
            .transition()
            .attr('r', 3);
        })

    }
    // </editor-fold>
    updateData(props.data);

  }
  return drawChart;
}

function findRange(data, xAccessor, range, minExtent = DEFAULT_MIN_EXTENT) {
  if (range && range.length > 0) {
    return range;
  }
  if (data.length === 0) {
    const now = +new Date();
    return [now, now + DEFAULT_MIN_EXTENT];
  }
  const extent = d3.extent(data, d => d[xAccessor]);
  if (extent[0] === extent[1]) {
    return [extent[0], extent[0] + minExtent];
  }
  return extent;
}
function findYExtent(data, yAccessor, defaultDomain = DEFAULT_Y_DOMAIN.slice()) {
  if (data.length === 0) return defaultDomain;

  yAccessor = yAccessor.constructor === Array? yAccessor : [yAccessor];
  const yDomain = yAccessor.reduce((acc, key) => {
    const extent = d3.extent(data, d => d[key]);
    return [Math.min(acc[0], extent[0]), Math.max(acc[1], extent[1])];
  }, [Infinity, -Infinity]);
  if (yDomain[0] === yDomain[1]) {
    return [yDomain[0] - 1, yDomain[1] + 1];
  }
  return yDomain;
}

function findYDomainFrom0(data, yAccessor, defaultDomain = DEFAULT_Y_DOMAIN.slice()) {
  if (data.length === 0) return defaultDomain;
  yAccessor = yAccessor.constructor === Array? yAccessor : [yAccessor];
  const yMax = yAccessor.reduce((acc, key) => {
    const max = d3.max(data, d => d[key]);
    return [0, Math.max(acc, max)];
  }, 0);
  if (yMax === 0) return defaultDomain;
  return [0, yMax];
}