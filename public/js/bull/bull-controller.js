'use strict';

angular.module('Danger')
  .controller('ctrlNewBull', ['$scope', '$modal', 'Bull',
    function ($scope, $modal, Bull) {    
      
      $("#brinco").mask("999999");

      $('#nascimento').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy"
      });      

      $scope.save = function (id) {
        if (id) {
          Bull.update({id: id}, $scope.bull,
            function () {    
              new PNotify({text: "<strong>" + id + "</strong> alterado com sucesso!", type: 'success', icon: '', delay: 2500});              
              $scope.clear();              
            });
        } else {
          Bull.save($scope.bull,
            function () {    
              new PNotify({text: "<strong>" + $scope.bull.earring + "</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});              
              $scope.clear();              
            });
        }
      };

      $scope.clear = function () {      
        $scope.bull = {          
          "earring": "",        
          "birthday": "",          
          "status": "",          
          "slaughter": "",          
          "id": ""          
        };
        $("#nascimento").val("")
        $("#brinco").val("")
      };  

      $scope.ok = function () {
        var brinco = angular.uppercase($("#brinco").val());    
        var nascimento = $("#nascimento").val(); 
        if (brinco === "") {
          return new PNotify({text: "Brinco inválido!", type: 'error', icon: '', delay: 2500});    
        }
        if (nascimento === "") {
          return new PNotify({text: "Data de nascimento inválida!", type: 'error', icon: '', delay: 2500});    
        }                            
      
        angular.extend($scope.bull, {
          earring: 1,
          status: 1,
          slaughter: "2013-10-10",
          birthday: "2013-10-10"
        });
      
        $scope.save($scope.bull.id);
      };  

      $scope.clear();   
  }]);

