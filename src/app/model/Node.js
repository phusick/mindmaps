define([
  "dojo/_base/declare",
  "./Point",
  "./NodeMap",
  "./util"
], function(
  declare,
  Point,
  NodeMap,
  util
) {

  var Node = declare(null, {
    
    /**
     * Creates a new node.
     * 
     * @contructor
     */
    constructor: function() {
      this.id = util.createUUID();
      this.parent = null;
      this.children = new NodeMap();
      this.text = {
        caption: "New Idea",
        font: {
          style: "normal",
          weight: "normal",
          decoration: "none",
          size: 15,
          color: "#000000"
        }
      };
      this.offset = new Point();
      this.foldChildren = false;
      this.branchColor = "#000000";
    },
    
    /**
     *
     */
    addChild: function(node) {
      node.parent = this;
      this.children.add(node);
    },
    
    /**
     * Creates a deep copy of this node, where all nodes have a new IDs
     * 
     * @returns {Node} the cloned node
     */
    clone: function() {
      var clone = new Node();
      var text = {
        caption: this.text.caption
      };
      
    },

    /**
     * Gets the caption for the node.
     * 
     * @returns {String}
     */
    getCaption: function() {
      return this.text.caption;
    },
    
    /**
     * Sets the caption for the node
     * 
     * @param {String} caption
     */
    setCaption: function(caption) {
      this.text.caption = caption;
    }
    
  });
  
  Node.fromJSON = function(json) {
    // TODO: implement
  }
  
  Node.fromObject = function(obj) {
    // TODO: implement
  }
  
  return Node;

});

