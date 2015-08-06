'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '../../jsons/employees.json'
    }).success(function (response) {
        $scope.users = response.users;
        $scope.states = {};

        angular.forEach(response.users, function (user) {
          angular.forEach(user.status[0], function (key, statusName) {
            if (key == 1) {

              if (typeof $scope.states[cardName(statusName)] != 'undefined') {
                $scope.states[cardName(statusName)][user.uid[0].value] = user;
                $scope.states[cardName(statusName)]['count'] += 1;
              } else {
                $scope.states[cardName(statusName)] = {};
                $scope.states[cardName(statusName)][user.uid[0].value] = user;
                $scope.states[cardName(statusName)]['count'] = 1;

              }
            }
          });
        });

        function cardName(status) {
          switch (status) {
            case 'day_off':
              return 'Day off';
              break;
            case 'sick':
              return 'Sick';
              break;
            case 'business_trip':
              return 'Business Trip';
              break;
            case 'remote_work':
              return 'Remote work';
              break;
            case 'vacation':
              return 'Vacation';
              break;
            default:
              return '';
              break;
          }
        };
      }
    );

  })

  .controller('GetDateCtrl', function ($scope) {
    $scope.date = new Date();
  });

