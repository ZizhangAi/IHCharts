import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import generateChart from './charts/ECGChart';

class ECGChart extends Component {
  componentDidMount() {
    const ECGChart = generateChart(this.props);
    d3.select(this._container)
      .call(ECGChart);
  }
  render() {
    return (
      <div ref={node => {
        this._container = node
      }} style={{"margin": "auto"}} >
      </div>);
  }
}

export default ECGChart;