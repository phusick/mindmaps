define([
  "dojo/_base/declare",
  "dojo/json",
  "app/model/NodeMap",
  "app/model/Node",
], function(
  declare,
  JSON,
  NodeMap,
  Node
) {

var MindMap = declare(null, {
  
  /**
   * Creates a new mind map.
   * 
   * @constructor
   * @param {Node} root
   * 
   */
  constructor: function(root) {
    /**
     * nodes is only used for quick lookup of a node by id. Each node must be 
     * registered in this map via createNode() or addNode(node).
     */
    this.nodes = new NodeMap();
    
    if (root) {
      this.root = root;
    } else {
      this.root = new Node();
      this.root.text.font.size = 20;
      this.root.text.font.weight = "bold";
      this.root.text.caption = "Central Idea";
    }
    
    this.addNode(this.root);
  },
  
  /**
   * Create a node and add to nodes map.
   * 
   * @returns {mindmaps.Node}
   */
  createNode: function() {
    var node = new Node();
    this.addNode(node);
    return node;
  },
  
  /**
   * Adds an existing node and all its children to the nodes map.
   * 
   * @param {mindmaps.Node} node
   */
  addNode: function(node) {
    this.nodes.add(node);

    // add all children
    var self = this;
    node.forEachDescendant(function(descendant) {
      self.nodes.add(descendant);
    });  
  },
  
  /**
   * Removes a node from the mind map. Severs tie to the parent.
   * 
   * @param {Node} node
   */
  removeNode: function(node) {
    // detach node from parent
    var parent = node.parent;
    parent.removeChild(node);

    // clear nodes table: remove node and its children
    var self = this;
    node.forEachDescendant(function(descendant) {
      self.nodes.remove(descendant);
    });

    this.nodes.remove(node);  
  },
  
  /**
   * Get the root of the mind map.
   * 
   * @returns {mindmaps.Node}
   */
  getRoot: function() {
    return this.root;
  },
  
  /**
   * Called by JSON.stringify().
   * 
   * @private
   * @returns {Object}
   */
  toJSON: function() {
    var object = {
      root: this.root
    };
    return object;
  },

  /**
   * Creates a JSON representation of the mind map.
   * 
   * @returns {String}
   */
  serialize: function() {
    return JSON.stringify(this);
  }
});

/**
 * Creates a new mind map object from JSON String.
 * 
 * @static
 * @param {String} json
 * @returns {mindmaps.MindMap}
 */
MindMap.fromJSON = function(json) {
  return MindMap.fromObject(JSON.parse(json));
}

/**
 * Creates a new mind map object from generic object.
 * 
 * @static
 * @param {Object} object
 * @returns {MindMap}
 */
MindMap.fromObject = function(object) {
  var root = Node.fromObject(object.root);
  var mindMap = new MindMap(root);

  // register all nodes in the map
  root.forEachDescendant(function(descendant) {
    mindMap.addNode(descendant);
  });

  return mindMap;
}

return MindMap;
  
});