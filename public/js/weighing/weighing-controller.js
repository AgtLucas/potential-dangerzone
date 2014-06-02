'use strict';

angular.module('Danger').controller('ctrlNewWeighing', ['$scope', 'Weighing', 'resolvedBull','Bull', function ($scope, Weighing, resolvedBull, Bull) {

  $scope.bulls = resolvedBull;
  $scope.configearring = {
    formatNoMatches: function() {
      return "Nenhum brinco encontrado!";
    }
  };
  $("#peso").mask("999.99");
  $scope.earring = "0";
  $scope.viewbutton = false;

  $scope.save = function (earring) {
    $scope.viewbutton = true;
    $scope.weighing.BullId = earring;
    Weighing.save($scope.weighing,
    function () {
      new PNotify({text: "<strong>" + $scope.weighing.earring + "</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});
      $scope.viewbutton = false;
      $scope.clear();
    });
  };

  $scope.clear = function () {
    $scope.weighing = {"weight": "","earring": "","id": "","BullId": ""};
    $scope.earring = "0";
    $("#peso").val("");
  };

  $scope.ok = function () {
    $scope.viewbutton = true;
    var peso = $("#peso").val();
    if ($scope.earring === "0") {
      $scope.viewbutton = false;
      return new PNotify({text: "Brinco inválido!", type: 'error', icon: '', delay: 2500});
    }
    if (peso === "" || peso === ",") {
      $scope.viewbutton = false;
      return new PNotify({text: "Peso inválido!", type: 'error', icon: '', delay: 2500});
    }
    angular.extend($scope.weighing, {
      weight: peso,
      earring: $scope.earring
    });
    $scope.save($scope.weighing.earring);
  };
  $scope.clear();
}]);