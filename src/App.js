import React, { Component } from 'react';
import LineChart from "./LineChart";

export default class App extends Component {
  state = {
    data: [
      {date: 1495956110693, dbp: 78, sbp: 110},
      {date: 1495956210000, dbp: 90, sbp: 104},
      {date: 1495956280693, dbp: 81, sbp: 122}],
    xAccessor: 'date',
    yAccessor: ['dbp', 'sbp'],
    colors: ['salmon', 'teal'],
    height: 300
  }
  componentDidMount() {
    setTimeout(() =>
      this.setState({
        data: [
          {time: 1495956010693, dbp: 78, sbp: 110},
          {time: 1495956210000, dbp: 20, sbp: 104},
          {time: 1495956480693, dbp: 99, sbp: 122}],
        xTicks: [1495955500693, 1495956210000, 1495956480693],
        yTicks: [0, 10, 130],
        xAccessor: 'time',
        yAccessor: ['dbp', 'sbp'],
        colors: ['green', 'grey'],
        height: 500,
        width: 600
      }), 3000);
  }
  render() {
    return <LineChart {...this.state}/>
  }
}
