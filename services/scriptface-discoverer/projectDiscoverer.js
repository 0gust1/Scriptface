var fs = require('fs');
var path = require('path');
var Q = require('q');

//each should return a promise

//this one return a project object.
//if no project file found, it outputs a minimal skeleton
var projectLoader = function (dirPath, projectFilename) {
  var project = {};
  var Q = require('q');
  var deferred = Q.defer();

  fs.readFile(path.resolve(dirPath, projectFilename), function (err, data) {
    if (!err) {
      project = JSON.parse(data);
    } else {
      //Err or no file found, return an empty minimal project structure
      project.projectName = "Unnamed project";
      project.taskLists = [
        {"taskListName": "Project tasks",
          "tasks": []
        }
      ];
    }
    deferred.resolve(project);
  });

  return deferred.promise;
};

var npmDiscoverer = function (dirPath) {
  var taskList = {};
  taskList.taskListName = "Node/npm tasks";
  taskList.tasks = [];
  var deferred = Q.defer();

  fs.readFile(path.resolve(dirPath, 'package.json'), function (err, data) {
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

      //add some basic tasks
      //npm install
      npm_tasks.push({"name": "npm install", "description": "install dependencies", "cli_command": "npm install"});

      taskList.tasks = npm_tasks;
      deferred.resolve(taskList);
    } else {
      deferred.reject("no package.json");
    }
  });

  return deferred.promise;
};

var gruntDiscoverer = function (dirPath) {
  var taskList = {};
  taskList.taskListName = "Grunt tasks";
  taskList.tasks = [];
  var deferred = Q.defer();

  fs.readFile(path.resolve(dirPath, 'Gruntfile.js'), function (err, data) {
    if (!err) {

      var GruntPath = path.resolve(dirPath, 'node_modules', 'grunt');

      if (!fs.existsSync(GruntPath)) {
        window.alert('Unable to find local grunt.');
        return
      }

      var grunt = require(GruntPath); //get a 'local' grunt
      //feed the current gruntfile to local grunt
      require(path.resolve(dirPath, 'Gruntfile.js'))(grunt);

      var tasks = [];

      grunt.file.setBase(dirPath);
      grunt.task.init([], {help: true});

      var items = Object.keys(grunt.task._tasks);
      items.forEach(function (task) {
        tasks.push({
          name: grunt.task._tasks[task].name,
          description: grunt.task._tasks[task].info,
          cli_command: 'grunt ' + grunt.task._tasks[task].name
        });
      });

      taskList.tasks = tasks;
      deferred.resolve(taskList);
    } else {
      deferred.reject("no gruntFile");
    }
  });

  return deferred.promise;
};

var gulpDiscoverer = function (dirPath) {
  var taskList = {};
  taskList.taskListName = "Gulp tasks";
  taskList.tasks = [];
  var deferred = Q.defer();

  //var gulp = require('gulp');
  //require('./gulpfile');
  //console.log(Object.keys(gulp.tasks).join(' '));

  fs.readFile(path.resolve(dirPath, 'gulpfile.js'), function (err, data) {
    if (!err) {

      var gulpPath = path.resolve(dirPath, 'node_modules', 'gulp');

      if (!fs.existsSync(gulpPath)) {
        //window.alert('Unable to find local grunt.');
        return
      }

      var gulp = require(gulpPath); //get a 'local' gulp
      //feed the current gulpfile to local gulp
      require(path.resolve(dirPath, 'gulpfile.js'));
      console.dir(gulp);
      var tasks = [];



      var items = Object.keys(gulp.tasks);
      items.forEach(function (task) {
        tasks.push({
          name: gulp.tasks[task].name,
          description: "imported task from gulpfile.js",
          cli_command: 'gulp ' + gulp.tasks[task].name
        });
      });

      taskList.tasks = tasks;
      deferred.resolve(taskList);
    } else {
      deferred.reject("no gulpfile found");
    }
  });

  return deferred.promise;
};


exports.discover = function discover(dirPath, projectFilename) {
  var deferred = Q.defer();
  var project = {};

  var discovererPlugins = [npmDiscoverer, gruntDiscoverer, gulpDiscoverer];

  //var discovererPlugins = [npmDiscoverer, gruntDiscoverer];

  projectLoader(dirPath, projectFilename).then(function (proj) {
    var taskLists = [];
    discovererPlugins.forEach(function (fn) {
      //var list = fn(dirPath);
      //proj.taskLists.push(fn(dirPath));
      taskLists.push(fn(dirPath));
    });

    console.log(JSON.stringify(taskLists));
    Q.allSettled(taskLists).then(function (results) {

      results.forEach(function (p) {

        if (p.state=="fulfilled") {
          proj.taskLists.push(p.value);
        }
      });

      deferred.resolve(proj);
    });

  });

  //when all promise resolved
  /*Q.allSettled(project.taskLists).then(function(){
   console.log("project = "+project);
   return project;
   });*/

  return deferred.promise;
  //discoverers.
}