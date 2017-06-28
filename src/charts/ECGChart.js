/**
 * Created by zizhangai on 5/13/17.
 */
import * as d3 from 'd3';
import {
  DEFAULT_ECG_GRID_ATTR,
  DEFAULT_ECG_AXIS_ATTR,
  DEFAULT_ECG_MIN_RANGE_EXTENT,
  DEFAULT_ECG_YDOMAIN,
  DEFAULT_ECG_LINE_ATTR,
  DEFAULT_ECG_CORNER_TEXT_ATTR,
  DEFAULT_ECG_MRKER_ATTR
} from '../utils/consts';
import deepmerge from 'deepmerge';
import { attr, append, drawLegend } from '../utils/utils';

// TODO: how can I remove the hardcoded ranges?
// TODO: need to support x and y axis ticks?
// TODO: what do user wants to configure?

const constants = {
  height             : null,
  data               : null,
  range              : null,
  margin             : { top: 50, right: 50, bottom: 50, left: 50 },
  yDomain            : DEFAULT_ECG_YDOMAIN,
  width              : window.innerWidth,
  markers            : [],
  axis               : { style: DEFAULT_ECG_AXIS_ATTR, label: null },
  line               : { style: DEFAULT_ECG_LINE_ATTR },
  upperLeftLabel     : null,
  upperRightLabel    : null,
  lowerLeftLabel     : null,
  lowerRightLabel    : null,
  legend             : null,
};

export default function generateChart (props) {
  const myProps = deepmerge(constants, props);
  return Object.keys(myProps).reduce((acc, key) => acc[key].call(null, myProps[key]), drawECG());
  // this is nothing but a chained function;
}

