import React, { Component } from 'react';
import LineChart from "./LineChart";

export default class App extends Component {
  state = {
    data: [
      {date: 1495956110693, dbp: 78, sbp: 110},
      {date: 1495956210000, dbp: 90, sbp: 104},
      {date: 1495956280693, dbp: 81, sbp: 122}]
  }
  componentDidMount() {
    setTimeout(() =>
      this.setState({
        data: [
          {date: 1495956010693, dbp: 78, sbp: 110},
          {date: 1495956210000, dbp: 20, sbp: 104},
          {date: 1495956480693, dbp: 99, sbp: 122}]
      }), 3000);
  }
  render() {
    return <LineChart
      data={this.state.data}
      xAccessor="date"
      yAccessor={['dbp', 'sbp']}
      colors={['salmon', 'teal']}
      height={300}
    />
  }
}