'use strict';

/**
 * @ngdoc directive
 * @name flyBuyApp.directive:validAirport
 * @description
 * # validAirport
 */
angular.module('flyBuyApp')
  .directive('validAirport', function () {
    return {
      require: 'ngModel',
      template: '<div></div>',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the validAirport directive');
      // }
    };
  });
