'use strict';


// Load native UI library
// var gui = require('nw.gui');

// // Print arguments
// console.log(gui.App.argv);

// // Quit current app
// gui.App.quit();

// // Get the name field in manifest
// gui.App.manifest.name;

angular
  .module('ScriptfaceApp', [
    'xeditable',
    'ngAnimate',
    'ngRoute',
    'ui-dropzone',
    'ui-task'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'front/main/main-template.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
//   }).run(function(editableOptions) {
//   editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
// });

