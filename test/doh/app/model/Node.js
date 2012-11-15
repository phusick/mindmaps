define([
  "doh/runner",
  "test/_util/sinon",
  "test/_util/TestGroup",
  "app/model/Node",
  "app/model/Point"
], function(
  doh,
  sinon,
  TestGroup,
  Node,
  Point
) {

  
var it = (new TestGroup("Node")).getFixture();

var node, root, n1, n2, n3, n11, n12, n21, n111;

var setUp = function() {
  node = new Node();
  // build sample tree
  root = new Node();
  n1 = new Node();
  n2 = new Node();
  n3 = new Node();
  root.addChild(n1);
  root.addChild(n2);
  root.addChild(n3);
  
  n11 = new Node();
  n12 = new Node();
  n1.addChild(n11);
  n1.addChild(n12);
  
  n111 = new Node();
  n11.addChild(n111);
  
  n21 = new Node();
  n2.addChild(n21);
} 

it("should clone a simple node", function() {
  setUp();
  var clone = node.clone();
  // id should be different
  doh.isNot(node.id, clone.id);
  // but the rest should be the same
  delete node.id;
  delete clone.id;
  doh.is(node, clone);
});

it("should add a child", function() {
  setUp();
  var child = new Node();
  node.addChild(child);
  
  doh.t(node === child.getParent());
  doh.is(1, node.children.size());
});

it("should remove a child", function() {
  setUp();
  var child = new Node();
  node.addChild(child);
  node.removeChild(child);
  
  doh.f(child.getParent() === node);
  doh.t(child.isRoot());
  doh.is(0, node.children.size());
});

it("should know when it is leaf", function() {
  setUp();
  doh.is(0, node.children.size());
  doh.t(node.isLeaf());
  
  node.addChild(new Node());
  doh.f(node.isLeaf());
});

it("should know when it is a root", function() {
  setUp();
  doh.is(0, node.children.size());
  doh.t(node.isRoot());
  
  root.addChild(node);
  doh.f(node.isRoot());
});

it("should return the root of a tree", function() {
  setUp();
  doh.t(root === root.getRoot());
  doh.t(root === n1.getRoot());
  doh.t(root === n2.getRoot());
  doh.t(root === n3.getRoot());
});
  
it("should return the position relative to root", function() {
  setUp();
  var root = new Node();
  root.offset = new Point(100, 100); 
  var n1 = new Node();
  n1.offset = new Point(100, 0);
  var n2 = new Node();
  n2.offset = new Point(50, 100);
  root.addChild(n1);
  n1.addChild(n2);
  
  var pos = n2.getPosition();
  doh.is(new Point(250, 200), pos);
});

it("should return the depth in a tree", function() {
  setUp();
  doh.is(0, root.getDepth());
  doh.is(1, n1.getDepth());
  doh.is(2, n11.getDepth());
  doh.is(3, n111.getDepth());
});

it("should iterate over all children", function() {
  setUp();
  var count = 0;
  var newCaption = "CHANGED";
  root.forEachChild(function(child) {
    count++;
    child.setCaption(newCaption);
  });
  
  doh.is(3, count);
  doh.is(newCaption, n1.getCaption());
  doh.is(newCaption, n2.getCaption());
  doh.is(newCaption, n3.getCaption());
});

it("should iterate over all descendants", function() {
  setUp();
  var count = 0;
  var newCaption = "CHANGED";
  root.forEachDescendant(function(child) {
    count++;
    child.setCaption(newCaption);
  });
  
  doh.is(7, count);
  doh.is(newCaption, n1.getCaption());
  doh.is(newCaption, n2.getCaption());
  doh.is(newCaption, n3.getCaption());
  doh.is(newCaption, n11.getCaption());
  doh.is(newCaption, n12.getCaption());
  doh.is(newCaption, n21.getCaption());
});

it("should detect if a node is a descendant", function() {
  setUp();
  // n1 should be a descendant but not the other way round
  doh.t(root.isDescendant(n1));
  doh.f(n1.isDescendant(root));
  
  // other should be descendant only after added
  var other = new Node();
  doh.f(root.isDescendant(other));
  n111.addChild(other);
  doh.t(root.isDescendant(other));
});

it("should have a different id each time", function() {
  // this is not a sufficient test for uniqueness but would point out if
  // all nodes had the same id :-)
  setUp();
  doh.isNot(node.id, root.id);
  doh.isNot(n1.id, n2.id);
});

it("should get serialized and restored correctly", function() {
  setUp();
  var json = root.serialize();
  var restored = Node.fromJSON(json);
  doh.t(restored instanceof Node);
  
  // assertEquals aka doh.is not working due to circular refernces
  var rootObject = JSON.parse(json);
  var restoredObject = JSON.parse(restored.serialize());
  doh.is(rootObject, restoredObject);
});

});