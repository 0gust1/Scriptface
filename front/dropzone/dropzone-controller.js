//var scriptfaceDiscoverer = require("../services/scriptface-discoverer/projectDiscoverer.js");

angular.module('ScriptfaceApp')
  .controller('dropzoneCtrl', function ($scope) {

    //a file was dropped
    $scope.handleDrop = function handleDrop(file) {


      var fs = require('fs');
      var path = require('path');
      var clibuttonsFile = "commands.json";

      //Data init
      $scope.project = {};

      //Handling dropped filepath
      var droppedPath = path.normalize(file.path);


      if (!fs.lstatSync(droppedPath).isDirectory()) {
        if(path.basename(droppedPath) === clibuttonsFile){
          droppedPath = path.dirname(droppedPath);
        }else{
          //error TODO
          window.alert("Failed - Please drop a directory or a " + clibuttonsFile + " file.");
        }
      }

      $scope.project.rootDir = droppedPath;
      //$scope.$apply();

      //read project file
      fs.readFile(path.resolve(droppedPath,clibuttonsFile), function (err, data) {
        if (!err) {
          var projectFileObj = JSON.parse(data);
          $scope.project.name = projectFileObj.name;
          $scope.project.tasks = projectFileObj.tasks;
          $scope.$apply();
        } else {
          //Err ?
        }

      });

      //try to find a package.json file, gather data in the "script" entry and put it in the scope
      $scope.project.npm_tasks = [];
      fs.readFile(path.resolve(droppedPath,'package.json'), function (err, data) {
        if (!err) {
          var nodePackageFile = JSON.parse(data);
          var npm_tasks = [];
          var items = [];
          if (nodePackageFile.scripts) {
            items = Object.keys(nodePackageFile.scripts);

            items.forEach(function (task) {
              var command = "npm run " + task;
              npm_tasks.push({"name": task, "description": "npm task imported from package.json", "cli_command": command});
            });

          }

          npm_tasks.push({"name": "npm install", "description": "install dependencies", "cli_command": "npm install"});

          $scope.project.npm_tasks = npm_tasks;
          $scope.$apply();
        }
      });

      $scope.project.grunt_tasks = [];
      fs.readFile(path.resolve(droppedPath,'Gruntfile.js'), function (err, data) {
        if (!err) {

          var GruntPath = path.resolve(droppedPath,'node_modules','grunt');

          if (!fs.existsSync(GruntPath)) {
            window.alert('Unable to find local grunt.');
            return
          }

          var grunt = require(GruntPath); //get a 'local' grunt
          var help = require(GruntPath + path.sep + "lib" + path.sep + "grunt" + path.sep + "help.js");
          //help.init();
          //var GruntinitConfigFnPath = grunt.file.findup('Gruntfile.{js,coffee}', {cwd: directory, nocase: true});

          require(path.resolve(droppedPath,'Gruntfile.js'))(grunt);

          var tasks = [];

          console.log("***** Let's init the tasks !");
          grunt.file.setBase(droppedPath);
          grunt.task.init([], {help: true});

          console.log("CONFIG GRUNT : " + grunt.config);

          var items = Object.keys(grunt.task._tasks);
          items.forEach(function (task) {

            //if it's a "Gruntfile" task, add it to the list
            if(grunt.task._tasks[task].meta.info == "Gruntfile"){
              tasks.push({
                name: grunt.task._tasks[task].name,
                description: grunt.task._tasks[task].info,
                cli_command: 'grunt ' + grunt.task._tasks[task].name
              });
            }

          });
          /* grunt.task._tasks.forEach(function (task) {
           tasks.push({
           name: task.name,
           description: task.info,
           cli_command: 'grunt '+task.name
           });
           });*/
          console.log("GATHERED GRUNT TAKS 2 : " + JSON.stringify(grunt.task._tasks, null, '\t'));

          $scope.project.grunt_tasks = tasks;
          $scope.$apply();
        }
      });

      //try to find a gruntfile.js file

      //TODO: try to find a makefile

      //TODO: try to find a gulpfile

      //TODO: try to find a brunch project info

      //TODO : try to find ruby info

      //var filePath = path.join(__dirname + '/start.html');


      //if file, try to parse it
      // if(){

      //}

      //if directory, try to find and parse common files
      //if(){

      //}
    };

  });


