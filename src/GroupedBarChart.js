import React, { Component } from 'react';
import * as d3 from 'd3';
import { drawGroupedBar } from './charts/GroupedBarChart';
import './charts/css/lineChart.css'

class GroupedBarChart extends Component {
  componentDidMount() {
    this.redrawChart();
  }
  componentDidUpdate() {
    this.redrawChart();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.functionRef);
  }
  redrawChart = () => {
    d3.select(this._container).selectAll('*').remove();
    window.removeEventListener('resize', this.functionRef);
    const width = this._container.offsetWidth;
    this.groupedBarChart = new drawGroupedBar({...this.props, width});
    d3.select(this._container)
      .call(this.groupedBarChart.drawChart);
    this.functionRef = debounce(this.redrawChart, 200);
    window.addEventListener('resize', this.functionRef);
  }
  render() {
    return (
      <div ref={node => {
        this._container = node
      }} style={{"margin": "auto"}} >
      </div>);
  }
}
export default GroupedBarChart;

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
