define([
  "doh/runner",
  "test/_util/sinon",
  "test/_util/TestGroup",
  "app/model/MindMap",
  "app/model/Node"
], function(
  doh,
  sinon,
  TestGroup,
  MindMap,
  Node
) {

var it = new TestGroup("MindMap").getFixture();
  
it("should initialized with a root node", function() {
  var mindMap = new MindMap();
  doh.t(mindMap.getRoot() instanceof Node);
  doh.t(mindMap.getRoot().isRoot());
}); 

it("should create a node and add to nodemap", function() {
  var mindMap = new MindMap();
  var node = mindMap.createNode();
  
  doh.t(node.isInstanceOf(Node));
  doh.is(2, mindMap.nodes.size());
  doh.is(node, mindMap.nodes.get(node.id));
});

it("should add a node to nodemap", function() {
  var mindMap = new MindMap();
  var n1 = new Node();
  var n11 = new Node();
  n1.addChild(n11);
  mindMap.getRoot().addChild(n1);
  mindMap.addNode(n1);
  
  doh.t(mindMap.nodes.get(n1.id).isInstanceOf(Node));
  doh.t(mindMap.nodes.get(n11.id).isInstanceOf(Node));
});

it("should remove a node", function() {
  var mindMap = new MindMap();
  var root = mindMap.getRoot();
  var node = mindMap.createNode();
  root.addChild(node);
  
  mindMap.removeNode(node);
  doh.t(root.isLeaf());
  doh.t(node.getParent() === null);
  doh.is(1, mindMap.nodes.size());
});

it("should serialize and restore", function() {
  var mindMap = new MindMap();
  var root = mindMap.getRoot();
  var n1 = mindMap.createNode();
  var n11 = mindMap.createNode();
  
  root.addChild(n1);
  n1.addChild(n11);
  
  var json = mindMap.serialize();
  var restored = MindMap.fromJSON(json);
  
  doh.t(restored.isInstanceOf(MindMap));
  doh.is(mindMap.nodes.size(), restored.nodes.size());
  doh.is(mindMap.getRoot().toJSON(), restored.getRoot().toJSON());
});
  
});