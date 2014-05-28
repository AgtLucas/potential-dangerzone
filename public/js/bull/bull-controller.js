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
          $scope.bull.id = id;
          Bull.save($scope.bull,
            function () {
              new PNotify({text: "<strong>" + $scope.bull.earring + "</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});
              $scope.clear();
            });
      };

      $scope.clear = function () {
        $scope.bull = {
          "earring": "",
          "birthday": "",
          "status": "",
          "slaughter": "",
          "id": ""
        };
        $("#brinco").val("")
      };

      $scope.nascimentoBanco = function(data){
        return (data.split("/")[1] + "-" + data.split("/")[0] + "-" + data.split("/")[2]);
      }

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
          earring: brinco,
          status: 1,
          slaughter: "2000-01-01",
          birthday: $scope.nascimentoBanco(nascimento)
        });

        $scope.save($scope.bull.earring);
      };

      $scope.clear();
  }]);

