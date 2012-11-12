define([
  "doh/runner",
  "test/sinon",
  "app/command/Command"
], function(
  doh,
  sinon,
  Command
) {

  var tests = [];
  var it = function(name, runTest) {
    var test = { name: name, runTest: runTest };
    tests.push(test);
    return test;
  }


  it("should call a handler when executed", function() {
    var command = new Command();
    var handler = sinon.spy();

    command.setHandler(handler);
    command.execute();

    doh.assertTrue(handler.calledOnce);
    doh.t(handler.calledOnce);
    doh.assertEqual(1, handler.callCount);      
  });
  
  it("should notify when the enabled state has changed", function() {
    var command = new Command();
    var handler = sinon.spy();
    var callback = sinon.spy();
    
    command.setHandler(handler);
    command.on(Command.Event.ENABLED_CHANGED, callback);
    
    command.setEnabled(false);
    doh.assertTrue(callback.calledWith(false)); 
    
    command.setEnabled(true);
    doh.assertTrue(callback.calledWith(true));
  });
  
  doh.register("Command", tests,
    function() { /* group setUp*/ },
    function() { /* group tearDown */ }
  );
  
});