function drawECG () {
  var props = Object.keys(constants).reduce((acc, key) => { acc[key] = void 0; return acc; }, {});
  Object.keys(props).forEach(key => {
    drawChart[key] = function (value) {
      if (!arguments.length) return props[key];
      props[key] = value;
      return drawChart;
    };
  });
  // define internal variables
  var updateWidth, updateData;
  drawChart.data = function (value) {
    if (!arguments.length) return props.data;
    props.data = value;
    if (typeof updateWidth === 'function') updateData();
    return drawChart;
  };
  drawChart.width = function (value) {
    if (!arguments.length) return props.width;
    props.width = value;
    if (typeof updateWidth === 'function') updateWidth();
    return drawChart;
  };

  var x, y, xAxis, yAxis, svg;
  function drawChart(selection) {
    let { width, margin, height, data, axis, line, range, markers, yDomain,
      upperLeftLabel, upperRightLabel, lowerLeftLabel, lowerRightLabel, legend } = props;
    range         = findRange(data, range);
    width         = width - margin.left - margin.right;
    yDomain       = yDomain.slice().reverse(); // if no .slice(), you might be mutating the default range!
    const grid    = width / ((range[1] - range[0])/200); // default is 200ms per grid
    height        = height? (height - margin.top - margin.bottom) : grid * 10;
    data          = data.filter(d => d.date >= range[0] && d.date <= range[1]);
    markers       = markers.filter(d => d.date >= range[0] && d.date <= range[1]);
    x             = d3.scaleTime().domain(range).range([0, width]);
    y             = d3.scaleLinear().domain(yDomain).range([0, height]);
    xAxis = d3
      .axisBottom()
      .scale(x)
      .tickValues(x.ticks(d3.timeMillisecond.every(200)))
      .tickSize(-height);
    yAxis = d3
      .axisLeft()
      .scale(y)
      // each big step is 0.5mv
      .tickValues(d3.range(yDomain[1], yDomain[0], 0.5).concat(yDomain[0]))
      .tickSize(-width);

    svg = selection
      .append('svg')
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.left + margin.right)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // <editor-fold desc="Draw Axis">
    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('path, text').remove();

    svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
      .selectAll('path, text').remove();

    svg
      .selectAll('.axis--x, .axis--y')
      .selectAll('line')
      .call(attr, axis.style);

    // </editor-fold>

    // <editor-fold desc="draw fine grids">
    const fineGrids = svg
      .append('g')
      .attr('class', 'fine-grids');

    append
      .call(null, fineGrids.append('g'), 'line', x.ticks(d3.timeMillisecond.every(40)))
      .call(attr, { ...DEFAULT_ECG_GRID_ATTR, 'x1': x, 'x2': x, 'y1': 0, 'y2': height });
    append
      .call(null, fineGrids.append('g'), 'line', d3.range(5 * 10 + 1).map(d => d * (yDomain[0] - yDomain[1])/50 + yDomain[1]))
      .call(attr, { ...DEFAULT_ECG_GRID_ATTR, 'x1': 0, 'x2': width, 'y1': y, 'y2': y});
    // </editor-fold>

    // <editor-fold desc="Draw line">
    append
      .call(null, svg.append('g').attr('class', 'ecg'), 'path', [data])
      .call(attr, { ...line.style, 'd': d3.line().x(d => x(d.date)).y(d => y(d.value)) });
    // </editor-fold>

    // <editor-fold desc="Draw corner labels">
    append
      .call(null, svg.append('g').attr('class', 'corner-label'), 'text',
        [upperLeftLabel, upperRightLabel, lowerLeftLabel, lowerRightLabel])
      .text(d => d)
      .call(attr, {
        ...DEFAULT_ECG_CORNER_TEXT_ATTR,
        'x': (d, i) => i % 2 ? width : 0,
        'y': (d, i) => i < 2 ? 0 : height,
        'text-anchor': (d, i) => i % 2 ? 'end' : 'start',
        'dy': (d, i) => i < 2? '-1.8em' : '1.1em'
      });
    // </editor-fold>

    // <editor-fold desc="Draw Marker">
    const markerGroup = append
      .call(null, svg.append('g').attr('class', 'marker'), 'g', markers);

    markerGroup
      .append('path')
      .call(attr, {
        ...DEFAULT_ECG_MRKER_ATTR,
        'transform': d => `translate(${x(d.date)}, -6)rotate(180)`
      });

    markerGroup
      .append('text')
      .text(d => d.label)
      .call(attr, {
        ...DEFAULT_ECG_CORNER_TEXT_ATTR,
        'x': d => x(d.date),
        'y': '-1.1em',
        'text-anchor': 'middle'
      });
    // </editor-fold>

    // <editor-fold desc="Draw legend">
    if (legend) {
      const legends = [{
        text         : legend,
        key          : legend,
        path         : d3.symbol().type(d3.symbolTriangle).size(50),
        textStyle    : DEFAULT_ECG_CORNER_TEXT_ATTR,
        pathStyle    : DEFAULT_ECG_MRKER_ATTR
      }];

      svg
        .call(drawLegend, legends, height, width);
    }

    // </editor-fold>
  }
  return drawChart;
}



function findRange (data, range, minExtent = DEFAULT_ECG_MIN_RANGE_EXTENT) {
  const arr = [0, 200, 400, 600, 800, 1000];
  let [r1, r2] = range? range : data.length > 0? d3.extent(data, (d) => d.date) : [+new Date(), + new Date()];
  const minIdx = d3.bisectRight(arr, r1 % 1e3) - 1;
  const maxIdx = d3.bisectLeft(arr, r2 % 1e3);
  r1 = r1 - r1 % 1e3 + arr[minIdx];
  r2 = r2 - r2 % 1e3 + arr[maxIdx];
  if (r2 - r1 < minExtent * 1e3) {
    r2 = r1 + minExtent * 1e3;
  }
  return [r1, r2];
}


/*
 <ECG
 width='250px'
 margin  //optional: { top right bottom left }
 height  // optional. can be inferred from width because the grids are squares.
 data    // [{date: <timeStamp>, value: <float> }]
 axis: { // optional
   style: {
     stroke: '#222'
   }，
   ticks: [{value, label}], // default: null
 }
 line: { //optional
   stroke: 'red',
   strokeWidth: '2px'
 }
 range: [timeStamp1, timeStamp2] // optional: can be inferred from data;
 // will be rounded to nearest grid (0.2s)
 markers: [ // for abnormal points
 { date: <timeStamp>, value: <float>, label: <String> }
 ]
 upperleftLabel: { //optional
   text: ''
   style: {....} //optional
 }
 upperRightLabel //optional
 lowerLeftLabel //optional
 lowerRightLabel //optional
 />
 */