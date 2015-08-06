'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('EmployeesCtrl', function ($scope, $http, $filter) {

    // Teams requests
    $http({
      method: 'GET',
      url: '../../jsons/teams.json'
    }).success(function (response) {
      $scope.teams = response.teams;

      $scope.regularTeams = {};
      $scope.members = {};

      // Created new object for all teams
      // In case if lead team (director, dep lead) create separate object
      // It's necessary to have separate leads and other teams for output
      angular.forEach($scope.teams, function (team) {
        angular.forEach(team, function (key, value) {
          $scope.regularTeams[value] = key;
        });
      });
    });



    $http({
      method: 'GET',
      url: '../../jsons/people_list.json'
    }).success(function (response) {
      $scope.people = response.people;
    });




    $scope.tabs = [{
      title: 'Teams',
      url: 'views/teams.html'
    }, {
      title: 'People',
      url: 'views/people.html'
    }];

    $scope.currentTab = 'views/teams.html';

    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    };

  });
