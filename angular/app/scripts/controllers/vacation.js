'use strict';

/**
 * @ngdoc function
 * @name d8intranetApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the d8intranetApp
 */
angular.module('d8intranetApp')
  .controller('VacationCtrl', function ($scope, $http, getJsonData) {

    getJsonData.getUsers().then(function (d) {
      $scope.users = d;

      function getMonthNumber(timestamp) {
        return new Date(timestamp * 1000).getMonth();
      }

      function getDateNumber(timestamp) {
        return new Date(timestamp * 1000).getDate();
      }

      $scope.dayOffArray = {};

      angular.forEach($scope.users, function (employee) {
        $scope.members = employee;
        var vacationDays = {},
          totalVacation = 0,
          monthes = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (var i = 0; i < 12; i++) {
          vacationDays[i] = {"monthName": monthes[i], "dayOff": ""};
        }


        // Get vacations days
        angular.forEach($scope.members.field_vacation, function (vacation) {
          var month = getMonthNumber(vacation.start_vacation);

          vacationDays[month].days = "";
          vacationDays[month].monthlyTotal = "";
          vacationDays[month].state = vacation.state;
          vacationDays[month].days += getDateNumber(vacation.start_vacation) + '-' + getDateNumber(vacation.end_vacation) + ' ';
          totalVacation += getDateNumber(vacation.end_vacation) - getDateNumber(vacation.start_vacation);
          vacationDays[month].monthlyTotal += getDateNumber(vacation.end_vacation) - getDateNumber(vacation.start_vacation);
        });


        var dayOff = '';
        var month = 0;
        var new_vacationDays = {};
        var daysOffCounter = 0;
        var datesInMonth = {};

        angular.forEach($scope.members.field_dayoff, function (dayoff, key) {
          month = getMonthNumber(dayoff.day_off);
          dayoff.day_off = getDateNumber(dayoff.day_off);

          if (new_vacationDays[month] != undefined && new_vacationDays[month][dayoff.state] != undefined) {
            new_vacationDays[month][dayoff.state] += dayoff.day_off + ' ';
            daysOffCounter ++;
            datesInMonth[month]++;
          } else {
            if (new_vacationDays[month] == undefined ) {
              new_vacationDays[month] = {};
              datesInMonth[month] = 0;
            }

            if (new_vacationDays[month][dayoff.state] == undefined) {
              new_vacationDays[month][dayoff.state] = '';
            }
            new_vacationDays[month][dayoff.state] += dayoff.day_off + ' ';
            daysOffCounter ++;
            datesInMonth[month]++;
          }

          vacationDays[month].dayOff = new_vacationDays[month];
          vacationDays[month].datesInMonth = datesInMonth[month];
          console.log(vacationDays[month].dayOff)
        });

        employee.vacationDays = vacationDays;
        employee.daysOffTotal = daysOffCounter;
        employee.totalVacation = totalVacation;
      });
    });


    $scope.tabs = [{
      title: 'Vacations',
      url: 'views/vacations.html'
    }, {
      title: 'Days off',
      url: 'views/dayoffs.html'
    }];

    $scope.currentTab = 'views/vacations.html';

    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    };

  });
