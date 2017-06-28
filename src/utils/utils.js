/**
 * Created by zizhangai on 5/18/17.
 */
import * as d3 from 'd3';
import { DEFAULT_BASELINE_STYLE,
  DEFAULT_MIN_EXTENT,
  DEFAULT_Y_DOMAIN
} from './consts'

export function style (selection, styleObj) {
  return Object
    .keys(styleObj)
    .reduce((acc, key) => acc.style(key, styleObj[key]), selection);
}

export function attr (selection, attrObj) {
  return Object
    .keys(attrObj)
    .reduce((acc, key) => acc.attr(key, attrObj[key]), selection);
}

export function append (selection, dom, data) {
  return selection
    .selectAll(dom)
    .data(data)
    .enter().append(dom);
}

export function findRange(
  data,
  missed,
  xAccessor,
  xTicks,
  range,
  minExtent = DEFAULT_MIN_EXTENT
) {
  if (range && range.length > 0) {
    return range;
  }
  if (data.length === 0 &&
    (!missed || missed.length === 0)) {
    const now = +new Date();
    return [now, now + DEFAULT_MIN_EXTENT];
  }
  const newDates = data.concat(missed || []).map(d => d[xAccessor]).concat(xTicks || []);
  const extent = d3.extent(newDates);
  if (extent[0] === extent[1]) {
    return [extent[0], extent[0] + minExtent];
  }
  return extent;
}

function combineRange(...pairs) {
  const min = d3.min(pairs.map(arr => arr[0]));
  const max = d3.max(pairs.map(arr => arr[1]));
  return [min, max];
}
export function findYExtent(
  data,
  domain,
  yAccessor,
  yTicks = [],
  isYFrom0,
  thresholds = [],
  baselineValue,
  defaultDomain = DEFAULT_Y_DOMAIN.slice()
) {
  if (!!domain) return domain;
  let newYAccessor = yAccessor.constructor === Array ? yAccessor : [yAccessor];
  let dataDomains = newYAccessor.map(key => d3.extent(data, d => d[key]));
  let tickDomains = d3.extent(yTicks);
  let thresholdDomains = combineRange(...thresholds);
  let yDomain = combineRange(
    ...dataDomains,
    tickDomains,
    thresholdDomains,
    [baselineValue, baselineValue]
  );
  if (yDomain[0] === void 0 || yDomain[1] === void 0) {
    return defaultDomain;
  }
  if (isYFrom0) {
    yDomain[0] = Math.min(0, yDomain[0]);
  }
  if (yDomain[0] === yDomain[1]) {
    return [yDomain[0] - 1, yDomain[1] + 1];
  }
  return yDomain;
}

export function drawThreshold (svg, threshold, colors, y, yAccessor, width) {
  svg.select('g.thresholds').selectAll('*').remove();
  const thresholdGroup = svg
    .select('g.thresholds');
  const thresholds = append
    .call(null, thresholdGroup, 'g', threshold)
    .attr('class', (d, i) => `threshold ${yAccessor[i]}`);
  thresholds
    .append('rect')
    .attr('x', 0)
    .attr('y', d => y(d[1]))
    .attr('width', width)
    .attr('height', d => y(d[0]) - y(d[1]))
    .attr('fill', (d, i) => colors[i])
    .attr('opacity', 0.3);

}

export function drawLegend (svg, legendData, height, width, spaceInBetween = 50) {
  if (legendData.length === 0) return svg;
  // remove if there exists legends.
  svg.select('g.legends').remove();
  const legendGroup = svg
    .append('g')
    .attr('class', 'legends');
  const legends = append
    .call(null, legendGroup, 'g', legendData)
    .attr('class', 'legend');
  legends
    .append('path')
    .attr('d', d => typeof d.path === 'function'? d.path() : d.path)
    .each(function(d) {
      d3.select(this).call(attr, d.pathStyle);
    });
  legends
  .append('text')
  .text(d => d.text)
  .each(function(d, i) {
    d3.select(this).call(attr, { ...d.textStyle, x: '.4em' });
    const labelWidth = legends.selectAll('path').nodes()[i].getBBox().width;
    d3.select(this).attr('transform', `translate(${labelWidth}, 0)`);
  });
  const widths = legends.nodes().map(d => d.getBBox().width);
  const translateX = [];
  widths.reduce((acc, d) => {
    translateX.push(acc);
    return acc + d + spaceInBetween;
  }, 0);
  const offset = (width - d3.sum(widths) -
    spaceInBetween * (legends.size() - 1)) / 2;
  legends
    .attr('transform', (d, i) => `translate(${translateX[i]}, 0)`);
  legendGroup
    .attr('transform', `translate(${offset}, ${height + 30})`);
  // <editor-fold desc="Add Mouse Action"
  // when hovering on a
  legends.attr('display', null);
  legendData.forEach(d => {
    svg.select(`g.${formatClassName(d.key)}`)
      .attr('display', null);
  });
  legendGroup
    .selectAll('g.legend')
    .on('mouseover', function(d, i, nodes) {
      d3.selectAll(nodes)
        .attr('opacity', 0.2);
      d3.select(this)
        .attr('opacity', 1);
      legendData.forEach(d => {
        svg.selectAll(`g.${formatClassName(d.key)}`)
          .attr('display', 'none');
      });
      svg.selectAll(`g.${formatClassName(d.key)}`)
        .attr('display', null);
    })
    .on('mouseout', function(d, i, nodes) {
      d3.selectAll(nodes)
        .attr('opacity', 1);
      legendData.forEach(d => {
        svg.selectAll(`g.${formatClassName(d.key)}`)
          .attr('display', null);
      });
    });
  // </editor-fold>

  return svg;
}

