angular.module('ui-dropzone', []).directive('dropzone', [function () {
  return {
    restrict: 'AE',
    scope: {
      drop: '&' // parent
    },
    link: function (scope, element, attrs) {
      var el = element[0];

      el.addEventListener(
        'dragover',
        function (e) {
          element.addClass("over");
          e.stopPropagation();
          e.preventDefault();
          //e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function (e) {
          element.removeClass("over");
        },
        false
      );

      el.addEventListener(
        'drop',
        function (e) {
          // Stops some browsers from redirecting.
          e.stopPropagation();
          e.preventDefault();

          element.removeClass("over");
          var files = e.dataTransfer.files; // FileList object.

          //debug
          for (var j = 0; j < length; j++) {
            var entry = files[j].webkitGetAsEntry();
            console.log(entry);
            if (entry.isFile) {
              console.log("File !");
            } else if (entry.isDirectory) {
              console.log("Directory !");
            }
          }

          scope.$apply(function (scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(files[0]);
            }
          });
          return false;
        },
        false
      );
    }
  };
}]);
