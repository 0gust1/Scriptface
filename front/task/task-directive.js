angular.module('ui-task', []).directive('task', [function () {
  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {

      var e = element[0]; //Vanilla mode
      var btnLaunch = e.getElementsByClassName("btn-launch")[0];
      btnLaunch.addEventListener('click', function () {
        //scope.$apply(attrs.confirmAction);
        scope.handleClick(attrs.taskList, scope.task, scope.$index);

      });
      //var outputZone = e.getElementsByClassName(".cli_output");

      //btnLaunch.addEventListener("click", alert("toto"+btnLaunch), false);


      /*var btnLaunch = element.find(".btn-launch");
       var outputZone = element.find(".cli_output");
       console.log("btnLaunch : "+btnLaunch);
       console.log("output : "+outputZone);
       console.log("element : "+element);
       btnLaunch.on("click",function(){
       alert("click");
       });
       outputZone.text("Yaah");
       outputZone.on("outputUpdate",function(data){
       this.append(data);
       });
       */
    }
  };
}]);
