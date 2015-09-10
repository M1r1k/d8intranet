'use strict';

/**
 * @ngdoc overview
 * @name d8intranetApp
 * @description
 * # d8intranetApp
 *
 * Main module of the application.
 */
angular.module('d8intranetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        url: "/main",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/employees', {
        url: "/employees",
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl'
      })
      .when('/user', {
        url: "/user",
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/user/:userId', {
        url: "/user/:userId",
        templateUrl: 'views/user.html',
        controller: 'ShowUserCtrl'
      })
      .when('/vacation', {
        url: "/vacation",
        templateUrl: 'views/vacation.html',
        controller: 'VacationCtrl'
      })
      .otherwise({
        redirectTo: '/main',
        templateUrl: 'views/main.html'
      });

    $httpProvider.defaults.headers.common.Accept = 'application/hal+json';
  });
