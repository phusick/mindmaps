define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "doh/runner"
], function(
  declare,
  lang,
  doh
) {
  
  var TestGroup = declare(null, {

    constructor: function(name, props) {
      this.name = name;
      this.autoRegister = true;
      this.tests = [];
      declare.safeMixin(this, props);
    },
    
    getFixture: function() {
      return lang.hitch(this, function(name, runTest) {
        var test = { name: name, runTest: runTest };
        this.tests.push(test);
        if (this.autoRegister === true) {
          doh.register(this.name, test);
        }
        return test;
      });
    },
    
    register: function() {
      if (this.autoRegister === true) { 
        console.warn("TestGroup::register() with autoRegister === true");
      }
      doh.register(this.name, this.tests);
    },
    
    getName: function() {
      return this.name;
    },
    
    getTests: function() {
      return this.tests;
    }
    
  });
  
  
  return TestGroup;
  
});