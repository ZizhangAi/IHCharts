import React, { Component } from 'react';
import * as d3 from 'd3';
import generateChart from './charts/LineChart';

class LineChart extends Component {
  componentDidMount() {
    this.lineChart = generateChart(this.props);
    d3.select(this._container)
      .call(this.lineChart);
  }
  componentDidUpdate() {
    // const lineChart = generateChart(this.props);
    // d3.select(this._container).selectAll('*').remove();
    // d3.select(this._container)
    //   .call(lineChart);
    // console.log('updated')
    // console.log(typeof this.lineChart.data)
    this.lineChart.data(this.props.data);
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