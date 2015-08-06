'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('SidebarCtrl', function ($scope, $location) {
    $scope.menuItemsList = [
      {
        icon: 'dashboard',
        title: 'Dashboard',
        url: '#main'
      },
      {
        icon: 'employees',
        title: 'Employees',
        url: '#employees'
      },
      {
        icon: 'rest',
        title: 'My vacation',
        url: '#vacation'
      },
      {
        icon: 'logout',
        title: 'Logout'
      }
    ];

  })

.directive('rollMenu', ['$document', function($document){
    return {
      link: function(scope, element) {
        element.on('click', function(){
          //$('.main-content').toggleClass('roll-bar');
          $('.global-wrapper').toggleClass('rolled-bar');
        })
      }
    }
  }]);

