define([
  "dojo/_base/declare",
  "dojo/json",
  "./Point",
  "./util"
], function(
  declare,
  JSON,
  Point,
  modelUtil
) {
  
  var Document = declare(null, {
    
    /**
     * Creates a new Document.
     * 
     * @constructor
     */
    constructor: function() {
      this.id = modelUtil.createUUID();
      this.title = "New Document";
      // TODO implement MindMap
      // this.mindmap = new MindMap();
      this.dates = {
        created: new Date(),
        modified: null
      };
      this.dimensions = new Point(4000, 2000);
      this.autosave = false;
    },
    
    /**
     * Called by JSON.stringify().
     * 
     * @private
     */
    toJSON: function() {
      var dates = {
        created : this.dates.created.getTime()
      };

      if (this.dates.modified) {
        dates.modified = this.dates.modified.getTime();
      }

      return {
        id : this.id,
        title : this.title,
        mindmap : this.mindmap,
        dates : dates,
        dimensions : this.dimensions,
        autosave: this.autosave
      };
    },
    
    /*
     * Returns a JSON representation of the object.
     * 
     * @returns {String} the json.
     */
    serialize: function() {
      return JSON.stringify(this);
    },
    
    /**
     * Updates modified data and title for saving.
     */
    prepareSave: function() {
      this.dates.modified = new Date();
      this.title = "modified title"; // HACK this.mindmap.getRoot().getCaption();
      return this;
    },
    
    /**
     * Returns the created date.
     * 
     * @returns {Date}
     */
    getCreatedDate: function() {
      return this.dates.created;
    },
    
    /**
     * Tells whether this document is considered as "new", that is has not
     * been saved yet.
     * 
     * @returns {Boolean}
     */
    isNew: function() {
      return this.dates.modified === null;
    },
    
    /**
     * Gets the width of the document.
     * 
     * @returns {Number}
     */
    getWidth: function() {
      return this.dimensions.x;
    },
    
    /**
     * Gets the height of the document.
     * 
     * @returns {Number}
     */    
    getHeight: function() {
      return this.dimensions.y;
    },
    
    isAutosave: function() {
      return this.autosave;
    },
   
    /**
     * Sets autosave setting.
     *
     * @param {Boolean}
     */
    setAutosave: function(bool) {
      this.autosave = bool;
    }
    
  });
  
  /**
   * Creates a new document object from a JSON string.
   * 
   * @static
   * @param {String} json
   * @returns {Document}
   */
  Document.fromJSON = function(json) {
    return Document.fromObject(JSON.parse(json));
  };
  
  /**
   * Creates a new document object from a generic object.
   * 
   * @static
   * @param {Object} object
   * @returns {Document}
   */
  Document.fromObject = function (object) {
    var doc = new Document();
    doc.id = object.id;
    doc.title = object.title;
    //doc.mindmap = MindMap.fromObject(object.mindmap);
    doc.dates = {
      created : new Date(object.dates.created),
      modified : object.dates.modified ? new Date(object.dates.modified) : null
    };

    doc.dimensions = Point.fromObject(object.dimensions);
    doc.autosave = object.autosave;

    return doc;
  };
  
  return Document;
  
});