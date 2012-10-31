define([
  "dojo/_base/declare",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  // template
  "dojo/text!./templates/Toolbar.html",
  // template dependencies
  "dijit/Toolbar",
  "dijit/ToolbarSeparator",
  "dijit/form/Button"
], function(
declare,
_Widget,
_TemplatedMixin,
_WidgetsInTemplateMixin,

template
){

  var Toolbar = declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
    
    templateString: template,
    
    _onClick: function() {}
    
  });
  
  return Toolbar;

});