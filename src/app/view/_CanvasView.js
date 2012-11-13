define([
  "dojo/_base/declare",
  "dojo/dom",
  "dojo/dom-construct",
  "dijit/_WidgetBase"
], function(
  declare,
  dom,
  domContruct,
  _WidgetBase
) {

var _CanvasView = declare([_WidgetBase], {
  
  /**
   * Creates a new CanvasView. This is the base class for all canvas view
   * implementations
   * 
   * @constructor
   */
  constructor: function() {
    
  },
  
  buildRendering: function() {
    this.inherited(arguments);
    
    var drawNode = this.drawNode = domContruct.create("div");
    dom.setSelectable(drawNode, false);
    this.domNode.appendChild(drawNode);
  },
  
  /**
   * Scrolls the container to show the center of the drawing area.
   */
  center: function() {
    
  },
  
  /**
   * Scrolls the container.
   * 
   * @param {Number} x
   * @param {Number} y
   */
  scroll: function(x, y) {
    
  },
  
  /**
   * Changes the size of the drawing area to match with the new zoom factor
   * and scrolls the container to adjust the view port.
   */
  applyViewZoom: function() {
    
  },
  
  /**
   * Applies the new size according to current zoom factor.
   * 
   * @param {Integer} width
   * @param {Integer} height
   */
  setDimensions: function(width, height) {
    
  },

  /**
   * Sets the new zoom factor and stores the delta to the old one.
   * 
   * @param {Number} zoomFactor
   */
  setZoomFactor: function(zoomFactor) {
    
  },
  
  /**
   * Should draw the mind map onto the drawing area.
   * 
   * @param {mindmaps.MindMap} map
   */
  drawMap: function(map) {
    throw new Error("Not implemented");
  }
  
});

return _CanvasView;
  
});