define([
  "dojo/_base/declare"
], function(
  declare
) {

  var Command = declare(null, {
    
    /**
     * Creates a new command. Base class for all commands.
     * 
     * @constructor
     */
    constructor: function(args) {
      this.id = "BASE_COMMAND";
      this.shortcut = null;
      /**
       * The handler function.
       * 
       * @private
       * @function
       */
      this.handler = null;
      this.label = null;
      this.description = null;
      /**
       * @private
       */
      this.enabled = false;
      
      declare.safeMixin(this,args);
    },
    
    /**
     * Executes the command. Tries to call the handler function.
     */
    execute: function() {
      if (this.handler) {
        this.handler();
      }
    },
    
    /**
     * Registers a new handler.
     * 
     * @param {Function} handler
     */
    setHandler: function(handler) {
      this.removeHandler();
      this.handler = handler;
      // TODO: fire `Command.Event.HANDLER_REGISTERED` via dojo/topic || dojo/Evented
    },
    
    /**
     * Removes the current handler.
     */
    removeHandler: function() {
      this.handler = null;
      // TODO: fire `Command.Event.HANDLER_REMOVED` via dojo/topic || dojo/Evented
    },
    
    /**
     * Sets the enabled state of the command.
     * 
     * @param {Boolean} enabled
     */
    setEnabled: function(enabled) {
      this.enabled = enabled;
      // TODO: fire `Command.Event.ENABLED_CHANGED` via dojo/topic || dojo/Evented
    }
    
  });
  
  // I'm not sure how these events are used throughout the application,
  // so I'll implement them when needed. See aforementioned TODOs.
  Command.Event = {
    HANDLER_REGISTERED : "HandlerRegisteredCommandEvent",
    HANDLER_REMOVED : "HandlerRemovedCommandEvent",
    ENABLED_CHANGED : "EnabledChangedCommandEvent"    
  };
  
  return Command;

});