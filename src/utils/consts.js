/**
 * Created by zizhangai on 5/18/17.
 */
import * as d3 from 'd3';
export const DEFAULT_ECG_AXIS_ATTR = {
  'stroke'             : 'red',
  'stroke-width'       : '2px',
  // 'shape-rendering'    : 'crispEdges', // when used in report, the zooming will affect rendering.
  'opacity'            : 0.3
};
export const DEFAULT_ECG_GRID_ATTR = {
  'stroke'             : 'red',
  'stroke-width'       : '1px',
  // 'shape-rendering'    : 'crispEdges', // when used in report, the zooming will affect rendering.
  'opacity'            : 0.1
};
export const DEFAULT_ECG_LINE_ATTR = {
  'stroke'          : 'black',
  'stroke-width'    : '2px',
  'fill'            : 'none'
};
export const DEFAULT_ECG_CORNER_TEXT_ATTR = {
  'fill'         : 'black',
  'font-size'    : '15px',
  'dy'           : '.3em'
};
export const DEFAULT_ECG_MRKER_ATTR = {
  // 'd'               : d3.symbol().type(d3.symbolTriangle).size(30),
  'transform'       : 'rotate(180)',
  'stroke'          : 'crimson',
  'stroke-width'    : '2px',
  'fill'            : 'crimson'
};
export const DEFAULT_ECG_MIN_RANGE_EXTENT    = 8; // in seconds
export const DEFAULT_ECG_YDOMAIN             = [-2.2, 2.8];

export const DEFAULT_LINE_SERIES_STYLE = {
  'fill': 'none',
  'stroke-width': '2px'
};
export const DEFAULT_CIRCLE_STYLE = {
  'fill': 'white',
  'stroke-width': '2px'
};
export const DEFAULT_LINE_LEGEND_TEXT_STYLE = {
  'dy': '.3em'
};
export const DEFAULT_LINE_LEGEND_PATH_STYLE = {
  'fill': 'none',
  'stroke-width': '2px',
  'stroke': 'black'
};
export const DEFAULT_LINE_MISSED_STYLE = {
  'fill': '#e95c69',
  'stroke-width': '2px',
  'stroke': '#e95c69'
};
export const DEFAULT_BASELINE_STYLE = {
  'stroke-width': '2px',
  'stroke': '#d503d3',
  'stroke-dasharray': '4 2'
};
export const DEFAULT_MIN_EXTENT = 24 * 3600 * 1e3; // milliseconds in one day;
export const DEFAULT_Y_DOMAIN = [0, 1];