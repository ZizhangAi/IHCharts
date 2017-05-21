/**
 * Created by zizhangai on 5/18/17.
 */
import * as d3 from 'd3';
export const DEFAULT_ECG_AXIS_ATTR = {
  'stroke'             : 'red',
  'stroke-width'       : '2px',
  'shape-rendering'    : 'crispEdges',
  'opacity'            : 0.3
};
export const DEFAULT_ECG_GRID_ATTR = {
  'stroke'             : 'red',
  'stroke-width'       : '1px',
  'shape-rendering'    : 'crispEdges',
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
  'd'               : d3.symbol().type(d3.symbolTriangle).size(30),
  'transform'       : 'rotate(180)',
  'stroke'          : 'crimson',
  'stroke-width'    : '2px',
  'fill'            : 'crimson'
};
export const DEFAULT_ECG_MIN_RANGE_EXTENT    = 8; // in seconds
export const DEFAULT_ECG_YDOMAIN             = [-2.2, 2.8];

