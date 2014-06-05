var projectDiscoverer = require("../projectDiscoverer");
var Q = require('q');
var assert = require ('assert');
//var projectStructure = projectDiscoverer.discover(__dirname,"command2.json");
console.log("testing");
//var oldconsole = console;
console.log(__dirname);
projectDiscoverer.discover(__dirname,"command2.json").then(function(prStr){
  //console.log(prStr);
  console.log("done");
});



