'use strict';

angular.module('Danger').controller('ctrlNewBull', ['$scope', '$modal', 'Bull', function ($scope, $modal, Bull, $timeout) {

  $("#brinco").mask("999999");
  $('#nascimento').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy"
  });
  $scope.viewbutton = false;

  $scope.save = function (id, type) {
    var retorno = false;
    $scope.bull.id = id;
    Bull.save($scope.bull,
    function () {
      retorno = true;
      new PNotify({text: "<strong>" + $scope.bull.earring + "</strong> salvo com sucesso!", type: 'success', icon: '', delay: 2500});
      $scope.viewbutton = false;
      $scope.clear();
    })
    setTimeout(function(){
      if(!retorno){
        $scope.viewbutton = false;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        new PNotify({text: "Brinco já cadastrado!", type: 'error', icon: '', delay: 2500});
      }
    }, 1000)
  };

  $scope.findByEarring = function(obj, earring){
    var retorno = false;
    Bull.find({id: earring}, $scope.bull,
    function (a,b,c) {
      if(a.length > 0){
        retorno = true;
        };
      });
    $scope.save(obj, retorno);
  };

  $scope.clear = function () {
    $scope.bull = {"earring": "", "birthday": "", "status": "", "slaughter": "", "id": ""};
    $("#brinco").val("")
  };

  $scope.nascimentoBanco = function(data){
    return (data.split("/")[1] + "-" + data.split("/")[0] + "-" + data.split("/")[2]);
  }

  $scope.ok = function () {
    $scope.viewbutton = true;
    var brinco = angular.uppercase($("#brinco").val());
    var nascimento = $("#nascimento").val();
    if (brinco === "") {
      $scope.viewbutton = false;
      return new PNotify({text: "Brinco inválido!", type: 'error', icon: '', delay: 2500});
    }
    if (nascimento === "") {
      $scope.viewbutton = false;
      return new PNotify({text: "Data de nascimento inválida!", type: 'error', icon: '', delay: 2500});
    }
    angular.extend($scope.bull, {
      earring: brinco,
      status: 1,
      slaughter: "2000-01-01",
      birthday: $scope.nascimentoBanco(nascimento)
    });
    $scope.findByEarring($scope.bull.earring, brinco);
  };
  $scope.clear();
}]);

