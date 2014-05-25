angular.module('ScriptfaceApp')
  .controller('fileCtrl', function ($scope) {


    $scope.saveFile = function saveFile() {
      var path = require("path");
      var fs = require("fs");
      var filename = "commands.json";
      var targetObj = {};

      var targetTasks = $scope.project.tasks;

      targetObj.name = $scope.project.name;

      targetTasks.forEach(function (task) {
        if (task.state) {
          delete task.state;
        }
        if (task.data) {
          delete task.data;
        }
      });

      targetObj.tasks = targetTasks;

      var outputFilename = $scope.project.rootDir + path.sep + filename;

      fs.writeFile(outputFilename, angular.toJson(targetObj, true), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
      });

    };

  });
