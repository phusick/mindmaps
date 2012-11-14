define([
  "dojo/_base/declare"
], function(
  declare
) {

var NodeMap = declare(null, {

  /**
   * Creates a new NodeMap object. Map implementation for nodes. The key is
   * automatically set to the node id.
   * 
   * @constructor
   */
  constructor: function() {
    this.nodes = {};
    this.count = 0;
  },
  
  /**
   * Return a node by its ID.
   * 
   * @param {String} nodeId
   * @returns {Node}
   */
  get: function(nodeId) {
    return this.nodes[nodeId];
  },
  
  /**
   * Adds a node to the map if it hasn't been added before.
   * 
   * @param {Node} node
   * @returns {Boolean} true if added, false otherwise.
   */
  add: function(node) {
    if (!this.nodes.hasOwnProperty(node.id)) {
      this.nodes[node.id] = node;
      this.count++;
      return true;
    }
    return false;
  },
  
  /**
   * Removes a node from the map.
   * 
   * @param {Node} node
   * @returns {Boolean} true if removed, false otherwise.
   */  
  remove: function(node) {
    if (this.nodes.hasOwnProperty(node.id)) {
      delete this.nodes[node.id];
      this.count--;
      return true;
    }
    return false;
  },
  
  /**
   * Returns the number of nodes in the map.
   * 
   * @returns {Number}
   */
  size: function() {
    return this.count;
  },
  
  /**
   * Returns all nodes in the map.
   * 
   * @returns {Array}
   */
  values: function() {
    // HACK make it JS 1.5 compatible
    return Object.keys(this.nodes).map(function(key) {
      return this.nodes[key];
    }, this);
  },
  
  /**
   * Iterator for nodes.
   * 
   * @param {Function} callback, first argument should be the node.
   */
  each: function(callback) {
    for (var id in this.nodes) {
      callback(this.nodes[id]);
    }
  }

});

return NodeMap;

});