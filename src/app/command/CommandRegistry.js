define([
  "dojo/_base/declare",
  "./Command",
  "./commands"
], function(
  declare,
  Command,
  commands
) {

  var CommandRegistry = declare(null, {
    
    /**
     * Creates a new CommandRegistry.
     * 
     * @contructor
     */
    constructor: function() {
      this.commands = {};
      // TODO: implement shortcutController as in the original
    },
    
    /**
     * Returns a command object for the given command type.
     * 
     * @param commnadType
     * @returns {mindmaps.Command} a command object.
     */
    get: function(commandType) {
      var command = this.commands[commandType];
      if (!command) {
        if (!commands[commandType]) { throw new Error(""); }
        command = new Command(commands[commandType]);
      }
      return command;
    },
    
    /**
     * Removes the command object from the given command type.
     * 
     * @param commandType
     */
    remove: function(commandType) {
      // TODO: remove by object
      var command = this.commands[commandType];
      if (!command) { return; } 
      
      delete this.commands[commandType];
    }
    
  });
  
  return CommandRegistry;

});