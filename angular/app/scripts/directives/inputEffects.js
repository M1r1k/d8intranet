'use strict';
/**
 * @ngdoc function
 * @name d8intranetApp.directive:inputEffects
 * @description
 * # inputEffects
 * Directive of the d8intranetApp
 */

angular.module('d8intranetApp')
  .directive('inputEffects', ['$document', function($document) {
    return {
      link: function(scope, element, attr) {
        element.on('keyup blur click', function () {
          var currentValue = $(this).val();
          var $parentContainer = $(this).parent();

          if (currentValue.length > 0) {
            $parentContainer.addClass('input-filled');
          } else {
            $parentContainer.removeClass('input-filled');
          }
        });
      }
    };
  }]);