export function formatClassName (name) {
  return name.toLowerCase().split(' ').join('-');
}
export function createToolTip (svg) {
  let tooltip = svg
    .append("g")
    .attr("class", "tooltip")
    .attr("display", "none");
  tooltip.append("path");
  tooltip.append("rect").attr("x", 3).attr("y", -16).attr("height", 16);
  tooltip
    .append("text")
    .attr("class", "indicator")
    .attr("x", 3 * 2)
    .attr("dy", "-.35em");
  tooltip.append("text").attr("class", "time").attr("dy", "-.35em");
  tooltip
    .append("line");
  return tooltip;
}
export function setTooltip(
  d,
  tooltip,
  x,
  xAccessor,
  height,
  tooltipTextBg,
  tooltipDateFormator,
  tooltipReadingFormat,
  tooltipReadingTexFill
  ) {
  const t1 = tooltipReadingFormat(d);
  const t2 = d3.timeFormat(tooltipDateFormator)(d[xAccessor]);
  tooltip.select("text.indicator").text(t1);
  tooltip.select("text.time").text(t2);
  const t1Length = tooltip
    .select("text.indicator")
    .node()
    .getComputedTextLength();
  const t2Length = tooltip
    .select("text.time")
    .node()
    .getComputedTextLength();
  tooltip
    .select("text.indicator")
    .attr("fill", tooltipReadingTexFill(d));
  tooltip
    .select("rect")
    .attr("width", t1Length + 3 * 2)
    .attr("fill", tooltipTextBg(d));
  tooltip.select("text.time").attr("x", t1Length + 3 * 4);
  const l1 = (t1Length + t2Length - 10 + 3 * 3) / 2;
  tooltip.select("path").attr("d", drawPath(3, 16, l1, l1, 5, 10));
  tooltip
    .select("line")
    .attr("x1", l1 + 5 + 3)
    .attr("x2", l1 + 5 + 3)
    .attr("y1", height + 3 + 10)
    .attr("y2", 3 + 10);

  tooltip
    .transition()
    .duration(100)
    .attr(
      "transform",
      `translate(${x(d[xAccessor]) - (l1 + 5 + 3)}, ${-3 - 10})`
    );
}
function drawPath(r, h, l1, l2, x, y) {
  const arc = `a${r}, ${r} 0 0, 0`;
  return `M0, 0
          ${arc} ${r}, ${r} l${l1}, 0 l${x}, ${y} l${x}, -${y}
          l${l2} 0
          ${arc} ${r} -${r}
          l0 -${h}
          ${arc} -${r} -${r}
          l-${l1 + l2 + x + x}, 0
          ${arc} -${r} ${r}
          z`;
}

export function drawBaseline (svg, baselineData, y, width) {
  svg.select('g.baseline').selectAll('*').remove();
  if (!baselineData) return svg;
  const baselineAttr = {
    x1: 0,
    y1: y(baselineData.value),
    x2: width,
    y2: y(baselineData.value),
    ...DEFAULT_BASELINE_STYLE,
    ...baselineData.lineStyle || {}
  };
  svg.select('g.baseline').append('line').call(attr, baselineAttr);
}
// https://stackoverflow.com/questions/3593242/how-to-remove-all-attributes-from-body-with-js-or-jquery
export function removeAllAttrs(element) {
  for (let i= element.attributes.length; i-->0;)
    element.removeAttributeNode(element.attributes[i]);
}
