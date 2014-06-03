'use strict';

angular.module('Danger')
  .controller('ctrlAbatidosBull', ['$scope', 'resolvedBull', 'Bull',
    function ($scope, resolvedBull, Bull) {

      $scope.bulls = resolvedBull;

      $scope.mergeDate = function(data){
        if(!!data){
          return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1];
        }else{
          return "";
        }
      }

      $scope.mergeDay = function(data1, data2){
        if(data1 == "" || data2 == ""){
          return "0"
        }
        data1 = new Date("2014-" + data1.split("/")[1] + "-" +data1.split("/")[0]);
        data2 = new Date("2014-" + data2.split("/")[1] + "-" +data2.split("/")[0]);
        return ((data2 - data1) / (24 * 60 * 60 * 1000));
      };

      $scope.percorre = function(array, valor){
        var flag = true;
        for(var i = 0; i < array.length; i++){
          if(array[i].earring == valor){
            flag = false;
          }
        }
        return flag;
      };

      $scope.evolucao = function(peso1, peso2) {
        if(isNaN((((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0))){
          return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + 0 + "%";
        }
        return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + (((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0) + "%";
      };

  }]);