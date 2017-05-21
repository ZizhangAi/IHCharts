# IHChart
This library intends to provide some basic types of charts to display health data.
It now only covers static ECG chart, mainly for reports rendered at server site. 
It will later covers other types with interaction.
 
 The underlying library is `d3.js`.
 
 ##ECG Chart
 Compulsory property: `data`. Properties like `range` will be inferred from `data`. 
 The date range will be rounded to the nearest multiple of 200ms. 
 If all other properties are ignored, default values will apply.
 The default y domain is [-2.2, 2.8], the default x domain is 8 seconds which is also the minimum allowed value.
 
 An exmpale:
```js
  <ECGChart
    data={[{date: 1494766666017, value: -2.2}, {date: 1494766670017, value: -1.2}, { date: 1494766676017, value: 2.8}]}
    line={{style: {'stroke-width': '5px', 'stroke': 'salmon', 'stroke-dasharray': '5'}}}
    margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
    markers={[{date: 1494766666017, label: 'Today'}]}
    width={window.innerWidth}
    upperLeftLabel="Upper Left"
    upperRightLabel="Upper Right"
    lowerLeftLabel="Lower Left"
    lowerRightLabel="Lower Right"
    legend="Abnormal Point"
  />
```
##TO DO
- Provide more options of ECG Charts to user if necessary.
- Complete other types of charts.