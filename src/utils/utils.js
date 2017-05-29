/**
 * Created by zizhangai on 5/18/17.
 */
import * as d3 from 'd3';

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

export function drawLegend (svg, legendData, height, width, spaceInBetween = 50) {
  if (legendData.length === 0) return svg;
  const legendGroup = svg
    .append('g')
    .attr('class', 'legends');
  const legends = append
    .call(null, legendGroup, 'g', legendData);
  legends
    .append('path')
    .attr('d', d => typeof d.path === 'function'? d.path() : d.path)
    .each(function(d) {
      d3.select(this).call(attr, d.pathStyle);
    });
  legends
  .append('text')
  .text(d => d.text)
  .each(function(d) {
    d3.select(this).call(attr, { ...d.textStyle, x: '.6em' });
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
  return svg;
}
