define([
  "app/ui/MainViewController"
], function(
  MainViewController
) {

  /**
   * Creates a new Application Controller
   * 
   * @contructor
   */
  var ApplicationController = function() {
    
  }
  
  /**
   * Launches the main view controller.
   */
  ApplicationController.prototype.go = function() {
    var viewController = new MainViewController().placeAt(document.body);
    viewController.startup();
  }
  
  return ApplicationController;

});