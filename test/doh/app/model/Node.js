define([
  "doh/runner",
  "test/_util/sinon",
  "test/_util/TestGroup",
  "app/model/Node"
], function(
  doh,
  sinon,
  TestGroup,
  Node
) {

  
  var it = (new TestGroup("Node")).getFixture();
  
  it("should be true", function() {
    doh.t(true);
  });
  
  it("should be false", function() {
    doh.f(false);
  });  
  
});