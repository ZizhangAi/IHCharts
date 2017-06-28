import React, { Component } from 'react';
import * as d3 from 'd3';
import { drawNewLine } from './charts/LineChart';
import './charts/css/lineChart.css'

class LineChart extends Component {
  componentDidMount() {
    const width = this._container.offsetWidth;
    this.lineChart = new drawNewLine({...this.props, width});
    d3.select(this._container)
      .call(this.lineChart.drawLine);
    this.functionRef = debounce(() =>
      this.lineChart.updateChart({
        ...this.props,
        width: this._container.offsetWidth
      }),
      200
    );
    window.addEventListener('resize', this.functionRef);
  }
  componentDidUpdate() {
    const width = this._container.offsetWidth;
    this.lineChart.updateChart({...this.props, width});
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.functionRef);
  }
  render() {
    return (
      <div ref={node => {
        this._container = node
      }} style={{"margin": "auto"}} >
      </div>);
  }
}
export default LineChart;

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