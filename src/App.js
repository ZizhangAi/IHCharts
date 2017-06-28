import React, { Component } from 'react';
import LineChart from "./LineChart";
import GroupedBarChart from './GroupedBarChart'
import * as d3 from 'd3';

export default class App extends Component {
  // state = {props: {
  //   data: [
  //     {date: 1495956110693, 'dbp': 78, sbp: 110},
  //     {date: 1495956210000, 'dbp': 90, sbp: 104},
  //     {date: 1495956280693, 'dbp': 81, sbp: 122}],
  //   xAccessor: 'date',
  //   yAccessor: ['dbp', 'sbp'],
  //   legendText: ['dbp', 'sbp'],
  //   colors: ['salmon', 'teal'],
  //   height: 300
  // } }
  /*
  componentDidMount() {
    setTimeout(() =>
      this.setState({ props: {
        data: returnBP(),
        // yTicks: [10, 20],
        isYFrom0: true,
        xAxisFormator: '%b %-d',
        margin: { top: 150, right: 150, bottom: 150, left: 150 },
        xAccessor: 'date',
        yAccessor: ['systolic_blood_pressure', 'diastolic_blood_pressure'],
        tooltipTextBg: d => d.taskStatus === 'MISSED'? '#dcdcdc': d.severity === 'CRITICAL'? '#e95c69' : d.severity === 'RISK'? '#e89b5c' : '#64c2b1',
        tooltipDateFormator: '%H:%M %b %d',
        tooltipReadingFormat: d => `${d.systolic_blood_pressure}/${d.diastolic_blood_pressure} mmol`,
        tooltipReadingTexFill: d => d.taskStatus === 'MISSED'? '#363b4e' : 'white',
        threshold: [[90, 110], [65, 95]],
        range:[1490976000000, 1494345600000],
        lineStyle: [{'stroke-dasharray': '5 3 5'}, {'stroke-dasharray':'1 1'}],
        xTicks: d3.timeDay.range(new Date(1490976000000), new Date(1494345600000)).map(d => +d),
        legendText: ['Systolic', 'Diastolic'],
        colors: ['#7845c2', '#21a0f4'],
        height: 300,
        missed: returnBPMissed(),
        baseline: {
          text: 'Baseline value is this much',
          value: 60,
          // lineStyle: { stroke: '#d503d3', 'stroke-width': '2px', 'stroke-dasharray': '5 2'},
          legendText: 'Baseline'
        }
      } }), 3000);
    setTimeout(() => this.setState({ props: {
      data: returnBP().splice(3,4),
      // yTicks: [10, 20],
      yDomain: [0, 500],
      isYFrom0: true,
      xAxisFormator: '%b %-d',
      xAccessor: 'date',
      yAccessor: ['systolic_blood_pressure', 'diastolic_blood_pressure'],
      threshold: [[90, 110], [65, 95]],
      range:[1490976000000, 1494345600000],
      xTicks: d3.timeDay.range(new Date(1490976000000), new Date(1494345600000)).map(d => +d),
      legendText: ['sys', 'Diastolic'],
      colors: ['#7845c2', '#21a0f4'],
      height: 300,
      missed: returnBPMissed().splice(3,6),
      baseline: {
        text: 'Baseline value is this much',
        value: 190,
        lineStyle: { stroke: 'green', 'stroke-width': '5px', 'stroke-dasharray': '7 2'},
        legendText: 'Baseline 80kg'
      }
    }}), 1000);
  }
  */

