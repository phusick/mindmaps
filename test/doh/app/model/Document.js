define([
  "doh/runner",
  "test/sinon",
  "app/model/Document"
], function(
  doh,
  sinon,
  Document
) {

  var tests = [];
  var it = function(name, runTest) {
    var test = { name: name, runTest: runTest };
    tests.push(test);
    return test;
  }

  it("should get a unique id", function() {
    var doc1 = new Document();
    var doc2 = new Document();
    
    doh.isNot(doc1, doc2);
    doh.t(doc1.id !== doc2.id);
  });
  
  it("should set the created date to now", function() {
    var before = Date.now();
    var date = (new Document()).getCreatedDate().getTime();
    var after = Date.now();
    
    var beforeOrSame = before <= date;
    var afterOrSame = after >= date;
    
    doh.assertTrue(beforeOrSame && afterOrSame);
  });
  
  it("should be new the first time", function() {
    var doc = new Document();
    doh.assertTrue(doc.isNew());
  });
  
  it("should serialize and restore", function() {
    var doc = new Document();
    var json = doc.serialize(); console.log(json);
    var restored = Document.fromJSON(json);
    
    doh.t(restored instanceof Document);
    doh.is(restored, doc);
  });
  
  it("should set and remember autosave", function() {
    var doc = new Document();
    doc.setAutosave(true);
    var json = doc.serialize();
    var restored = Document.fromJSON(json);

    doh.t(restored.isAutosave());
  });
  

  doh.register("Document", tests,
    function() { /* group setUp*/ },
    function() { /* group tearDown */ }
  );

});