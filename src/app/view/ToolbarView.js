define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  // template
  "dojo/text!./templates/Toolbar.html",
  
  "app/command/Command",
  // dijits
  "dijit/Toolbar",
  "dijit/ToolbarSeparator",
  "dijit/form/Button"
], function(
declare,
array,
_Widget,
_TemplatedMixin,
_WidgetsInTemplateMixin,

template,

Command,

Toolbar,
ToolbarSeparator,
Button
){

var AppToolbar = declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

  templateString: template,

  _onClick: function() {},
  
  addButton: function(command) {
    var button = new Button({
      command: command,
      label: command.label,
      title: command.description,
      disabled: !command.enabled,
      onClick: function() {
        command.execute();
      }
    });

    if (command.icon) {
      button.set("iconClass", command.icon);
    }
    
    command.on(Command.Event.ENABLED_CHANGED, function(enabled) {
      button.set("disabled", !enabled);
    });
    
    this.toolbar.addChild(button);
  },
  
  addButtonGroup: function(/*Array*/ commands) {
    array.forEach(commands, function(command) {
      this.addButton(command);
    }, this);
    this.addSeparator();
  },
  
  addSeparator: function() {
    var separator = new ToolbarSeparator();
    this.toolbar.addChild(separator);
  }

});

return AppToolbar;

});