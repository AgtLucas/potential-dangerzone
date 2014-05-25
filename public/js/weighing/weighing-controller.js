'use strict';

angular.module('Danger')
  .controller('ctrlNewWeighing', ['$scope', '$modal', 'Weighing',
    function ($scope, $modal, Weighing) {

      $("#brinco").mask("999999");
      $("#peso").mask("999.99");
  
      var brinco, peso = ""; 

      $scope.salvar = function(){  
        
    };
   
      $scope.save = function (id) {
        if (id) {
          Weighing.update({id: id}, $scope.weighing,
            function () {
              new PNotify({text: "<strong>brbr</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});    
              $scope.clear();
            });
        } else {
          Weighing.save($scope.weighing,
            function () {
              new PNotify({text: "<strong>BRBR</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});    
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.weighing = {
          
          "weight": "",
          
          "earring": "",
          
          "id": ""
        };
        $("#brinco").val("");
        $("#peso").val("");
      };


    $scope.ok = function () {
      var brinco = angular.uppercase($("#brinco").val());
      var peso = $("#peso").val();  

      if (brinco === "") {
        return new PNotify({text: "Brinco inválido!", type: 'error', icon: '', delay: 2500});    
      }
      if (peso === "" || peso === ",") {
        return new PNotify({text: "Peso inválido!", type: 'error', icon: '', delay: 2500});    
      }            
      
      angular.extend($scope.weighing, {
          weight: peso,
          earring: brinco          
        });      

      $scope.save($scope.weighing.id);
    };

    $scope.clear();

  }]);