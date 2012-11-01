define([
  "dojo/_base/declare"
], function(
  declare
) {

var ToolbarPresenter = declare(null, {
  
  constructor: function(args) {
    declare.safeMixin(this, args);
    this.initComponents();
  },
  
  initComponents: function() {
    var registry = this.commandRegistry;
    
    var nodeCommands = [
      registry.get("CreateNodeCommand"),
      registry.get("DeleteNodeCommand")
    ];
    this.view.addButtonGroup(nodeCommands);
    
    setTimeout(function() { nodeCommands[0].setEnabled(true); }, 1000);
  }
  
});

return ToolbarPresenter;
  
});