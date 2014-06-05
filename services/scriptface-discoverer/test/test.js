var projectDiscoverer = require("../projectDiscoverer");
var Q = require('q');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;
//var projectStructure = projectDiscoverer.discover(__dirname,"command2.json");

var configSample = {
  "projectName": "Scriptface example",
  "taskLists": [
    {"taskListName": "Project tasks",
      "tasks": [
        {
          "name": "Ping google",
          "description": "some random script",
          "cli_command": "ping google.com"
        },
        {
          "name": "npm install",
          "description": "Install nodeJs dependencies",
          "cli_command": "npm install"
        },
        {
          "name": "npm ls",
          "description": "list nodejs packages",
          "cli_command": "npm ls"
        }
      ]
    },
    {},
    {}
  ]
};

var minimalProjectSample = {
  "projectName": "Unnamed project",
  "taskLists": [
    {"taskListName": "Project tasks",
      "tasks": []
    },
    {},
    {}
  ]
}

describe('scriptface-discoverer', function () {

  describe('#discover()', function () {

    it('should parse correctly a sample commands file', function () {

      projectDiscoverer.discover(__dirname, "command2.json").then(
        function (prStr) {
          assert.equal(prStr.projectName, configSample.projectName, "loaded and sample should have the same name");

          assert.deepEqual(prStr, configSample, "config sample and loaded config are equals");
          done();
        }, function (err) {
          done(err);
        });
    });
  });

  describe('#discover()2', function () {
    it('when no commands file avaiable, should return a valid project skeleton', function () {
      projectDiscoverer.discover(__dirname, "lkjfsldjf.json").then(function (prStr) {

        //assert.deepEqual(prStr,minimalProjectSample,"config sample and loaded config are equals");
        assert.equal(prStr, minimalProjectSample, "loaded and sample should have the same name");
        done();
      }, function (err) {
        done(err);
      });
    });
  });

});



