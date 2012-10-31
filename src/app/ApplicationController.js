define([
  "dojo/_base/declare",
  "app/command/CommandRegistry",
  "app/ui/MainViewController"
], function(
  declare,
  CommandRegistry,
  MainViewController
) {

  function doNewDocument() {
    console.log("doNewDocument Handler");
  }

  var ApplicationController = declare(null, {
    
    /**
     * Creates a new Application Controller
     * 
     * @contructor
     */    
    constructor: function() {
      this.commandRegistry = new CommandRegistry();
      this.init();
    },
    
    /**
     * Initializes the controller, registers for all commands and subscribes to
     * event bus.
     */
    init: function() {
      var commandRegistry = this.commandRegistry;
      
      var newDocumentCommand = commandRegistry.get("NewDocumentCommand");
      newDocumentCommand.setHandler(doNewDocument);
      newDocumentCommand.setEnabled(true);
    },

    /**
     * Launches the main view controller.
     */
    go: function() {
      var viewController = new MainViewController({
        commandRegistry: this.commandRegistry
      });
      viewController.placeAt(document.body);
      viewController.startup();      
    }
    
  });
  
  return ApplicationController;

});