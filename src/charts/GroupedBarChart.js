/**
 * Created by zizhangai on 6/26/17.
 */
import * as d3 from "d3";
import {
  formatClassName,
  drawLegend,
  drawThreshold,
  attr,
  drawBaseline,
} from "../utils/utils";
import {
  DEFAULT_LINE_LEGEND_TEXT_STYLE,
  DEFAULT_LINE_MISSED_STYLE,
  DEFAULT_BASELINE_STYLE,
} from "../utils/consts";

const DEFAULT_DATE_FORMAT_STRING = '%b %d, %Y';
const DEFAULT_DATE_FORMAT_AXIS = '%b %-d';

export class drawGroupedBar {
  constructor(props) {
    this.setProps(props);
  }
  setProps = props => {
    this.height                 = props.height;
    this.width                  = props.width || window.innerWidth;
    this.colors                 = props.colors;
    this.data                   = props.data;
    this.margin                 = props.margin || { top: 50, right: 50, bottom: 50, left: 50 };
    this.yDomain                = props.yDomain;
    this.xAccessor              = props.xAccessor || "date";
    this.yAccessor              = props.yAccessor; // either string or array;
    this.range                  = props.range;
    this.xAxisFormator          = props.xAxisFormator;
    this.legendText             = props.legendText || props.yAccessor;
    this.threshold              = props.threshold || [];
    this.missed                 = props.missed;
    this.baseline               = props.baseline;
    this.unit                   = props.unit;
    this.enablePattern          = props.enablePattern
  }
  drawChart = selection => {
    // <editor-fold desc="Descruct this">
    let {
      height,
      width,
      colors,
      data,
      margin,
      yDomain,
      xAccessor,
      yAccessor,
      range,
      xAxisFormator,
      legendText,
      threshold,
      missed,
      baseline,
      unit,
      enablePattern
    } = this;
    // </editor-fold>
    width = width - margin.left - margin.right;
    const svg = selection
      .append("svg")
      .call(attr, {
        height: height + margin.top + margin.bottom,
        width: width + margin.left + margin.right,
      })
      .append("g")
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // <editor-fold desc="draw defs for filling pattern">
    const pattern = svg.append('defs')
      .append('pattern')
      .attr('id', 'diagonalHatch')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 8)
      .attr('height', 8)
      .append('path')
      .attr('d', 'M-8,8 L8,-8 M0,8 l8,-8 M0,16 L16, 0')
      .attr('stroke',  enablePattern? colors[1] : '#642bb6')
      .attr('stroke-width', 2);
    // </editor-fold>

