var projectDiscoverer = require("../projectDiscoverer");
var Q = require('q');
var assert = require ('assert');
//var projectStructure = projectDiscoverer.discover(__dirname,"command2.json");
console.log("testing");
var oldconsole = console;

describe('scriptface-discoverer', function(){
  describe('#discover()', function(){
    it('should return something', function(){
      projectDiscoverer.discover(__dirname,"command2.json").then(function(prStr){
        //oldconsole.log(JSON.stringify(prStr));
        //oldconsole.log('toto');
        //assert.ok(prStr,'is ok');
        assert.equal(prStr.projectName,"Scriptface example");
        assert.equal(prStr.projectName,"Scriptface ");
        done();
      }).done();
    })
  })
});



