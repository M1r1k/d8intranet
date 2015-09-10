'use strict';
/**
 * @ngdoc function
 * @name d8intranetApp.filter:filterByPosition
 * @description
 * # filterByPosition
 * Filter of the d8intranetApp
 */

angular.module('d8intranetApp')
  .service('getJsonData', function($http){
    var url = '../../jsons/users.json';
    var users = [];
    var promise;

    var getJsonData = {

      getUsers: function () {
        if (users.length > 0) {
          console.log('I have users');
          return promise;
        }
        else {
          console.log('Don\'t have users... request');
          return getJsonData.async(url);
        }
      },
      async: function(url) {
        console.log('Getting users');
        // $http returns a promise, which has a then function, which also returns a promise

        promise = $http.get(url).then(function (response) {
          // The then function here is an opportunity to modify the response
          // The return value gets picked up by the then in the controller.
          users = response.data;
          console.log('Users are sent');
          return users;
        });
        // Return the promise to the controller
        return promise;
      }
    };

    return getJsonData;
  });
