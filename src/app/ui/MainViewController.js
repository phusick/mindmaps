define([
  "dojo/_base/declare",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  
  "dojo/text!./templates/MainView.html",
  
  // template widgets
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane"
], function(
  declare,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  
  template
) {

var ViewController = declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

  templateString: template
  
  // init all presenters
  // canvas
  // statusbar
  // floating panels
  // inspector
  // navigator
  
});

return ViewController;

});