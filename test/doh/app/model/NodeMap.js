define([
  "doh/runner",
  "test/_util/sinon",
  "test/_util/TestGroup",
  "app/model/NodeMap",
  "app/model/Node"
], function(
  doh,
  sinon,
  TestGroup,
  NodeMap,
  Node
) {

var it = new TestGroup("NodeMap").getFixture();

it("should add a node", function() {
  var map = new NodeMap();
  var node = new Node();
  
  var added = map.add(node);
  doh.t(added);
  doh.is(1, map.size());
});

it("should not add the same node twice", function() {
  var map = new NodeMap();
  var node = new Node();
  
  map.add(node);
  var added = map.add(node);
  
  doh.f(added);
});

it("should add 100 nodes and contain 100 nodes", function() {
  var map = new NodeMap();
  for (var i = 0; i < 100; i++) {
    var node = new Node();
    node.id = i;
    map.add(node);
  }
  
  doh.is(100, map.size());
});

it("should remove a node", function() {
  var map = new NodeMap();
  var node = new Node();
  map.add(node);
  
  var removed = map.remove(node);
  
  doh.t(removed);
  doh.is(0, map.size());
});

it("should do nothing if a node is to be removed that doesn't belong", function() {
  var map = new NodeMap();
  var node = new Node();
  removed = map.remove(node);
  
  doh.f(removed);
  doh.is(0, map.size());
});

it("should get nodes by id", function() {
  var map = new NodeMap();
  var node = new Node();
  map.add(node);
  
  var got = map.get(node.id);
  doh.t(node === got);
  
  // try to get node not in the map
  var otherNode = new Node();
  var got2 = map.get(otherNode);
  doh.t(typeof got2 === "undefined");
});

it("should return the values", function() {
  var map = new NodeMap();
  var node = new Node();
  var node2 = new Node();
  map.add(node);
  map.add(node2);
  
  var values = map.values();
  
  // is array?
  doh.t(Array.isArray(values));
  doh.is(2, values.length);
  
  // values should be nodes
  values.forEach(function(value) {
    doh.t(value instanceof Node);
  });
  
  // try to find nodes in the array
  var foundNode = values[0] === node || values[1] === node;
  var foundNode2 = values[0] === node2 || values[1] === node2;
  doh.t(foundNode);
  doh.t(foundNode2);
});

it("should iterate over all nodes", function() {
  // HACK should I mock Node?
  var map = new NodeMap();
  var node = new Node();
  var node2 = new Node();
  map.add(node);
  map.add(node2);
  
  var newCaption = "CHANGED";
  map.each(function(node) {
    node.setCaption(newCaption);
  });
  
  doh.is(newCaption, node.getCaption());
  doh.is(newCaption, node2.getCaption());
});

  
});