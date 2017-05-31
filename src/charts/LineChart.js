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
  var lines, dots;

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

    lines = svg
      .append('g')
      .attr('class', 'lines');
    dots = svg
      .append('g')
      .attr('class', 'dots');
    // </editor-fold >
    // <editor-fold desc="Update Data">
    updateData = function (newData) {
      let {yDomain, xAccessor, yAccessor, range, colors, width} = props;
      range = findRange(newData, xAccessor, range);
      yAccessor = yAccessor.constructor === Array? yAccessor : [yAccessor];
      yDomain = findYExtent(newData, yAccessor);
      x.domain(range).nice();
      y.domain(yDomain).nice();
      // xAxis = d3.axisBottom(x);
      // yAxis = d3.axisLeft(y);
      const t = d3
        .transition('hello')
        .duration(1000)
        .on('start', function() {
          svg
            .selectAll('g.dots')
            .selectAll('g')
            .attr('pointer-events', 'none');
        })
        .on('end', function() {
          svg
            .selectAll('g.dots')
            .selectAll('g')
            .attr('pointer-events', null);
        });

/*      const t2 = d3
        .transition('hey')
        .on('start', function() {
          d3.select(this)
            .attr('pointer-events', 'none');
        })
        .on('end', function() {
          d3.select(this)
            .attr('pointer-events', null)
        })*/
      svg.select('.axis.axis--x')
        .transition(t)
        .call(xAxis);
      svg.select('.axis.axis--y')
        .transition(t)
        .call(yAxis);

      const currLines = lines
        .selectAll('path')
        .data(yAccessor, d => d);
      // UPDATE
      // ENTER + UPDATE
      currLines
        .enter().append('path')
        .merge(currLines)
        // .attr('d', (d) => line.x(f => x(f[xAccessor])).y(f => 0)(newData))
        .transition(t)
        .attr('d', (d) => {
          return line.x(f => x(f[xAccessor])).y(f => y(f[d]))(newData);
        })
        .attr('stroke', (d, i) => colors[i])
        .attr('stroke-width', '2px')
        .attr('fill', 'none');
      // EXIT
      currLines.exit().remove();

      // dot groups
      let dataPoints = dots
        .selectAll('g')
        .data(newData, d => d[xAccessor]);

      // UPDATE
      // ENTER + UPDATE
      dataPoints
        .enter().append('g')
        .merge(dataPoints)
        .on('mouseover', function(d, i) {
          d3.select(this)
            .selectAll('circle')
            .transition()
            .attr('r', 6);
          // show tooltip;
        })
        .on('mouseout', function(d, i) {
          d3.select(this)
            .selectAll('circle')
            .transition()
            .attr('r', 3);
          // hide tooltip;
        });
      dataPoints.exit().remove();

      // circles under data groups
      const circles = dots.selectAll('g')
        .selectAll('circle')
        .data(yAccessor, d => d);

      circles
        .enter().append('circle')
        .merge(circles)
        // .attr('cy', 0)

        .transition(t)
        .attr('cx', function() {
          // access parent node!
          const pDatum = d3.select(this.parentNode).datum();
          return x(pDatum[xAccessor]);
        })
        .attr('cy', function(d) {
          const pDatum = d3.select(this.parentNode).datum();
          return y(pDatum[d]);
        })
        .attr('r', 3)
        .attr('stroke', (d, i) => colors[i])
        .attr('stroke-width', '2px')
        .attr('fill', 'white');
      circles.exit().remove();


    }
    // </editor-fold>
    updateData(props.data);

  }
  return drawChart;
}

function findRange(data, xAccessor, range, minExtent = DEFAULT_MIN_EXTENT) {
  if (range && range.length > 0) {
    console.log('hey')
    return range;
  }
  if (data.length === 0) {
    const now = +new Date();
    return [now, now + DEFAULT_MIN_EXTENT];
  }
  const extent = d3.extent(data, d => d[xAccessor]);
  if (extent[0] === extent[1]) {
    return [extent, extent + minExtent];
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
