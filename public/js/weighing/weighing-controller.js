'use strict';

angular.module('Danger')
  .controller('ctrlNewWeighing', ['$scope', 'Weighing', 'resolvedBull','Bull',
    function ($scope, Weighing, resolvedBull, Bull) {

      $scope.bulls = resolvedBull;

      $("#brinco").mask("999999");
      $("#peso").mask("999.99");

      $scope.save = function (earring) {
        $scope.weighing.BullId = earring;
        Weighing.save($scope.weighing,
           function () {
             new PNotify({text: "<strong>" + $scope.weighing.earring + "</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});
             $scope.clear();
           });
      };

      /*$scope.getId = function(){
        Weighing.find({id: 13}, $scope.weighing,
          function (,b,c) {
            console.log(a);
            console.log(b);
            console.log(c);
        });
      };*/

      $scope.clear = function () {
        $scope.weighing = {

          "weight": "",

          "earring": "",

          "id": "",

          "BullId": ""
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

      $scope.save($scope.weighing.earring);
    };

    $scope.clear();

  }]);