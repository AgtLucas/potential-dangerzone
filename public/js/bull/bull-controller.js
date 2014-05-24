'use strict';

angular.module('Danger')
  .controller('BullController', ['$scope', '$modal', 'resolvedBull', 'Bull',
    function ($scope, $modal, resolvedBull, Bull) {

      $scope.bulls = resolvedBull;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.bull = Bull.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Bull.delete({id: id},
          function () {
            $scope.bulls = Bull.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Bull.update({id: id}, $scope.bull,
            function () {
              $scope.bulls = Bull.query();
              $scope.clear();
            });
        } else {
          Bull.save($scope.bull,
            function () {
              $scope.bulls = Bull.query();
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
      };

      $scope.open = function (id) {
        var bullSave = $modal.open({
          templateUrl: 'bull-save.html',
          controller: BullSaveController,
          resolve: {
            bull: function () {
              return $scope.bull;
            }
          }
        });

        bullSave.result.then(function (entity) {
          $scope.bull = entity;
          $scope.save(id);
        });
      };
    }]);

var BullSaveController =
  function ($scope, $modalInstance, bull) {
    $scope.bull = bull;

    
    $scope.birthdayDateOptions = {
      dateFormat: 'yy-mm-dd',
      
      
    };
    $scope.slaughterDateOptions = {
      dateFormat: 'yy-mm-dd',
      
      
    };

    $scope.ok = function () {
      $modalInstance.close($scope.bull);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
