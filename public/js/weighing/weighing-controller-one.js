'use strict';

angular.module('Danger')
  .controller('ctrlConWeighing', ['$scope', 'resolvedBull', 'Bull', 'Weighing',
    function ($scope, resolvedBull, Bull, Weighing) {

      $scope.bulls = resolvedBull;
      $scope.earring = "0";
      $scope.bull = {};
      $scope.showview = false;

      $scope.pesquisar = function(earring){
      $scope.showview = true;
      Bull.find({id: earring},
        function (a, b, c) {
          $scope.bull = a;
          $scope.showview = false;
        });
      };

      $scope.mergeDay = function(data1, data2){
        data1 = new Date("2014-" + data1.split("/")[1] + "-" +data1.split("/")[0]);
        data2 = new Date("2014-" + data2.split("/")[1] + "-" +data2.split("/")[0]);
        return ((data2 - data1) / (24 * 60 * 60 * 1000));
      };

      $scope.mergeDate = function(data){
        if(!!data){
          return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1];
        }else{
          return "";
        }
      }

      $scope.mergeDateComplete = function(data){
        if(!!data){
          return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1] + "/" + (data.split("T")[0]).split("-")[0];
        }else{
          return "";
        }
      }

      $scope.excluir = function(obj){
        Weighing.delete({id: obj.id},
          function () {
            $scope.pesquisar(obj.BullId);
            new PNotify({text: "Peso <strong>" + obj.weight + "</strong> excluido com sucesso!", type: 'success', icon: '', delay: 2500});
        });
      };

      $scope.evolucao = function(peso1, peso2) {
        if(isNaN((((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0))){
          return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + 0 + "%";
        }
        return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + (((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0) + "%";
      };

  }]);