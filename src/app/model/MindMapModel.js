define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/topic"
], function(
  declare,
  lang,
  topic
) {
  
var MindMapModel = declare(null, {
  
  /**
   * Creates a new MindMapModel.
   * 
   * Creates a new MindMapModel. 
   * 
   * This object represents the underlying mind map model and provides access 
   * to the document, the mind map and the currently selected node.
   * 
   * All changes to the mind map pass through this object, either through calling
   * methods directly or using the executeAction() method to perform NodeActions.
   */
  constructor: function(commandRegistry, undoController) {
    this.document = null;
    this.selectedNode = null;
    this.init();
  },
  
  /**
   * Initialise.
   * 
   * @private
   */
  init: function() {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Executes a node action. An executed action might raise an event over
   * the event bus and cause an undo event to be emitted via MindMapModel#undoAction
   */
  executeAction: function(action) {
    // a composite action consists of multiple actions which are processed
    // individually
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Sets the node as the currently selected.
   * 
   * @param {Node} node
   */
  selectNode: function(node) {
    if (node === this.selectedNode) { return; }
    
    var oldSelected = this.selectedNode;
    this.selectedNode = node;
    // HACK use some module like `app/action/events` to define events
    // instead of using string here
    topic.publish("NODE_SELECTED", node, oldSelected);
  },
  
  /**
   * Saves a document to the localstorage and publishes DOCUMENT_SAVED 
   * event on success.
   *
   * @returns {Boolean} whether the save was successful.
   */
  saveToLocalStorage: function() {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Gets the current document.
   * 
   * @returns {Document} the current document.
   */
  getDocument: function() {
    return this.document;
  },
  
  /**
   * Sets the current document and will publish a DOCUMENT_OPENED or
   * DOCUMENT_CLOSED event.
   * 
   * @param {Document} doc or pass null to close the document
   */
  setDocument: function(doc) {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Gets the current mind map associated with the document.
   * 
   * @returns {MindMap} the mind map or null
   */
  getMindMap: function() {
    if (this.document) { return this.document.mindmap; }
    return null;
  },
  
  /**
   * Deletes a node or the currently selected one if no argument is passed.
   * 
   * @param {Node} [node] defaults to currently selected.
   */
  deleteNode: function(node) {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Attaches a new node the mind map. If invoked without arguments, it will
   * add a new child to the selected node with an automatically generated
   * position.
   * 
   * @param {Node} node the new node
   * @param {Node} parent
   */
  createNode: function(node, parent) {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Creates a new auto positioned node as a sibling to the current selected
   * node.
   */
  createSiblingNode: function() {
    throw new Error("Not implemented yet.");
  },
  
  /**
   * Changes the caption for the passed node or for the selected one if node
   * is null.
   * 
   * @param {Node} node
   * @param {String} caption
   */
  changeNodeCaption: function(node, caption) {
    throw new Error("Not implemented yet.");
  }
  
  
});

return MindMapModel;
  
});