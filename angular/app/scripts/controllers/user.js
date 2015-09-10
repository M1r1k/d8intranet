'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('UserCtrl', function ($scope, $http, $routeParams, getJsonData) {


    getJsonData.getUsers().then(function (d) {

      $scope.users = d;
      $scope.user = {};
      var cameToCompany = '';

      angular.forEach($scope.users, function (user) {
        if (user.uid[0].value == $routeParams.userId) {
          $scope.user = user;
          cameToCompany = user.field_came_to_propeople[0].value;
          return $scope.user;
        }

      });

      // Create new variable where we replace all '-' with ','
      //var formattedDate = ;
      var today = new Date();
      var past = new Date(cameToCompany.replace(/-/g, ','));
      var months;

      // Calculate amount of months from user started to work in company
      function calcDate(date1,date2) {
        var diff = Math.floor(date1.getTime() - date2.getTime());
        var day = 1000 * 60 * 60 * 24;

        var days = Math.floor(diff/day);
        var years = Math.floor(months/12);
        months = Math.floor(days/31);

        return months;
      }

      // Get amount of Years and Months of user work in company
      function getWorkPeriod(month) {
        $scope.yearsOfWork = Math.floor(month/12);
        $scope.monthsOfWork = month%12;
      }

      getWorkPeriod(calcDate(today,past));

    });
  })

  .controller('ShowUserCtrl', function ($scope, $routeParams) {
    $scope.user_id = $routeParams.userId;
  });