    const minDate = d3.timeDay.floor(range[0]);
    const maxDate = d3.timeDay.floor(range[1]);
    const dates = d3.timeDay
      .range(minDate, maxDate, 1)
      .map(d3.timeFormat('%b %d, %Y'));
    data = convertData(data.filter(d => d[xAccessor] >= +minDate && d[xAccessor] < +maxDate), yAccessor, xAccessor);
    if (missed) missed = findDates(missed.filter(d => d[xAccessor] >= +minDate && d[xAccessor] < +maxDate), xAccessor);
    const x = d3.scaleBand().domain(dates).range([0, width]).padding(0.3);
    const x1 = d3.scaleBand().domain(yAccessor).range([0, x.bandwidth()]).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]).domain(yDomain).nice();
    const xAxis = d3.
      axisBottom()
      .scale(x)
      .tickSize(0)
      .tickPadding(7)
      .tickFormat(d =>
        d3.timeFormat(DEFAULT_DATE_FORMAT_AXIS)
        (d3.timeParse(DEFAULT_DATE_FORMAT_STRING)(d))
      );
    const yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(-width)
      .ticks(10)
      .tickPadding(7);
    // <editor-fold desc="Draw Axis Groups">
    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    svg.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);
    svg.select('.axis--y>path').style('display', 'none');
    svg.selectAll('.axis--x text').each((d, i, nodes) => {
      if (i % 7 !== 0) {
        d3.select(nodes[i]).attr('display', 'none');
      }
    });
    // </editor-fold>
    // <editor-fold desc="Add axis unit">
    svg.append('g')
      .attr('class', 'axis-unit')
      .append('text')
      .text(unit)
      .call(attr, {
        'x': 0,
        'y': -15,
        'text-anchor': 'end'
      });
    // </editor-fold>
    // <editor-fold desc="Draw threshold">
    svg.append('g')
      .attr('class', 'thresholds');
    drawThreshold(svg, threshold, colors, y, yAccessor, width);
    // </editor-fold>
    // <editor-fold desc="Draw Baseline">
    svg
      .append('g')
      .attr('class', 'baseline');
    drawBaseline(svg, baseline, y, width);
    // </editor-fold>
    const main = svg.append("g").attr("class", "main");
    const barGroups = main
      .selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('class', (d, i) => formatClassName(yAccessor[i]))
        .attr('transform', (d, i) => `translate(${x1(yAccessor[i])}, 0)`)
      .attr('fill', (d, i) => enablePattern && i === 1? 'url(#diagonalHatch)' : colors[i])
      .attr('stroke-width', 1)
      .attr('stroke', (d, i) => colors[i]);

    barGroups
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .call(attr, {
        'x': d => x(d.date),
        'y': d => y(d.max),
        'width': x1.bandwidth(),
        'height': d => {
          const height = y(d.min) - y(d.max);
          return height === 0? 1 : height;
        }
      });

    // <editor-fold desc="Draw Missed Data">
    if (missed) {
      svg.append('g')
        .attr('class', 'missed')
        .selectAll('path')
        .data(missed)
        .enter().append('path')
        .call(attr, {
          'd': d3.symbol().type(d3.symbolTriangle).size(30),
          'transform': d => `translate(${x(d) + x.bandwidth() / 2}, ${height})`,
          'fill': '#e95c69'
        });
    }
    // </editor-fold>

    // <editor-fold desc="Draw legends">
    let legendsData = yAccessor.map((d, i) => ({
      text: legendText[i],
      key: d,
      path: d3.symbol().type(d3.symbolSquare).size(100),
      textStyle: DEFAULT_LINE_LEGEND_TEXT_STYLE,
      pathStyle: {
        stroke: colors[i],
        'stroke-width': 1,
        'fill': enablePattern && i === 1? 'url(#diagonalHatch)' : colors[i]
      }
    }));
    if (missed) {
      legendsData = legendsData.concat({
        text         : 'Missed Reading',
        key          : 'missed',
        path         : d3.symbol().type(d3.symbolTriangle).size(30),
        textStyle    : DEFAULT_LINE_LEGEND_TEXT_STYLE,
        pathStyle    : {...DEFAULT_LINE_MISSED_STYLE}
      });
    }
    if (this.baseline) {
      legendsData = legendsData.concat({
        text         : baseline.legendText || 'Baseline',
        key          : 'baseline',
        path         : 'M0, 0 L25,0',
        textStyle    : DEFAULT_LINE_LEGEND_TEXT_STYLE,
        pathStyle    : {
          ...DEFAULT_BASELINE_STYLE,
          ...baseline.lineStyle || {}
        }
      });
    }
    svg.call(drawLegend, legendsData, height, width);
    // </editor-fold>

  }
};

function convertData(raw, yAccessor, xAccessor) {
  const data = raw.map(d => ({
    ...d,
    date: d3.timeFormat(DEFAULT_DATE_FORMAT_STRING)(
      d3.timeDay.floor(new Date(d[xAccessor]))
    )
  }));
  const datesGroup = d3.nest().key(d => d.date).object(data);
  return yAccessor.map(key => (
    Object.keys(datesGroup).map(date => {
      const arr = datesGroup[date];
      const min = d3.min(arr, d => d[key]);
      const max = d3.max(arr, d => d[key]);
      return { min, max, date };
    }))
  )
}

function findDates(raw, xAccessor) {
  return raw.map(d => d3.timeFormat(DEFAULT_DATE_FORMAT_STRING)(
    d3.timeDay.floor(new Date(d[xAccessor]))
  ));
}