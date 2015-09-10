'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('MainCtrl', function ($scope, $http, getJsonData, $rootScope) {

    getJsonData.getUsers().then(function (d) {
      $scope.users = d;

      $scope.states = {};

      angular.forEach($scope.users, function (user) {
        angular.forEach(user.statuses[0], function (key, statusName) {
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
      }
    });
  })

  .controller('pageLoad', function ($scope, $cookies) {
    var expireDate = new Date();

    // Setup cookie live to 1 year
    expireDate.setDate(expireDate.getDate() + 12);


    // If we don't have any cookie yet - set cookie to light theme
    if ($cookies.get('current-theme') == undefined) {
      $cookies.put('current-theme', 'light', {'expires': expireDate});
      $scope.isDark = false;
    }
    else {
      // If we have light in cooke set the light theme
      $cookies.get('current-theme') == 'light' ? $scope.isDark = false : $scope.isDark = true;
    }

    $scope.setCookieData = function() {
      // Switch theme
      $scope.isDark = !$scope.isDark;
      // Get current cookie value
      var themeCookie = $cookies.get('current-theme');

      // If we have value light in cooke set the value to dark
      if (themeCookie == 'light') {
        $cookies.put('current-theme', 'dark', {'expires': expireDate});
      }
      // If we have value dark in cooke set the value tp light
      else {
        $cookies.put('current-theme', 'light', {'expires': expireDate});
      }
    }
  })


  .controller('checkIn', function ($scope, $http, $rootScope) {
    var url = 'http://drupal.d8pp.dev:8888/checkin';

    $rootScope.messageRequest = false;

    $scope.checkIn = function () {

      $rootScope.messageRequest = true;

      var dataObj = {"message":" Yo! Bitch"};

      var res = $http.post(url, dataObj);

      res.success(function(data, status, headers, config) {
        $scope.message = data;
        $rootScope.messageRequest = false;
      });

      res.error(function(data, status, headers, config) {
        console.log( "failure message: " + JSON.stringify({data: data}));
        $rootScope.messageRequest = false;
      });
    }
  })

  .controller('GetDateCtrl', function ($scope) {
    $scope.date = new Date();
  });

