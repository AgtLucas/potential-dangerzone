'use strict';

angular.module('Danger')
  .controller('WeighingController', ['$scope', '$modal', 'resolvedWeighing', 'Weighing',
    function ($scope, $modal, resolvedWeighing, Weighing) {

      $scope.weighings = resolvedWeighing;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.weighing = Weighing.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Weighing.delete({id: id},
          function () {
            $scope.weighings = Weighing.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Weighing.update({id: id}, $scope.weighing,
            function () {
              $scope.weighings = Weighing.query();
              $scope.clear();
            });
        } else {
          Weighing.save($scope.weighing,
            function () {
              $scope.weighings = Weighing.query();
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
      };

      $scope.open = function (id) {
        var weighingSave = $modal.open({
          templateUrl: 'weighing-save.html',
          controller: WeighingSaveController,
          resolve: {
            weighing: function () {
              return $scope.weighing;
            }
          }
        });

        weighingSave.result.then(function (entity) {
          $scope.weighing = entity;
          $scope.save(id);
        });
      };
    }]);

var WeighingSaveController =
  function ($scope, $modalInstance, weighing) {
    $scope.weighing = weighing;

    

    $scope.ok = function () {
      $modalInstance.close($scope.weighing);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
