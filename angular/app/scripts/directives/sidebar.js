'use strict';
/**
 * @ngdoc function
 * @name d8intranetApp.directive:inputEffects
 * @description
 * # inputEffects
 * Directive of the d8intranetApp
 */

angular.module('d8intranetApp')
  .directive('rollMenu', ['$document', function ($document) {
    return {
      link: function (scope, element) {
        $(element).on('click', function () {
          $('.global-wrapper').toggleClass('rolled-bar');
        })
      }
    }
  }])

  .directive('mobileMenu', ['$document', function ($document) {
    return {
      link: function (scope, element) {
        $(element).on('click', function () {
          $('.bt-menu').toggleClass('bt-menu-open');
        })
      }
    }
  }])

  .controller('Controller', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '../../jsons/check-in.json'
    }).success(function (response) {
      $scope.state = response.checked;
    });
  }])

  //.directive('checkIn', ['$document', function ($document, $scope, $http) {
  //  return {
  //    controller: function ($scope, $http) {
  //      $http({
  //        method: 'GET',
  //        url: '../../jsons/check-in.json'
  //      }).success(function (response) {
  //        $scope.state = response.checked;
  //
  //        // Register click on button
  //        $('.checkin').on('click', function (e) {
  //          e.preventDefault();
  //          if ($scope.state.can_check_in == 'true') {
  //
  //            if (!$(this).hasClass('checked')) {
  //              $(this).html('Check out');
  //            }
  //            else {
  //              $(this).html('Check in');
  //            }
  //
  //            $(this).toggleClass('checked');
  //          }
  //
  //          else {
  //            alert('something wrong!');
  //          }
  //        })
  //
  //      });
  //
  //    }
  //
  //  }
  //}])

;
