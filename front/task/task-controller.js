angular.module('ScriptfaceApp')
  .controller('taskCtrl', function ($scope) {


    $scope.handleClick = function (taskListName, task, index) {

      var path = require('path');
      var spawn = require('win-spawn');
      var commandV = task.cli_command.split(" ");
      var command = commandV.shift();
      var shell = undefined;
      var Convert = require('ansi-to-html');
      var ansiconverter = require('ansi-html-stream');
      //var ansispan = require('ansispan');
      //require('colors');
      //var convert = new Convert();

      function stopCommand() {
        console.log("stopcommand : " + index);
        //$scope.$apply();
        //$scope.project[taskListName][index].state.shell.exit();
        $scope.project[taskListName][index].state.shell.kill('SIGINT');
        delete $scope.project[taskListName][index].state.shell;
        $scope.project[taskListName][index].state.running = false;
      }

      function launchCommand() {
        var convert = new Convert();

        shell = spawn(command,
          commandV,
          { cwd: $scope.project.rootDir + path.sep,
            env: process.env
          }
        );

        if (!$scope.project[taskListName][index].state) {
          $scope.project[taskListName][index].state = {};
        }
        $scope.project[taskListName][index].state.running = true;
        $scope.project[taskListName][index].state.shell = shell;

        console.log("child PID" + shell.pid);
        //shell.stdout.pipe(stream);
        shell.stdout.on('data', function (data) {
          //var htmlOutput = convert.toHtml(data);
          $scope.project[taskListName][index].data = $scope.project[taskListName][index].data + data;

          $scope.$apply();
        });

        shell.stderr.on('data', function (data) {
          //txtArea.append("Error : ");
          $scope.project[taskListName][index].data = $scope.project[taskListName][index].data + data;
          $scope.$apply();
        });

        shell.on('close', function (code) {
          console.log("closed : child PID " + shell.pid);
          //txtArea.append("Process has exited, with code : " + code +"<br>");

          //$scope.project[taskListName][index].data = $scope.project[taskListName][index].data + code;
          delete $scope.project[taskListName][index].state.shell;
          $scope.project[taskListName][index].state.running = false;
          $scope.$apply();
        });
      }


      if (!task.state || !task.state.running) {
        launchCommand();
      } else {
        stopCommand();
      }
    }

  });
