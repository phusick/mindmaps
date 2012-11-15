define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/json",
  "./Point",
  "./NodeMap",
  "./util"
], function(
  declare,
  lang,
  JSON,
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
     * Adds a child to the node.
     * 
     * @param {Node} node
     */
    addChild: function(node) {
      node.parent = this;
      this.children.add(node);
    },
    
    /**
     * Removes a direct child.
     * 
     * @param {Node} node
     */
    removeChild: function(node) {
      node.parent = null;
      this.children.remove(node);
    },
    
    /**
     * Returns whether this node is a root
     * 
     * @returns {Boolean}
     */
    isRoot: function() {
      return this.parent === null;
    },
    
    /**
     * Returns whether this node is a leaf.
     * 
     * @returns {Boolean}
     */
    isLeaf: function() {
      return this.children.size() === 0;
    },
    
    /**
     * Creates a deep copy of this node, where all nodes have a new IDs
     * 
     * @returns {Node} the cloned node
     */
    clone: function() {
      var clone = lang.clone(this);
      clone.id = util.createUUID();
      // HACK should clone children
      return clone;
    },
    
    /**
     * Returns a presentation of this node and its children ready for serialization.
     * Called by JSON.stringify();
     * 
     * @private
     */
    toJSON: function() {
      // TODO see if we cant improve this
      // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
      // copy all children into array
      var self = this;
      var children = (function() {
        var result = [];
        self.forEachChild(function(child) {
          result.push(child.toJSON());
        });
        return result;
      })();
      
      var object = {
        id: this.id,
        // store parent as id since we have to avoid circular references
        parendId: this.parent ? this.parent.id : null,
        text: this.text,
        offset: this.offset,
        foldChildren: this.foldChildren,
        branchColor: this.branchColor,
        children: children
      };
      
      return object;
    },
    
    /**
     * Creates a JSON representation of the node.
     * 
     * @returns {String}
     */
    serialize: function() {
      return JSON.stringify(this);
    },
    
    /**
     * Returns the parent node.
     * 
     * @returns {Node}
     */
    getParent: function() {
      return this.parent;
    },
    
    /**
     * Returns the root if this node is part of a tree structure, otherwise it
     * returns itself.
     * 
     * @returns {Node} The root of the tree structure.
     */
    getRoot: function() {
      var root = this;
      while(root.parent) {
        root = root.parent;
      }
      return root;
    },
    
    /**
     * Gets the position of the node relative to the root.
     * 
     * @returns {Point}
     */
    getPosition: function() {
      var position = this.offset.clone();
      var node = this.parent;
      
      while(node) {
        position.add(node.offset);
        node = node.parent;
      }
      
      return position;
    },
    
    /**
     * Gets the depth of the node. Root has a depth of 0.
     * 
     * @returns {Number}
     */
    getDepth: function() {
      var node = this.parent;
      var depth = 0;
      
      while(node) {
        depth++;
        node = node.parent;
      }
      
      return depth;
    },
        
    /**
     * Iterator. Traverses all child nodes.
     * 
     * @param {Funtion} func
     */
    forEachChild: function(func) {
      this.children.each(func);
    },
    
    /**
     * Iterator. Traverses all child nodes recursively.
     * 
     * @param {Function} func
     */
    forEachDescendant: function(func) {
      this.children.each(function(node) {
        func(node);
        node.forEachDescendant(func);
      });
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
    },
    
    /**
     * Tests (depth-first) whether the order node is a descendant of the node.
     * 
     * @param {Node} other
     * @returns {Boolean} true is descendant, false otherwise
     */
    isDescendant: function(other) {
      function test(node) {
        var children = node.children.values();
        for (var i = 0, len = children.length; i < len; i++) {
          var child = children[i];
          
          if (test(child)) { return true; }
          if (child === other) { return true; }
          
          return false;
        }
      }
      
      return test(this);
    }
    
  });
  
  /**
   * Creates a new node object from JSON string.
   * 
   * @param {String} json
   * @returns {Node}
   */
  Node.fromJSON = function(json) {
    return Node.fromObject(JSON.parse(json));
  }
  
  /**
   * Creates a new node object from a generic object.
   * 
   * @param {Object} object
   * @returns {Node}
   */
  Node.fromObject = function(object) {
    var node = new Node();
    node.id = object.id;
    node.text = object.text;
    node.offset = Point.fromObject(object.offset);
    node.foldChildren = object.foldChildren;
    node.branchColor = object.branchColor;
    
    // extract all children from array of objects
    object.children.forEach(function(child) {
      var childNode = Node.fromObject(child);
      node.addChild(childNode);
    });
    
    return node;
  }
  
  return Node;

});

