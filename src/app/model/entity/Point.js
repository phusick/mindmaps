define([
  "dojo/_base/declare"
], function(
  declare
) {

var Point = declare(null, {
  
  /**
   * @constructor
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   */
  constructor: function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  },
  
  /**
   * Clones the point.
   * 
   * @returns {Point}
   */
  clone: function() {
    return new Point(this.x, this.y);
  },
  
  /**
   * Adds a point to the point.
   * 
   * @param {Point} point
   */
  add: function(point) {
    this.x += point.x;
    this.y += point.y;
  },
  
  /**
   * Returns a String representation.
   * 
   * @returns {String}
   */
  toString: function() {
    return "{x: " + this.x + ", y: " + this.y + "}";
  }
  
});

/**
 * Returns a new point object from generic object.
 * 
 * @static
 * @param obj
 * @returns {Point}
 */
Point.fromObject = function(obj) {
  return new Point(obj.x, obj.y);
}

return Point;

});