/**
 * Created by zizhangai on 5/27/17.
 */
import * as d3 from "d3";
import {
  formatClassName,
  drawLegend,
  createToolTip,
  setTooltip,
  drawThreshold,
  attr,
  drawBaseline,
  removeAllAttrs,
  findYExtent,
  findRange
} from "../utils/utils";
import {
  DEFAULT_LINE_LEGEND_PATH_STYLE,
  DEFAULT_LINE_LEGEND_TEXT_STYLE,
  DEFAULT_LINE_MISSED_STYLE,
  DEFAULT_BASELINE_STYLE,
  DEFAULT_LINE_SERIES_STYLE,
  DEFAULT_CIRCLE_STYLE
} from "../utils/consts";

export class drawNewLine {
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
    this.xTicks                 = props.xTicks || [];
    this.yTicks                 = props.yTicks || [];
    this.isYFrom0               = props.isYFrom0 !== false;
    this.xAxisFormator          = props.xAxisFormator;
    this.legendText             = props.legendText || props.yAccessor;
    this.threshold              = props.threshold || [];
    this.missed                 = props.missed;
    this.baseline               = props.baseline;
    this.lineStyle              = props.lineStyle || [];
    this.tooltipTextBg          = props.tooltipTextBg || (() => 'transparent');
    this.tooltipDateFormator    = props.tooltipDateFormator || '%H:%M %b %d';
    this.tooltipReadingFormat   = props.tooltipReadingFormat || ((d) => '');
    this.tooltipReadingTexFill  = props.tooltipReadingTexFill || (() => 'black');
  };
  drawLine = selection => {
    this.line = d3.line();
    this.svg = selection
      .append("svg")
      .append("g");
    // <editor-fold desc="Draw Axis Groups">
    this.svg.append("g").attr("class", "axis axis--x");
    this.svg.append("g").attr("class", "axis axis--y");
    // </editor-fold>
    // <editor-fold desc="Draw threshold">
    this.svg.append('g')
      .attr('class', 'thresholds');
    // </editor-fold>
    // <editor-fold desc="Draw Baseline">
    this.svg
      .append('g')
      .attr('class', 'baseline');
    // </editor-fold>
    // <editor-fold desc="Draw Tooltip">
    this.tooltip = createToolTip(this.svg);
    // </editor-fold>
    this.main = this.svg.append("g").attr("class", "main");
    // <editor-fold desc="Draw Missed Data">
    this.svg.append('g')
      .attr('class', 'missed');
    // </editor-fold>
    this.updateChart({
      height                  : this.height,
      width                   : this.width,
      colors                  : this.colors,
      data                    : this.data,
      margin                  : this.margin,
      yDomain                 : this.yDomain,
      xAccessor               : this.xAccessor,
      yAccessor               : this.yAccessor,
      range                   : this.range,
      xTicks                  : this.xTicks,
      yTicks                  : this.yTicks,
      isYFrom0                : this.isYFrom0,
      xAxisFormator           : this.xAxisFormator,
      legendText              : this.legendText,
      threshold               : this.threshold,
      missed                  : this.missed,
      baseline                : this.baseline,
      lineStyle               : this.lineStyle,
      tooltipTextBg           : this.tooltipTextBg,
      tooltipDateFormator     : this.tooltipDateFormator,
      tooltipReadingFormat    : this.tooltipReadingFormat,
      tooltipReadingTexFill   : this.tooltipReadingTexFill
    });
  };
  updateChart = newProps => {
    this.setProps(newProps);
    // <editor-fold desc="Define">
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
      xTicks,
      yTicks,
      x,
      y,
      xAxis,
      yAxis,
      svg,
      line,
      main,
      tooltip,
      setProps,
      isYFrom0,
      xAxisFormator,
      legendText,
      threshold,
      missed,
      baseline,
      lineStyle,
      tooltipTextBg,
      tooltipDateFormator,
      tooltipReadingFormat,
      tooltipReadingTexFill
    } = this;
    // </editor-fold>
    width = width - margin.left - margin.right;
    yDomain = findYExtent(
      data,
      yDomain,
      yAccessor,
      yTicks,
      isYFrom0,
      threshold,
      baseline? baseline.value : null
    );
    x = d3.scaleTime().range([0, width]);
    y = d3.scaleLinear().domain(yDomain).range([height, 0]);
    xAxis = d3.axisBottom(x).tickPadding(9);
    yAxis = d3.axisLeft(y).tickPadding(9);
    if (xAxisFormator) {
      xAxis.tickFormat(d3.timeFormat(xAxisFormator));
    }
    range = findRange(data, missed, xAccessor, xTicks, range);
    data = data.filter(
      d => d[xAccessor] >= range[0] && d[xAccessor] <= range[1]
    );
    if (missed) {
      missed = missed.filter(
        d => d[xAccessor] >= range[0] && d[xAccessor] <= range[1]
      );
    }
    yAccessor = yAccessor.constructor === Array ? yAccessor : [yAccessor];

    d3
      .select(svg.node().parentNode)
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right);
    svg
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    if (xTicks.length > 0) {
      x.domain(range).range([0, width]);
      xAxis.tickValues(xTicks.filter(t => t >= range[0] && t <= range[1]));
    } else {
      x.domain(range).range([0, width]);
    }
    if (yTicks.length > 0) {
      y.domain(yDomain).range([height, 0]);
      yAxis.tickValues(yTicks);
    } else {
      y.domain(yDomain).range([height, 0]).nice();
    }
    svg
      .select(".axis.axis--x")
      // .transition(t)
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis.tickSize(-height));
    svg
      .select(".axis.axis--y")
      // .transition(t)
      .call(yAxis.tickSize(-width));

    // <editor-fold desc="Remove cluttered axis labels"
    const labelTexts = svg
      .select('.axis--x')
      .selectAll('.tick text');
    const totalWidth = labelTexts.nodes()
      .reduce((acc, node) => acc + node.getBBox().width, 0);

    if (totalWidth > width) {
      labelTexts
        .filter((dom, i) => (i!== 0) && (i%7 !== 0))
        .attr('display', 'none');
    } else {
      labelTexts.attr('display', null);
    }
    // </editor-fold>
    // <editor-fold desc="draw threshold blocks">
    drawThreshold(svg, threshold, colors, y, yAccessor, width);
    // </editor-fold>
    // <editor-fold desc="draw baseline">
    drawBaseline(svg, baseline, y, width);
    // </editor-fold>
    // <editor-fold desc="draw line series">
    const mainGroups = main.selectAll("g.line-dots").data(yAccessor);

    // UPDATE
    // ENTER + UPDATE
    const allGroups = mainGroups
      .enter()
      .append("g")
      .merge(mainGroups)
      .attr("class", d => formatClassName(d) + " line-dots");
    // EXIT
    mainGroups.exit().remove();

    const lineDots = allGroups.selectAll("g").data(["line", "dots"]);

    const allLineDots = lineDots
      .enter()
      .append("g")
      .merge(lineDots)
      .attr("class", d => d);

    lineDots.exit().remove();

    const a = allLineDots.filter(function() {
      return d3.select(this).classed("line");
    });
    const lines = a.selectAll("path").data([data]);

    lines
      .enter()
      .append("path")
      .merge(lines)
      .each(function(d) {
        removeAllAttrs(this);
      })
      .call(attr, {
        ...DEFAULT_LINE_SERIES_STYLE,
        "d": function(d, i) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return line.x(s => x(s[xAccessor])).y(s => y(s[group]))(data);
        },
        stroke: function(d, i) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return colors[yAccessor.indexOf(group)];
        }
      })
      .each(function (d, i) {
        const idx = yAccessor.indexOf(d3.select(this.parentNode.parentNode).datum());
        d3.select(this).call(attr, lineStyle[idx] || {})
      });


    const b = allLineDots.filter(function() {
      return d3.select(this).classed("dots");
    });
    const dots = b.selectAll("circle").data(data);

    data.forEach(function(d, i) {
      d.nodes = [];
    });
    dots
      .enter()
      .append("circle")
      .merge(dots)
      .each(function(d) {
        d.nodes.push(this);
      })
      .call(attr, {
        ...DEFAULT_CIRCLE_STYLE,
        "class": 'dot',
        "r": 3,
        "cx": (d) => x(d[xAccessor]),
        "cy": function(d) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return y(d[group]);
        },
        'stroke': function(d) {
          const group = d3.select(this.parentNode.parentNode).datum();
          return colors[yAccessor.indexOf(group)];
        }
      });

    dots.exit().remove();
    // </editor-fold >

    // <editor-fold desc="Draw missed Data Points ">
    const missedData = svg.select('g.missed')
      .selectAll('path')
      .data(missed || []);
    // ENTER AND UPDATE
    missedData.enter()
      .append('path')
      .merge(missedData)
      .attr('d', d3.symbol().type(d3.symbolTriangle).size(30))
      .call(attr, DEFAULT_LINE_MISSED_STYLE)
      .attr('transform', d => `translate(${x(d[xAccessor])}, ${height})`);
    // </editor-fold>
    missedData.exit().remove();

    svg
      .selectAll("circle.dot")
      .on("mouseover", function(d) {
        tooltip.attr("display", null);
        const { nodes, ...rest } = d;
        setTooltip(rest, tooltip, x, xAccessor, height, tooltipTextBg,
          tooltipDateFormator,
          tooltipReadingFormat,
          tooltipReadingTexFill);
        d3.select(this.parentNode.parentNode).raise();
        d3.selectAll(d.nodes).raise().transition().attr("r", 6);
      })
      .on("mouseout", function(d) {
        tooltip.attr("display", "none");
        d3.selectAll(d.nodes).transition().attr("r", 3);
      });

    svg
      .select('g.missed')
      .selectAll('path')
      .on('mouseover', function(d) {
        tooltip.attr('display', null);
        setTooltip(d, tooltip, x, xAccessor, height, tooltipTextBg,
          tooltipDateFormator,
          tooltipReadingFormat,
          tooltipReadingTexFill);
        d3.select(this)
          .raise()
          .transition()
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(100));
      })
      .on('mouseout', function(d) {
        tooltip.attr('display', 'none');
        d3.select(this)
          .transition()
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(30));
      });
    // <editor-fold desc="Draw Legend">
    let legendsData = yAccessor.map((d, i) => ({
      text         : legendText[i],
      key          : d,
      path         : d3.symbol().type(d3.symbolCircle).size(40),
      textStyle    : DEFAULT_LINE_LEGEND_TEXT_STYLE,
      pathStyle    : {...DEFAULT_LINE_LEGEND_PATH_STYLE, stroke: colors[i]}
    }));
    if (this.missed) {
      legendsData = legendsData.concat({
        text         : 'Missed Reading',
        key          : 'missed',
        path         : d3.symbol().type(d3.symbolTriangle).size(30),
        textStyle    : DEFAULT_LINE_LEGEND_TEXT_STYLE,
        pathStyle    : {...DEFAULT_LINE_MISSED_STYLE}
      })
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
  };
}
