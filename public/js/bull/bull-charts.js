'use strict';

angular.module('Danger').controller('ctrlChartsBull', ['$scope', 'resolvedBull', 'Bull', '$timeout', function ($scope, resolvedBull, Bull, $timeout) {

    $scope.bulls = resolvedBull;

    $scope.$watch("bulls", function( newValue, oldValue ) {
      $timeout(function(){
        $scope.merge(newValue);
      });
    });

    $scope.merge = function(data){
      var vivos = 0,
          abatidos = 0;

      for(var i = 0; i < data.length; i++){
        if(data[i].status == 1){
          vivos = vivos + 1;
        }else{
          abatidos = abatidos + 1;
        }
      };

       $timeout(function(){
        console.log(vivos);
        console.log(abatidos);
      });
    };

}]);