  state = { props: {
    height: 300,
    colors: ['#21a0f4', '#7845c2'],
    data: returnBP(),
    yDomain: [0, 200],
    xAccessor: 'date',
    yAccessor: ['systolic_blood_pressure', 'diastolic_blood_pressure'],
    range: [1490976000000, 1493568000000],
    legendText: ['Systolic', 'Diastolic'],
    baseline: {
      value: 80,
      legendText: 'Baseline (80kg)'
    },
    threshold: [[60, 80],[30, 50]],
    missed: returnBPMissed(),
    unit: 'bpm',
    enablePattern: true
  }}
  render() {
    // return <LineChart {...this.state.props}/>
    return <GroupedBarChart {...this.state.props}/>
  }
}
function returnBP() {
  return [
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491008400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491024600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 89,
      "diastolic_blood_pressure": 60,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491037800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 150,
      "diastolic_blood_pressure": 121,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491098400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491115800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 122,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491134400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491181200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491197400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 58,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491235199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491271200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 112,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491288600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491307200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491361200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491407999999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491388200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 76,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491440400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491456600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 85,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491469800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 57,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491530400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491547800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491580799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491613200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 75,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491629400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 98,
      "diastolic_blood_pressure": 65,
      "severityDetail": "LOW"
    },
    {
      "date": 1491667199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491706800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 61,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491714000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491733800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491789600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491807000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491825600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1491872400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491888600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491901800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491958800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491975000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 99,
      "diastolic_blood_pressure": 68,
      "severityDetail": "LOW"
    },
    {
      "date": 1491988200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1492048800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 59,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492066200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 122,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492084800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492131600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 155,
      "diastolic_blood_pressure": 125,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492147800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 58,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492185599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492221600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 112,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492239000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492257600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492311600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492358399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492338600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 133,
      "diastolic_blood_pressure": 118,
      "severityDetail": "HIGH"
    },
    {
      "date": 1492390800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492407000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 85,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492420200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 109,
      "diastolic_blood_pressure": 69,
      "severityDetail": "LOW"
    },
    {
      "date": 1492480800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492498200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492516800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492563600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492579800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 98,
      "diastolic_blood_pressure": 65,
      "severityDetail": "LOW"
    },
    {
      "date": 1492617599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492657200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 61,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492664400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 117,
      "diastolic_blood_pressure": 77,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492684200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492740000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492757400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492776000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1492822800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492839000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492852200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492912800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 59,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492963199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492948800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1492995600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 155,
      "diastolic_blood_pressure": 125,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493011800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 99,
      "diastolic_blood_pressure": 68,
      "severityDetail": "LOW"
    },
    {
      "date": 1493025000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493085600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 128,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493103000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1493121600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493175600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493182800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493202600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493262000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493269200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 117,
      "diastolic_blood_pressure": 77,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493308799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1493348400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1493355600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493375400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 56,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1493481599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1493442000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493461800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493521200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493528400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493548200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493607600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493614800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493634600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    }
  ].filter(d => d.taskStatus !== 'MISSED');
}
// <editor-fold desc="Return only one valid reading">
// function returnBP() {
//   return [
//     // {
//     //   "date": 1493375400000,
//     //   "taskStatus": "COMPLETED",
//     //   "measure": {
//     //     "user_notes": null
//     //   },
//     //   "severity": "CRITICAL",
//     //   "systolic_blood_pressure": 88,
//     //   "diastolic_blood_pressure": 56,
//     //   "severityDetail": "CRITICAL_LOW"
//     // }
//   ].filter(d => d.taskStatus !== 'MISSED');
// }
// </editor-fold>
function returnBPMissed() {
  return [
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495814399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495900799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1495987199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491008400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491024600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 89,
      "diastolic_blood_pressure": 60,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491037800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 150,
      "diastolic_blood_pressure": 121,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491098400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491115800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 122,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491134400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491181200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491197400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 58,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491235199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491271200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 112,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491288600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491307200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491361200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491407999999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491388200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 76,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491440400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491456600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 85,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491469800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 57,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491530400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491547800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491580799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491613200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 75,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491629400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 98,
      "diastolic_blood_pressure": 65,
      "severityDetail": "LOW"
    },
    {
      "date": 1491667199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1491706800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 61,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491714000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491733800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1491789600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491807000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1491825600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1491872400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491888600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491901800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491958800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1491975000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 99,
      "diastolic_blood_pressure": 68,
      "severityDetail": "LOW"
    },
    {
      "date": 1491988200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1492048800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 59,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492066200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 122,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492084800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492131600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 155,
      "diastolic_blood_pressure": 125,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492147800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 58,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492185599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492221600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 112,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492239000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492257600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492311600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 121,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492358399999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492338600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 133,
      "diastolic_blood_pressure": 118,
      "severityDetail": "HIGH"
    },
    {
      "date": 1492390800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492407000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 85,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492420200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 109,
      "diastolic_blood_pressure": 69,
      "severityDetail": "LOW"
    },
    {
      "date": 1492480800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492498200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492516800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492563600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492579800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 98,
      "diastolic_blood_pressure": 65,
      "severityDetail": "LOW"
    },
    {
      "date": 1492617599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492657200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 78,
      "diastolic_blood_pressure": 61,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492664400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 117,
      "diastolic_blood_pressure": 77,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492684200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492740000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492757400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 158,
      "diastolic_blood_pressure": 123,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1492776000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1492822800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 120,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492839000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 130,
      "diastolic_blood_pressure": 80,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492852200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1492912800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 85,
      "diastolic_blood_pressure": 59,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1492963199999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1492948800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1492995600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 155,
      "diastolic_blood_pressure": 125,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493011800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 99,
      "diastolic_blood_pressure": 68,
      "severityDetail": "LOW"
    },
    {
      "date": 1493025000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493085600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 128,
      "diastolic_blood_pressure": 89,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493103000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 55,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1493121600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 160,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493175600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493182800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493202600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493262000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 87,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493269200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 117,
      "diastolic_blood_pressure": 77,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493308799999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1493348400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 102,
      "diastolic_blood_pressure": 66,
      "severityDetail": "LOW"
    },
    {
      "date": 1493355600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493375400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 88,
      "diastolic_blood_pressure": 56,
      "severityDetail": "CRITICAL_LOW"
    },
    {
      "date": 1493481599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1493442000000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "CRITICAL",
      "systolic_blood_pressure": 153,
      "diastolic_blood_pressure": 122,
      "severityDetail": "CRITICAL_HIGH"
    },
    {
      "date": 1493461800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493521200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 123,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493528400000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 95,
      "diastolic_blood_pressure": 61,
      "severityDetail": "LOW"
    },
    {
      "date": 1493548200000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "RISK",
      "systolic_blood_pressure": 145,
      "diastolic_blood_pressure": 98,
      "severityDetail": "HIGH"
    },
    {
      "date": 1493607600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 129,
      "diastolic_blood_pressure": 88,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493614800000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 115,
      "diastolic_blood_pressure": 79,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1493634600000,
      "taskStatus": "COMPLETED",
      "measure": {
        "user_notes": null
      },
      "severity": "NORMAL",
      "systolic_blood_pressure": 125,
      "diastolic_blood_pressure": 90,
      "severityDetail": "NORMAL"
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    },
    {
      "date": 1496073599999,
      "taskStatus": "MISSED",
      "measure": null,
      "severity": "MISSED",
      "systolic_blood_pressure": null,
      "diastolic_blood_pressure": null,
      "severityDetail": null
    }
  ].filter(d => d.taskStatus === 'MISSED');
}