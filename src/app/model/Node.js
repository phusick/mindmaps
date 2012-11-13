define([
  "dojo/_base/declare",
  "./Point",
  "./NodeMap"
], function(
  declare,
  Point,
  NodeMap
) {

  var Node = declare(null, {
    
    /**
     * Creates a new node.
     * 
     * @contructor
     */
    constructor: function() {
      this.id = 0; // TODO: implement mindmaps.Util.getId();
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

