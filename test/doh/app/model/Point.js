define([
  "doh/runner",
  "test/_util/sinon",
  "test/_util/TestGroup",
  "app/model/Point"
], function(
  doh,
  sinon,
  TestGroup,
  Point
) {

  
  var it = (new TestGroup("Point")).getFixture();
  
  it("should set the x and y coordinates", function() {
    var point = new Point(4, 2);
    doh.is(4, point.x);
    doh.is(2, point.y);
  });
  
  it("should initialize to zero by default", function() {
    var point = new Point();
    doh.is(0, point.x);
    doh.is(0, point.y);  
  });
  
  it("should create a new point instance from object", function() {
    var object = { x: 16, y:0 };
    var point = Point.fromObject(object);
    doh.t(point.isInstanceOf(Point));
    doh.is(16, point.x);
    doh.is(0, point.y);  
  });
  
  it("should clone a point object correctly", function() {
    var point = new Point(4, 2);
    var clone = point.clone();
    doh.f(point === clone);
    doh.is(point, clone);
  });
  
  it("should add points correctly", function() {
    var point1 = new Point(4, 2);
    var point2 = new Point(-4, -2);
    point1.add(point2);
    doh.is(0, point1.x);
    doh.is(0, point1.y);
  });
    
});