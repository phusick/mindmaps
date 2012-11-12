define([
  "dojo/_base/declare",
  "./Command"
], function(
  declare,
  Command
) {

  var CommandRegistry = declare(null, {
    
    /**
     * Creates a new CommandRegistry.
     * 
     * @contructor
     */
    constructor: function() {
      this.declarations = {};
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
        if (!this.declarations[commandType]) {
          throw new Error("Command does not exist [" + commandType + "]");
        }
        command = this.commands[commandType] = new Command(this.declarations[commandType]);
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
    },
    
    declare: function(/*Object*/ object) {
      for (var each in object) {
        if (object.hasOwnProperty(each)) {
          this.declarations[each] = object[each];
        }
      }
    }
    
  });
  
  return CommandRegistry;

});