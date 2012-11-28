define([
  "doh/runner",
  "test/_util/sinon",
  "dojo/_base/lang",
  "test/_util/TestGroup",
  "app/command/Command",
  "app/command/CommandRegistry"
], function(
  doh,
  sinon,
  lang,
  TestGroup,
  Command,
  CommandRegistry
) {

  var it = new TestGroup("CommandRegistry").getFixture();
  
  var testCommands = {
    CreateNodeCommand: {
      id: "CREATE_NODE_COMMAND",
      shortcut: "tab",
      label: "Add",
      icon: "addNodeIcon",
      description: "Creates a new node"
    },

    DeleteNodeCommand: {
      id: "DELETE_NODE_COMMAND",
      shortcut: ["del", "backspace"],
      label: "Delete",
      icon: "deleteNodeIcon",
      description: "Deletes a node"
    }
  }
  
  it("should register command declarations", function() {
    var commandRegistry = new CommandRegistry();
    var commands = lang.clone(testCommands);
    commandRegistry.declare(commands);
    
    function count(object) {
      var count = 0;
      for (var each in object) {
        if (object.hasOwnProperty(each)) { ++count; }
      }
      return count;
    }

    doh.assertEqual(2, count(commandRegistry.declarations));
    
  });
  
  it("should return a command object for a command type", function() {
    var commandRegistry = new CommandRegistry();
    var commands = lang.clone(testCommands);
    commandRegistry.declare(commands);
    
    var command1 = commandRegistry.get("CreateNodeCommand");
    var command2 = new Command(commands.CreateNodeCommand);
    doh.t(command1 instanceof Command);
    doh.is(command1, command2);
  });
  
  it("should always return the same command object", function() {
    var commandRegistry = new CommandRegistry();
    var commands = lang.clone(testCommands);
    commandRegistry.declare(commands);
    
    var command1 = commandRegistry.get("CreateNodeCommand");
    var command2 = commandRegistry.get("CreateNodeCommand");
    doh.t(command1 === command2);
  });
  
  it("should remove a command type", function() {
    var commandRegistry = new CommandRegistry();
    var commands = lang.clone(testCommands);
    commandRegistry.declare(commands);
    
    var command1 = commandRegistry.get("CreateNodeCommand");
    commandRegistry.remove("CreateNodeCommand");
    // this should be a new instance now
    var command2 = commandRegistry.get("CreateNodeCommand");
    doh.f(command1 === command2);
  });
  
});