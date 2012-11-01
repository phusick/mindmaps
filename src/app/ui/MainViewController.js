define([
  "dojo/_base/declare",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/MainView.html",
  
  // 
  "app/presenter/ToolbarPresenter",
  
  // template widgets
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "app/view/ToolbarView"
], function(
  declare,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  
  ToolbarPresenter
) {

var ViewController = declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

  templateString: template,
  
  constructor: function(args) {
    declare.safeMixin(this. args);
  },
  
  startup: function() {
    var toolbarPresenter = new ToolbarPresenter({
      view: this.toolbar,
      commandRegistry: this.commandRegistry
    });
  }
  
  // init all presenters
  // canvas
  // statusbar
  // floating panels
  // inspector
  // navigator
  
});

return ViewController;

});