define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/MainView.html",
  
  // 
  "app/presenter/ToolbarPresenter",
  "app/view/DefaultCanvasView",
  
  // template widgets
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "app/view/ToolbarView"
], function(
  declare,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  
  ToolbarPresenter,
  CanvasView
) {

var ViewController = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

  templateString: template,
  
  constructor: function(args) {
    declare.safeMixin(this. args);
  },
  
  startup: function() {
    var toolbarPresenter = new ToolbarPresenter({
      view: this.toolbar,
      commandRegistry: this.commandRegistry
    });
    
    
    
    var canvasView = new CanvasView({});
    canvasView.startup();
    
    this.centerRegion.addChild(canvasView);
  }
  
  // init all presenters
  // statusbar
  // floating panels
  // inspector
  // navigator
  
});

return ViewController;

});