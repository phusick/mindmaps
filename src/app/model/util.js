define([], function() {
  
  var util = {};
  
  /**
   * Creates a UUID in compliance with RFC4122.
   * 
   * @static
   * @returns {String} a unique id
   */
  util.createUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  /**
   * Returns an ID used by model objects.
   * 
   * @returns {string} id
   */
  util.getId = function() {
    return util.createUUID();
  }
  
  
  return util;
  
});