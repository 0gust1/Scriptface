'use strict';

angular.module('ScriptfaceApp')
  .controller('MainCtrl', function ($scope) {

    $scope.launchBrowser = function (url) {
      // Load native UI library.
      var gui = require('nw.gui');
      // Open URL with default browser.
      gui.Shell.openExternal(url);
    };


    // var ps = process.version;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.project = {};
    $scope.project.name = "Project Name";
    $scope.project.tasks = [];
    $scope.project.npm_tasks = [];
    $scope.project.grunt_tasks = [];

  });
